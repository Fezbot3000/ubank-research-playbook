import React, { createContext, useContext, useEffect, useState } from 'react';
import { designTokens } from '../tokens';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  tokens: typeof designTokens;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  storageKey = 'ui-theme',
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    }
    
    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      return mediaQuery.matches ? 'dark' : 'light';
    }
    
    return defaultTheme;
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);
    
    // Update CSS custom properties
    updateCSSVariables(newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const updateCSSVariables = (currentTheme: Theme) => {
    const root = document.documentElement;
    const themeColors = designTokens.themes[currentTheme];
    const shadows = currentTheme === 'dark' ? designTokens.darkShadows : designTokens.shadows;

    // Set color variables
    Object.entries(themeColors.background).forEach(([key, value]) => {
      root.style.setProperty(`--color-background-${key}`, value);
    });

    Object.entries(themeColors.text).forEach(([key, value]) => {
      root.style.setProperty(`--color-text-${key}`, value);
    });

    Object.entries(themeColors.border).forEach(([key, value]) => {
      root.style.setProperty(`--color-border-${key}`, value);
    });

    Object.entries(themeColors.surface).forEach(([key, value]) => {
      root.style.setProperty(`--color-surface-${key}`, value);
    });

    // Set brand color variables
    if (themeColors.brand) {
      Object.entries(themeColors.brand).forEach(([key, value]) => {
        root.style.setProperty(`--color-brand-${key}`, value);
      });
    }

    // Set shadow variables
    Object.entries(shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // Set theme-specific class
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${currentTheme}`);
    
    // Set data attribute for CSS selectors
    root.setAttribute('data-theme', currentTheme);
  };

  // Initialize CSS variables on mount and theme change
  useEffect(() => {
    updateCSSVariables(theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no theme is stored (user hasn't made a choice)
      const stored = localStorage.getItem(storageKey);
      if (!stored) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [storageKey]);

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
    tokens: designTokens,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 