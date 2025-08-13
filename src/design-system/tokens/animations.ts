export const animationTokens = {
  // Duration
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms',
    slowest: '750ms',
  },
  
  // Timing functions (easing)
  easing: {
    linear: 'linear',
    ease: 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
    
    // Custom cubic-bezier curves
    'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    'bounce-in': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
    'bounce-in-out': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    
    'back-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    'back-in': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
    'back-in-out': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    
    'elastic-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    'elastic-in': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
    'elastic-in-out': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  },
  
  // Common transitions (using string literals to avoid circular reference)
  transition: {
    none: 'none',
    all: 'all 250ms ease-out',
    colors: 'color 150ms ease-out, background-color 150ms ease-out, border-color 150ms ease-out',
    opacity: 'opacity 250ms ease-out',
    shadow: 'box-shadow 250ms ease-out',
    transform: 'transform 250ms ease-out',
  },
} as const;

// Keyframe animations
export const keyframes = {
  // Fade animations
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  fadeOut: {
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
  },
  
  // Scale animations
  scaleIn: {
    '0%': { transform: 'scale(0.95)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
  scaleOut: {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '100%': { transform: 'scale(0.95)', opacity: '0' },
  },
  
  // Slide animations
  slideInFromTop: {
    '0%': { transform: 'translateY(-10px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  slideInFromBottom: {
    '0%': { transform: 'translateY(10px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  slideInFromLeft: {
    '0%': { transform: 'translateX(-10px)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  slideInFromRight: {
    '0%': { transform: 'translateX(10px)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  
  // Rotation animations
  spin: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  
  // Pulse animation
  pulse: {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' },
  },
  
  // Bounce animation
  bounce: {
    '0%, 100%': { transform: 'translateY(-25%)', 'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)' },
    '50%': { transform: 'translateY(0)', 'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)' },
  },
} as const; 