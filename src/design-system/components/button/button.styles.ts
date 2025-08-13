import { designTokens } from '../../tokens';

// Base button styles that work with React inline styles
export const buttonBaseStyles = {
  // Reset and base styles
  appearance: 'none' as const,
  border: 'none',
  margin: 0,
  padding: 0,
  
  // Typography
  fontFamily: designTokens.typography.fontFamily.primary.join(', '),
  textDecoration: 'none',
  textAlign: 'center' as const,
  whiteSpace: 'nowrap' as const,
  
  // Layout
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  
  // Interaction
  cursor: 'pointer',
  userSelect: 'none' as const,
  
  // Transitions
  transition: 'all 0.2s ease-in-out',
} as const;

// Updated variant styles based on Figma design
export const buttonVariants = {
  primary: {
    base: {
      backgroundColor: designTokens.colors.secondary.default, // Teal/aqua color
      color: designTokens.colors.neutral[10], // Dark text
      borderWidth: designTokens.borders.width.thin,
      borderStyle: designTokens.borders.style.solid,
      borderColor: designTokens.colors.secondary.default,
      fontWeight: designTokens.typography.fontWeight.medium,
    },
    hover: {
      backgroundColor: designTokens.colors.secondary.pastel,
      borderColor: designTokens.colors.secondary.pastel,
      transform: 'translateY(-1px)',
      boxShadow: `0 4px 12px rgba(0, 255, 234, 0.3)`,
    },
    active: {
      backgroundColor: designTokens.colors.secondary.light,
      borderColor: designTokens.colors.secondary.light,
      transform: 'translateY(0px)',
      boxShadow: `0 2px 8px rgba(0, 255, 234, 0.4)`,
    },
    focus: {
      outline: 'none',
      boxShadow: `0 0 0 3px rgba(0, 255, 234, 0.3)`,
    },
    disabled: {
      backgroundColor: designTokens.colors.neutral[3],
      color: designTokens.colors.neutral[5],
      borderColor: designTokens.colors.neutral[3],
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
    },
  },
  
  secondary: {
    base: {
      backgroundColor: designTokens.colors.neutral[2], // Light gray
      color: designTokens.colors.neutral[7],
      borderWidth: designTokens.borders.width.thin,
      borderStyle: designTokens.borders.style.solid,
      borderColor: designTokens.colors.neutral[3],
      fontWeight: designTokens.typography.fontWeight.medium,
    },
    hover: {
      backgroundColor: designTokens.colors.neutral[3],
      borderColor: designTokens.colors.neutral[4],
      transform: 'translateY(-1px)',
      boxShadow: designTokens.shadows.sm,
    },
    active: {
      backgroundColor: designTokens.colors.neutral[4],
      borderColor: designTokens.colors.neutral[5],
      transform: 'translateY(0px)',
    },
    focus: {
      outline: 'none',
      boxShadow: `0 0 0 3px rgba(162, 162, 162, 0.3)`,
    },
    disabled: {
      backgroundColor: designTokens.colors.neutral[1],
      color: designTokens.colors.neutral[4],
      borderColor: designTokens.colors.neutral[2],
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
    },
  },
  
  ghost: {
    base: {
      backgroundColor: 'transparent',
      color: 'var(--ds-button-ghost-text)',
      borderWidth: designTokens.borders.width.thin,
      borderStyle: designTokens.borders.style.solid,
      borderColor: 'var(--ds-button-ghost-border)',
      fontWeight: designTokens.typography.fontWeight.medium,
    },
    hover: {
      backgroundColor: 'var(--ds-button-ghost-hover-bg)',
      borderColor: 'var(--ds-button-ghost-hover-border)',
      color: 'var(--ds-button-ghost-hover-text)',
    },
    active: {
      backgroundColor: 'var(--ds-button-ghost-hover-bg)',
      borderColor: 'var(--ds-button-ghost-hover-border)',
      color: 'var(--ds-button-ghost-hover-text)',
    },
    focus: {
      outline: 'none',
      boxShadow: 'var(--ds-shadow-focus)',
    },
    disabled: {
      backgroundColor: 'transparent',
      color: 'var(--ds-color-text-disabled)',
      borderColor: 'var(--ds-color-border-secondary)',
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
  
  destructive: {
    base: {
      backgroundColor: designTokens.colors.error.medium,
      color: designTokens.colors.neutral[0],
      borderWidth: designTokens.borders.width.thin,
      borderStyle: designTokens.borders.style.solid,
      borderColor: designTokens.colors.error.medium,
      fontWeight: designTokens.typography.fontWeight.medium,
    },
    hover: {
      backgroundColor: designTokens.colors.error.vibrant,
      borderColor: designTokens.colors.error.vibrant,
      transform: 'translateY(-1px)',
      boxShadow: `0 4px 12px rgba(150, 13, 36, 0.3)`,
    },
    active: {
      backgroundColor: designTokens.colors.error.dark,
      borderColor: designTokens.colors.error.dark,
      transform: 'translateY(0px)',
    },
    focus: {
      outline: 'none',
      boxShadow: `0 0 0 3px rgba(150, 13, 36, 0.3)`,
    },
    disabled: {
      backgroundColor: designTokens.colors.neutral[3],
      color: designTokens.colors.neutral[5],
      borderColor: designTokens.colors.neutral[3],
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
    },
  },

  // Dark variant for dark backgrounds
  dark: {
    base: {
      backgroundColor: designTokens.colors.neutral[8],
      color: designTokens.colors.neutral[0],
      borderWidth: designTokens.borders.width.thin,
      borderStyle: designTokens.borders.style.solid,
      borderColor: designTokens.colors.neutral[8],
      fontWeight: designTokens.typography.fontWeight.medium,
    },
    hover: {
      backgroundColor: designTokens.colors.neutral[7],
      borderColor: designTokens.colors.neutral[7],
      transform: 'translateY(-1px)',
      boxShadow: designTokens.shadows.md,
    },
    active: {
      backgroundColor: designTokens.colors.neutral[9],
      borderColor: designTokens.colors.neutral[9],
      transform: 'translateY(0px)',
    },
    focus: {
      outline: 'none',
      boxShadow: `0 0 0 3px rgba(52, 52, 52, 0.3)`,
    },
    disabled: {
      backgroundColor: designTokens.colors.neutral[5],
      color: designTokens.colors.neutral[3],
      borderColor: designTokens.colors.neutral[5],
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
    },
  },
} as const;

// Updated button sizes to match Figma specifications
export const buttonSizes = {
  xs: {
    padding: `${designTokens.spacing[4]} ${designTokens.spacing[8]}`,
    fontSize: designTokens.typography.fontSize.xs,
    lineHeight: designTokens.typography.lineHeight.normal,
    fontWeight: designTokens.typography.fontWeight.medium,
    borderRadius: designTokens.borders.radius.sm,
    minHeight: '24px',
    gap: designTokens.spacing[4],
  },
  
  sm: {
    padding: `${designTokens.spacing[8]} ${designTokens.spacing[12]}`,
    fontSize: designTokens.typography.fontSize.sm,
    lineHeight: designTokens.typography.lineHeight.normal,
    fontWeight: designTokens.typography.fontWeight.medium,
    borderRadius: designTokens.borders.radius.sm,
    minHeight: '32px',
    gap: designTokens.spacing[8],
  },
  
  md: {
    padding: `${designTokens.spacing[8]} ${designTokens.spacing[16]}`,
    fontSize: designTokens.typography.fontSize.base,
    lineHeight: designTokens.typography.lineHeight.normal,
    fontWeight: designTokens.typography.fontWeight.medium,
    borderRadius: designTokens.borders.radius.sm,
    minHeight: '40px',
    gap: designTokens.spacing[8],
  },
  
  lg: {
    padding: `${designTokens.spacing[12]} ${designTokens.spacing[24]}`,
    fontSize: designTokens.typography.fontSize.lg,
    lineHeight: designTokens.typography.lineHeight.normal,
    fontWeight: designTokens.typography.fontWeight.medium,
    borderRadius: designTokens.borders.radius.sm,
    minHeight: '48px',
    gap: designTokens.spacing[8],
  },
  
  xl: {
    padding: `${designTokens.spacing[16]} ${designTokens.spacing[32]}`,
    fontSize: designTokens.typography.fontSize.xl,
    lineHeight: designTokens.typography.lineHeight.normal,
    fontWeight: designTokens.typography.fontWeight.medium,
    borderRadius: designTokens.borders.radius.sm,
    minHeight: '56px',
    gap: designTokens.spacing[12],
  },
} as const;

// Icon button specific styles
export const iconButtonStyles = {
  aspectRatio: '1',
  paddingLeft: '0',
  paddingRight: '0',
} as const;

// Full width button styles
export const fullWidthStyles = {
  width: '100%',
} as const; 