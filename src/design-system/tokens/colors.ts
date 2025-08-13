export const colorTokens = {
  // ubank Primary Colors (Old Purple)
  primary: {
    lightest: '#F0E6FF',
    lighter: '#E3C1FF', 
    light: '#E099FF',
    default: '#7B22FF',
    dark: '#4400C9',
    darker: '#190079',
  },
  
  // ubank Secondary Colors (Aqua)
  secondary: {
    light: '#E9FFFD',
    pastel: '#BFFFFA',
    default: '#00FFEA',
    medium: '#00847F',
    dark: '#00404C',
  },
  
  // ubank Neutral Colors
  neutral: {
    0: '#FFFFFF',
    1: '#F5F5F5',
    2: '#EAEAEA',
    3: '#E0E0E0',
    4: '#A2A2A2',
    5: '#5C5C5C',
    6: '#343434',
    7: '#282828',
    8: '#212121',
    9: '#141414',
    10: '#00090A',
  },
  
  // ubank Sentiment Colors - Info Blue
  info: {
    light: '#E5F1FC',
    vibrant: '#88D3FF',
    medium: '#095098',
    dark: '#2E445C',
  },
  
  // ubank Sentiment Colors - Success Green
  success: {
    light: '#E7F9EF',
    vibrant: '#0EDD6F',
    medium: '#237A53',
    dark: '#0C3A22',
  },
  
  // ubank Sentiment Colors - Alert Yellow
  warning: {
    light: '#FFF9DA',
    vibrant: '#FFEB87',
    medium: '#FFD600',
    dark: '#5F593F',
  },
  
  // ubank Sentiment Colors - Danger Red
  error: {
    light: '#FFDDE3',
    vibrant: '#FF768D',
    medium: '#960D24',
    dark: '#46151F',
  },
  
  // ubank Sentiment Colors - Callout Orange
  callout: {
    light: '#FCDECC',
    vibrant: '#FFAC7C',
    medium: '#F05800',
    dark: '#692D0B',
  },
  
  // ubank Reserved Colors - Cyan
  cyan: {
    light: '#D9F2FF',
    pastel: '#B2E5FF',
    vibrant: '#66CCFF',
    medium: '#148FCC',
    dark: '#093E59',
  },
  
  // ubank Reserved Colors - Blue
  blue: {
    light: '#D1DDFF',
    pastel: '#A6BCFF',
    vibrant: '#668CFF',
    medium: '#2952CC',
    dark: '#142966',
  },
  
  // ubank Reserved Colors - Purple
  purple: {
    light: '#EFC9FF',
    pastel: '#DFB2FF',
    vibrant: '#C36FFF',
    medium: '#8014CC',
    dark: '#441466',
  },
  
  // ubank Reserved Colors - Pink
  pink: {
    light: '#FFD9FF',
    pastel: '#FFB2FF',
    vibrant: '#FF66FF',
    medium: '#CC14CC',
    dark: '#590059',
  },
  
  // ubank Reserved Colors - Coral
  coral: {
    light: '#FFD1D9',
    pastel: '#FFA6B5',
    vibrant: '#FF6680',
    medium: '#CC1F3B',
    dark: '#660011',
  },
  
  // ubank Reserved Colors - Orange
  orange: {
    light: '#FFDDCC',
    pastel: '#FFBB99',
    vibrant: '#FF9966',
    medium: '#CC5F29',
    dark: '#4C1900',
  },
  
  // ubank Reserved Colors - Mustard
  mustard: {
    light: '#FFEECC',
    pastel: '#FFDD99',
    vibrant: '#FFC859',
    medium: '#CC921F',
    dark: '#4C3300',
  },
  
  // ubank Reserved Colors - Yellow
  yellow: {
    light: '#FFFAC7',
    pastel: '#FFF58C',
    vibrant: '#FFF266',
    medium: '#CCBF33',
    dark: '#4C4600',
  },
  
  // ubank Reserved Colors - Turf
  turf: {
    light: '#E2F2C2',
    pastel: '#D2F291',
    vibrant: '#C2F261',
    medium: '#8CBF26',
    dark: '#334C00',
  },
  
  // ubank Reserved Colors - Green
  green: {
    light: '#C6F7D6',
    pastel: '#94F7B5',
    vibrant: '#63F794',
    medium: '#28C75D',
    dark: '#004C19',
  },
} as const;

// Theme-specific color mappings aligned with ubank brand
export const lightTheme = {
  background: {
    primary: colorTokens.neutral[0],
    secondary: colorTokens.neutral[1],
    tertiary: colorTokens.neutral[2],
    inverse: colorTokens.neutral[10],
  },
  text: {
    primary: colorTokens.neutral[10],
    secondary: colorTokens.neutral[6],
    tertiary: colorTokens.neutral[4],
    inverse: colorTokens.neutral[0],
    disabled: colorTokens.neutral[3],
  },
  border: {
    primary: colorTokens.neutral[3],
    secondary: colorTokens.neutral[2],
    focus: colorTokens.primary.default,
    error: colorTokens.error.medium,
  },
  surface: {
    primary: colorTokens.neutral[0],
    secondary: colorTokens.neutral[1],
    tertiary: colorTokens.neutral[2],
    overlay: 'rgba(0, 9, 10, 0.5)',
  },
  brand: {
    primary: colorTokens.primary.default,
    secondary: colorTokens.secondary.default,
    accent: colorTokens.primary.light,
  },
} as const;

export const darkTheme = {
  background: {
    primary: colorTokens.neutral[10],
    secondary: colorTokens.neutral[9],
    tertiary: colorTokens.neutral[8],
    inverse: colorTokens.neutral[0],
  },
  text: {
    primary: colorTokens.neutral[0],
    secondary: colorTokens.neutral[3],
    tertiary: colorTokens.neutral[5],
    inverse: colorTokens.neutral[10],
    disabled: colorTokens.neutral[6],
  },
  border: {
    primary: colorTokens.neutral[7],
    secondary: colorTokens.neutral[8],
    focus: colorTokens.primary.light,
    error: colorTokens.error.vibrant,
  },
  surface: {
    primary: colorTokens.neutral[9],
    secondary: colorTokens.neutral[8],
    tertiary: colorTokens.neutral[7],
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
  brand: {
    primary: colorTokens.primary.light,
    secondary: colorTokens.secondary.default,
    accent: colorTokens.primary.lighter,
  },
} as const; 