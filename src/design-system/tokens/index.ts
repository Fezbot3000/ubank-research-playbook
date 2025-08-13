// Export all design tokens
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';
export * from './borders';
export * from './animations';
export * from './breakpoints';

// Combined token object for easy access
import { colorTokens, lightTheme, darkTheme } from './colors';
import { typographyTokens, textStyles } from './typography';
import { spacingTokens, semanticSpacing } from './spacing';
import { shadowTokens, darkShadowTokens, scrimTokens } from './shadows';
import { borderTokens, semanticBorders } from './borders';
import { animationTokens, keyframes } from './animations';
import { breakpointTokens, mediaQueries, containerSizes } from './breakpoints';

export const designTokens = {
  colors: colorTokens,
  typography: typographyTokens,
  textStyles,
  spacing: spacingTokens,
  semanticSpacing,
  shadows: shadowTokens,
  darkShadows: darkShadowTokens,
  scrim: scrimTokens,
  borders: borderTokens,
  semanticBorders,
  animations: animationTokens,
  keyframes,
  breakpoints: breakpointTokens,
  mediaQueries,
  containerSizes,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
} as const;

// Type definitions for better TypeScript support
export type ColorToken = keyof typeof colorTokens;
export type ThemeColors = typeof lightTheme;
export type TextStyle = keyof typeof textStyles;
export type SpacingToken = keyof typeof spacingTokens;
export type ShadowToken = keyof typeof shadowTokens;
export type BorderRadius = keyof typeof borderTokens.radius;
export type AnimationDuration = keyof typeof animationTokens.duration;
export type AnimationEasing = keyof typeof animationTokens.easing;
export type Breakpoint = keyof typeof breakpointTokens; 