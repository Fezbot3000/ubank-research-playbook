export const typographyTokens = {
  // Font Families - ubank Brand Fonts
  fontFamily: {
    // Primary brand typeface - used everywhere from logo to app
    primary: ['Greycliff CF', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    // Headline typeface - for impact and expression, never for body copy
    headline: ['Tungsten Rounded', 'Impact', 'Arial Black', 'sans-serif'],
    // Fallback sans-serif for general use
    sans: ['Greycliff CF', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    // Monospace for code and technical content
    mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
  },
  
  // Font Sizes - ubank specification (converted to rem)
  fontSize: {
    // Caption sizes
    'caption': '0.75rem',     // 12px
    // Description sizes  
    'description': '0.875rem', // 14px
    // Body sizes
    'body': '1rem',           // 16px
    'base': '1rem',           // 16px - alias for body
    // Label sizes
    'label': '1.125rem',      // 18px
    'lg': '1.125rem',         // 18px - alias for label
    // Heading 6
    'h6': '1.5rem',           // 24px
    '2xl': '1.5rem',          // 24px - alias for h6
    // Heading 5
    'h5': '1.75rem',          // 28px
    // Heading 4
    'h4': '2rem',             // 32px
    // Heading 3
    'h3': '2.5rem',           // 40px
    // Heading 2
    'h2': '3rem',             // 48px
    '5xl': '3rem',            // 48px - alias for h2
    // Heading 1
    'h1': '3.5rem',           // 56px
    // Hero sizes
    'hero-small': '5rem',     // 80px
    'hero-large': '6rem',     // 96px
    
    // Legacy sizes for backward compatibility
    xs: '0.75rem',            // 12px
    sm: '0.875rem',           // 14px
    xl: '1.25rem',            // 20px
    '3xl': '1.875rem',        // 30px
    '4xl': '2.25rem',         // 36px
    '6xl': '3.75rem',         // 60px
    '7xl': '4.5rem',          // 72px
    '8xl': '6rem',            // 96px
    '9xl': '8rem',            // 128px
  },
  
  // Font Weights - ubank specification (only 4 weights)
  fontWeight: {
    regular: '400',     // Default font-weight. Use for body copy.
    medium: '500',      // Intro paragraphs, some text on mobile to increase legibility.
    demibold: '600',    // Use for links and elements that need to be highlighted for user attention.
    bold: '700',        // Use for headings.
    
    // Aliases for backward compatibility
    normal: '400',
    semibold: '600',
    
    // Additional weights for special cases
    thin: '100',
    extralight: '200',
    light: '300',
    extrabold: '800',
    black: '900',
  },
  
  // Line Heights - ubank specification (converted to unitless values)
  lineHeight: {
    // Specific line heights from ubank spec
    'caption': '1.333',       // 16px / 12px
    'description': '1.429',   // 20px / 14px  
    'body': '1.5',            // 24px / 16px
    'label': '1.556',         // 28px / 18px
    'h6': '1.333',            // 32px / 24px
    'h5': '1.286',            // 36px / 28px
    'h4': '1.25',             // 40px / 32px
    'h3': '1.2',              // 48px / 40px
    'h2': '1.25',             // 60px / 48px
    'h1': '1.143',            // 64px / 56px
    'hero-small': '0.9',      // 72px / 80px
    'hero-large': '0.833',    // 80px / 96px
    
    // Semantic line heights
    tight: '1.25',            // Headlines and display text
    snug: '1.375',            // Large text, subheadings
    normal: '1.5',            // Body text, standard reading
    relaxed: '1.625',         // Comfortable reading
    loose: '2',               // Spacious layouts
  },
  
  // Letter Spacing - Brand appropriate spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  // Text Transform
  textTransform: {
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
    none: 'none',
  },
} as const;

// Semantic Text Styles - Complete ubank typography system
export const textStyles = {
  // Hero Styles
  'hero-large': {
    fontSize: typographyTokens.fontSize['hero-large'],
    lineHeight: typographyTokens.lineHeight['hero-large'],
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.headline.join(', '),
  },
  'hero-small': {
    fontSize: typographyTokens.fontSize['hero-small'],
    lineHeight: typographyTokens.lineHeight['hero-small'],
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.headline.join(', '),
  },
  
  // Heading Styles - H1
  'h1-demibold': {
    fontSize: typographyTokens.fontSize.h1,
    lineHeight: typographyTokens.lineHeight.h1,
    fontWeight: typographyTokens.fontWeight.demibold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'h1-bold': {
    fontSize: typographyTokens.fontSize.h1,
    lineHeight: typographyTokens.lineHeight.h1,
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'h1-display': {
    fontSize: typographyTokens.fontSize.h1,
    lineHeight: typographyTokens.lineHeight.h1,
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.headline.join(', '),
  },
  
  // Heading Styles - H2
  'h2-demibold': {
    fontSize: typographyTokens.fontSize.h2,
    lineHeight: typographyTokens.lineHeight.h2,
    fontWeight: typographyTokens.fontWeight.demibold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'h2-bold': {
    fontSize: typographyTokens.fontSize.h2,
    lineHeight: typographyTokens.lineHeight.h2,
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'h2-display': {
    fontSize: typographyTokens.fontSize.h2,
    lineHeight: typographyTokens.lineHeight.h2,
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.headline.join(', '),
  },
  
  // Heading Styles - H3
  'h3-medium': {
    fontSize: typographyTokens.fontSize.h3,
    lineHeight: typographyTokens.lineHeight.h3,
    fontWeight: typographyTokens.fontWeight.medium,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'h3-demibold': {
    fontSize: typographyTokens.fontSize.h3,
    lineHeight: typographyTokens.lineHeight.h3,
    fontWeight: typographyTokens.fontWeight.demibold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'h3-bold': {
    fontSize: typographyTokens.fontSize.h3,
    lineHeight: typographyTokens.lineHeight.h3,
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'h3-display': {
    fontSize: typographyTokens.fontSize.h3,
    lineHeight: typographyTokens.lineHeight.h3,
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.headline.join(', '),
  },
  
  // Heading Styles - H4
  'h4-medium': {
    fontSize: typographyTokens.fontSize.h4,
    lineHeight: typographyTokens.lineHeight.h4,
    fontWeight: typographyTokens.fontWeight.medium,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'h4-demibold': {
    fontSize: typographyTokens.fontSize.h4,
    lineHeight: typographyTokens.lineHeight.h4,
    fontWeight: typographyTokens.fontWeight.demibold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'h4-bold': {
    fontSize: typographyTokens.fontSize.h4,
    lineHeight: typographyTokens.lineHeight.h4,
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'h4-display': {
    fontSize: typographyTokens.fontSize.h4,
    lineHeight: typographyTokens.lineHeight.h4,
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.headline.join(', '),
  },
  
  // Heading Styles - H5
  'h5-medium': {
    fontSize: typographyTokens.fontSize.h5,
    lineHeight: typographyTokens.lineHeight.h5,
    fontWeight: typographyTokens.fontWeight.medium,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'h5-demibold': {
    fontSize: typographyTokens.fontSize.h5,
    lineHeight: typographyTokens.lineHeight.h5,
    fontWeight: typographyTokens.fontWeight.demibold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'h5-bold': {
    fontSize: typographyTokens.fontSize.h5,
    lineHeight: typographyTokens.lineHeight.h5,
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  
  // Heading Styles - H6
  'h6-regular': {
    fontSize: typographyTokens.fontSize.h6,
    lineHeight: typographyTokens.lineHeight.h6,
    fontWeight: typographyTokens.fontWeight.regular,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'h6-medium': {
    fontSize: typographyTokens.fontSize.h6,
    lineHeight: typographyTokens.lineHeight.h6,
    fontWeight: typographyTokens.fontWeight.medium,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'h6-demibold': {
    fontSize: typographyTokens.fontSize.h6,
    lineHeight: typographyTokens.lineHeight.h6,
    fontWeight: typographyTokens.fontWeight.demibold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'h6-bold': {
    fontSize: typographyTokens.fontSize.h6,
    lineHeight: typographyTokens.lineHeight.h6,
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  
  // Paragraph Styles - Label
  'label-regular': {
    fontSize: typographyTokens.fontSize.label,
    lineHeight: typographyTokens.lineHeight.label,
    fontWeight: typographyTokens.fontWeight.regular,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'label-medium': {
    fontSize: typographyTokens.fontSize.label,
    lineHeight: typographyTokens.lineHeight.label,
    fontWeight: typographyTokens.fontWeight.medium,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'label-demibold': {
    fontSize: typographyTokens.fontSize.label,
    lineHeight: typographyTokens.lineHeight.label,
    fontWeight: typographyTokens.fontWeight.demibold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'label-bold': {
    fontSize: typographyTokens.fontSize.label,
    lineHeight: typographyTokens.lineHeight.label,
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  
  // Paragraph Styles - Body
  'body-regular': {
    fontSize: typographyTokens.fontSize.body,
    lineHeight: typographyTokens.lineHeight.body,
    fontWeight: typographyTokens.fontWeight.regular,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'body-medium': {
    fontSize: typographyTokens.fontSize.body,
    lineHeight: typographyTokens.lineHeight.body,
    fontWeight: typographyTokens.fontWeight.medium,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'body-demibold': {
    fontSize: typographyTokens.fontSize.body,
    lineHeight: typographyTokens.lineHeight.body,
    fontWeight: typographyTokens.fontWeight.demibold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'body-bold': {
    fontSize: typographyTokens.fontSize.body,
    lineHeight: typographyTokens.lineHeight.body,
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  
  // Paragraph Styles - Description
  'description-regular': {
    fontSize: typographyTokens.fontSize.description,
    lineHeight: typographyTokens.lineHeight.description,
    fontWeight: typographyTokens.fontWeight.regular,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'description-medium': {
    fontSize: typographyTokens.fontSize.description,
    lineHeight: typographyTokens.lineHeight.description,
    fontWeight: typographyTokens.fontWeight.medium,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'description-demibold': {
    fontSize: typographyTokens.fontSize.description,
    lineHeight: typographyTokens.lineHeight.description,
    fontWeight: typographyTokens.fontWeight.demibold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'description-bold': {
    fontSize: typographyTokens.fontSize.description,
    lineHeight: typographyTokens.lineHeight.description,
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  
  // Paragraph Styles - Caption
  'caption-regular': {
    fontSize: typographyTokens.fontSize.caption,
    lineHeight: typographyTokens.lineHeight.caption,
    fontWeight: typographyTokens.fontWeight.regular,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'caption-medium': {
    fontSize: typographyTokens.fontSize.caption,
    lineHeight: typographyTokens.lineHeight.caption,
    fontWeight: typographyTokens.fontWeight.medium,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'caption-demibold': {
    fontSize: typographyTokens.fontSize.caption,
    lineHeight: typographyTokens.lineHeight.caption,
    fontWeight: typographyTokens.fontWeight.demibold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
  'caption-bold': {
    fontSize: typographyTokens.fontSize.caption,
    lineHeight: typographyTokens.lineHeight.caption,
    fontWeight: typographyTokens.fontWeight.bold,
    fontFamily: typographyTokens.fontFamily.primary.join(', '),
  },
} as const; 