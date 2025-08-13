export const spacingTokens = {
  // Base spacing scale (pixel values to match ubank specification)
  0: '0px',      // nod value
  2: '2px',      // xxxs padding
  4: '4px',      // xxs padding / xs margin
  8: '8px',      // xs padding / sm margin  
  12: '12px',    // sm padding / md margin (default)
  16: '16px',    // md padding / m margin
  24: '24px',    // m padding / lg margin
  32: '32px',    // lg padding / xl margin
  40: '40px',    // xl padding / xxl margin
  48: '48px',    // xxl padding
  56: '56px',    // xxxl padding
} as const;

// Semantic spacing matching ubank's specification
export const semanticSpacing = {
  // Padding - Horizontal (ubank specification)
  paddingHorizontal: {
    nod: spacingTokens[0],     // $padding-horiz-nod: 0px
    xxxs: spacingTokens[2],    // $padding-horiz-xxxs: 2px
    xxs: spacingTokens[4],     // $padding-horiz-xxs: 4px
    xs: spacingTokens[8],      // $padding-horiz-xs: 8px
    sm: spacingTokens[12],     // $padding-horiz-sm: 12px
    md: spacingTokens[16],     // $padding-horiz-md: 16px (default)
    m: spacingTokens[24],      // $padding-horiz-m: 24px
    lg: spacingTokens[32],     // $padding-horiz-lg: 32px
    xl: spacingTokens[40],     // $padding-horiz-xl: 40px
    xxl: spacingTokens[48],    // $padding-horiz-xxl: 48px
    xxxl: spacingTokens[56],   // $padding-horiz-xxxl: 56px
  },
  
  // Padding - Vertical (ubank specification)
  paddingVertical: {
    nod: spacingTokens[0],     // $padding-vert-nod: 0px
    xxxs: spacingTokens[2],    // $padding-vert-xxxs: 2px
    xxs: spacingTokens[4],     // $padding-vert-xxs: 4px
    xs: spacingTokens[8],      // $padding-vert-xs: 8px
    sm: spacingTokens[12],     // $padding-vert-sm: 12px
    md: spacingTokens[16],     // $padding-vert-md: 16px (default)
    m: spacingTokens[24],      // $padding-vert-m: 24px
    lg: spacingTokens[32],     // $padding-vert-lg: 32px
    xl: spacingTokens[40],     // $padding-vert-xl: 40px
    xxl: spacingTokens[48],    // $padding-vert-xxl: 48px
    xxxl: spacingTokens[56],   // $padding-vert-xxxl: 56px
  },
  
  // Margin (ubank specification)
  margin: {
    nod: spacingTokens[0],     // $margin-nod: 0px
    xs: spacingTokens[4],      // $margin-xs: 4px
    sm: spacingTokens[8],      // $margin-sm: 8px
    md: spacingTokens[12],     // $margin-md: 12px (default)
    m: spacingTokens[16],      // $margin-m: 16px
    lg: spacingTokens[24],     // $margin-lg: 24px
    xl: spacingTokens[32],     // $margin-xl: 32px
    xxl: spacingTokens[40],    // $margin-xxl: 40px
  },
  
  // Legacy semantic spacing for backward compatibility
  component: {
    xxs: spacingTokens[4],     // 4px
    xs: spacingTokens[8],      // 8px
    sm: spacingTokens[12],     // 12px
    md: spacingTokens[16],     // 16px
    lg: spacingTokens[24],     // 24px
    xl: spacingTokens[32],     // 32px
    xxl: spacingTokens[48],    // 48px
  },
  
  // Layout spacing
  layout: {
    xs: spacingTokens[16],     // 16px
    sm: spacingTokens[24],     // 24px
    md: spacingTokens[32],     // 32px
    lg: spacingTokens[48],     // 48px
    xl: spacingTokens[56],     // 56px
  },
  
  // Inline spacing (for buttons, form elements, etc.)
  inline: {
    xs: spacingTokens[4],      // 4px
    sm: spacingTokens[8],      // 8px
    md: spacingTokens[12],     // 12px
    lg: spacingTokens[16],     // 16px
    xl: spacingTokens[24],     // 24px
  },
} as const; 