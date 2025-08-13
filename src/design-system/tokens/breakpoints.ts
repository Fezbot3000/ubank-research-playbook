export const breakpointTokens = {
  // Breakpoint values
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Media query helpers
export const mediaQueries = {
  xs: `(min-width: ${breakpointTokens.xs})`,
  sm: `(min-width: ${breakpointTokens.sm})`,
  md: `(min-width: ${breakpointTokens.md})`,
  lg: `(min-width: ${breakpointTokens.lg})`,
  xl: `(min-width: ${breakpointTokens.xl})`,
  '2xl': `(min-width: ${breakpointTokens['2xl']})`,
  
  // Max-width queries
  'max-xs': `(max-width: ${parseInt(breakpointTokens.xs) - 1}px)`,
  'max-sm': `(max-width: ${parseInt(breakpointTokens.sm) - 1}px)`,
  'max-md': `(max-width: ${parseInt(breakpointTokens.md) - 1}px)`,
  'max-lg': `(max-width: ${parseInt(breakpointTokens.lg) - 1}px)`,
  'max-xl': `(max-width: ${parseInt(breakpointTokens.xl) - 1}px)`,
  'max-2xl': `(max-width: ${parseInt(breakpointTokens['2xl']) - 1}px)`,
  
  // Range queries
  'sm-to-md': `(min-width: ${breakpointTokens.sm}) and (max-width: ${parseInt(breakpointTokens.md) - 1}px)`,
  'md-to-lg': `(min-width: ${breakpointTokens.md}) and (max-width: ${parseInt(breakpointTokens.lg) - 1}px)`,
  'lg-to-xl': `(min-width: ${breakpointTokens.lg}) and (max-width: ${parseInt(breakpointTokens.xl) - 1}px)`,
  
  // Device-specific
  mobile: `(max-width: ${parseInt(breakpointTokens.md) - 1}px)`,
  tablet: `(min-width: ${breakpointTokens.md}) and (max-width: ${parseInt(breakpointTokens.lg) - 1}px)`,
  desktop: `(min-width: ${breakpointTokens.lg})`,
  
  // Orientation and other features
  landscape: '(orientation: landscape)',
  portrait: '(orientation: portrait)',
  'hover-capable': '(hover: hover)',
  'touch-capable': '(pointer: coarse)',
  'reduced-motion': '(prefers-reduced-motion: reduce)',
  'dark-mode': '(prefers-color-scheme: dark)',
  'light-mode': '(prefers-color-scheme: light)',
} as const;

// Container max-widths for different breakpoints
export const containerSizes = {
  xs: '100%',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
} as const; 