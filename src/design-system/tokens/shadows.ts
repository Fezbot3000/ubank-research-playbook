export const shadowTokens = {
  // ubank Shadow specification - exact values from design system
  none: 'none',                                                    // $shadow-0: 0px Y-axis, 0px blur
  sm: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',                          // $shadow-1: 4px Y-axis, 8px blur
  md: '0 8px 16px 0 rgba(0, 0, 0, 0.15)',                        // $shadow-2: 8px Y-axis, 16px blur
  lg: '0 16px 32px 0 rgba(0, 0, 0, 0.2)',                        // $shadow-3: 16px Y-axis, 32px blur
  
  // Focus shadows - ubank specification (4px Y-axis, 8px blur)
  focus: '0 4px 8px 0 rgba(123, 34, 255, 0.3)',                  // $focus-on: 4px Y-axis, 8px blur with ubank purple
  'focus-off': 'none',                                            // $focus-off: 0px Y-axis, 0px blur
  'focus-error': '0 4px 8px 0 rgba(150, 13, 36, 0.3)',          // Focus with ubank danger red
  'focus-warning': '0 4px 8px 0 rgba(255, 214, 0, 0.3)',        // Focus with ubank alert yellow
  'focus-success': '0 4px 8px 0 rgba(14, 221, 111, 0.3)',       // Focus with ubank success green
} as const;

// Dark theme shadows - same Y-axis/blur values, adjusted opacity
export const darkShadowTokens = {
  none: 'none',                                                    // $shadow-0: 0px Y-axis, 0px blur
  sm: '0 4px 8px 0 rgba(0, 0, 0, 0.3)',                          // $shadow-1: 4px Y-axis, 8px blur (darker)
  md: '0 8px 16px 0 rgba(0, 0, 0, 0.4)',                         // $shadow-2: 8px Y-axis, 16px blur (darker)
  lg: '0 16px 32px 0 rgba(0, 0, 0, 0.5)',                        // $shadow-3: 16px Y-axis, 32px blur (darker)
  
  // Focus shadows for dark theme
  focus: '0 4px 8px 0 rgba(224, 153, 255, 0.5)',                 // $focus-on: ubank purple light
  'focus-off': 'none',                                            // $focus-off: 0px Y-axis, 0px blur
  'focus-error': '0 4px 8px 0 rgba(255, 118, 141, 0.5)',        // Focus with ubank danger red vibrant
  'focus-warning': '0 4px 8px 0 rgba(255, 235, 135, 0.5)',      // Focus with ubank alert yellow vibrant
  'focus-success': '0 4px 8px 0 rgba(14, 221, 111, 0.5)',       // Focus with ubank success green vibrant
} as const;

// Scrim utilities for ubank specification
export const scrimTokens = {
  // Light mode scrim: 8px Y-axis blur
  light: {
    none: 'none',                                                  // $scrim-blur-0: 0px blur
    blur: 'backdrop-filter: blur(8px);',                          // $scrim-blur-1: 8px blur for light mode
  },
  
  // Dark mode scrim: 8px Y-axis blur  
  dark: {
    none: 'none',                                                  // $scrim-blur-0: 0px blur
    blur: 'backdrop-filter: blur(8px);',                          // $scrim-blur-1: 8px blur for dark mode
  },
} as const; 