import React from 'react';
import { Button, Icon, useTheme } from '../design-system';

const ThemeToggle = React.memo(() => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button 
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{ padding: 'var(--spacing-sm)' }}
    >
      <Icon 
        name={isDark ? 'theme' : 'star'} 
        size={20}
      />
    </Button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle; 