export const borderTokens = {
  // Border widths - updated to match ubank stroke weights
  width: {
    0: '0',
    thin: '1px',       // w-stroke-weight-1
    medium: '1.5px',   // w-stroke-weight-1-half (for icons and buttons)
    thick: '2px',      // w-stroke-weight-2 (for buttons and validation)
  },
  
  // Border styles
  style: {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
    none: 'none',
  },
  
  // Border radius - updated to match ubank specification exactly
  radius: {
    none: '0px',      // $border-radius-nod
    xs: '4px',        // $border-radius-xs (small components: Segmented, Arrow)
    sm: '8px',        // $border-radius-sm (Button, Input, Select small size)
    md: '12px',       // $margin-md (default for Cards and Action tiles)
    lg: '16px',       // $border-radius-m
    xl: '24px',       // $border-radius-lg (Action Sheets, Modals)
    '2xl': '32px',    // $border-radius-xl
    '3xl': '40px',    // $border-radius-xxl
    '4xl': '48px',    // $border-radius-xxxl
    full: '200px',    // $border-radius-full (Buttons and Pills)
  },
} as const;

// Semantic border combinations - updated for ubank specification
export const semanticBorders = {
  // Default borders (Cards and Action tiles)
  default: {
    width: borderTokens.width.thin,
    style: borderTokens.style.solid,
    radius: borderTokens.radius.md,  // 12px for Cards/Action tiles
  },
  
  // Interactive element borders (Buttons, Input, Select small size)
  interactive: {
    width: borderTokens.width.thin,
    style: borderTokens.style.solid,
    radius: borderTokens.radius.sm,  // 8px for Buttons/Inputs
  },
  
  // Card borders (default border radius for cards)
  card: {
    width: borderTokens.width.thin,
    style: borderTokens.style.solid,
    radius: borderTokens.radius.md,  // 12px per ubank spec
  },
  
  // Button borders (small components)
  button: {
    width: borderTokens.width.medium,  // 1.5px for button stroke weight
    style: borderTokens.style.solid,
    radius: borderTokens.radius.sm,    // 8px for buttons
  },
  
  // Input borders 
  input: {
    width: borderTokens.width.thin,
    style: borderTokens.style.solid,
    radius: borderTokens.radius.sm,    // 8px for inputs
  },
  
  // Focus borders (validation)
  focus: {
    width: borderTokens.width.thick,   // 2px for validation
    style: borderTokens.style.solid,
    radius: borderTokens.radius.sm,    // 8px
  },
  
  // Modal/Action Sheet borders
  modal: {
    width: borderTokens.width.thin,
    style: borderTokens.style.solid,
    radius: borderTokens.radius.xl,    // 24px for Action Sheets/Modals
  },
  
  // Small component borders (Segmented, Arrow)
  small: {
    width: borderTokens.width.thin,
    style: borderTokens.style.solid,
    radius: borderTokens.radius.xs,    // 4px for small components
  },
} as const; 