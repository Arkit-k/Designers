/**
 * 🔥 TypeScript types that make developers happy
 * 
 * These types provide amazing autocomplete and catch errors early.
 */

// Color system types
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface Colors {
  // Grayscale
  white: string;
  black: string;
  gray: ColorScale;
  
  // Brand colors
  blue: ColorScale;
  green: ColorScale;
  red: ColorScale;
  yellow: ColorScale;
  purple: ColorScale;
  pink: ColorScale;
  indigo: ColorScale;
  teal: ColorScale;
  orange: ColorScale;
  
  // Semantic colors (auto-generated from brand colors)
  primary: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
}

// Spacing system
export interface SpacingScale {
  0: string;
  px: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
  36: string;
  40: string;
  44: string;
  48: string;
  52: string;
  56: string;
  60: string;
  64: string;
  72: string;
  80: string;
  96: string;
}

// Typography system
export interface TypographyScale {
  font: {
    sans: string[];
    serif: string[];
    mono: string[];
  };
  text: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    '7xl': string;
    '8xl': string;
    '9xl': string;
  };
  weight: {
    thin: string;
    light: string;
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
    extrabold: string;
    black: string;
  };
  leading: {
    none: string;
    tight: string;
    snug: string;
    normal: string;
    relaxed: string;
    loose: string;
  };
}

// Breakpoints
export interface Breakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// Effects
export interface Effects {
  shadows: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
    none: string;
  };
  radius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
  };
  transitions: {
    none: string;
    all: string;
    default: string;
    colors: string;
    opacity: string;
    shadow: string;
    transform: string;
  };
}

// Main design tokens interface
export interface DesignTokens {
  colors: Colors;
  spacing: SpacingScale;
  typography: TypographyScale;
  breakpoints: Breakpoints;
  shadows: Effects['shadows'];
  radius: Effects['radius'];
  transitions: Effects['transitions'];
  
  // Aliases for developer convenience
  space: SpacingScale;
  text: TypographyScale['text'];
  font: TypographyScale['font'];
  
  // Utility functions
  responsive: (values: Record<string, any>) => Record<string, any>;
  alpha: (color: string, alpha: number) => string;
  stack: (size: keyof SpacingScale) => any;
  cluster: (size: keyof SpacingScale) => any;
}

// Theme configuration
export interface ThemeConfig {
  colors?: Partial<Colors>;
  spacing?: Partial<SpacingScale>;
  typography?: Partial<TypographyScale>;
  breakpoints?: Partial<Breakpoints>;
  effects?: Partial<Effects>;
}

// Theme type
export interface Theme extends DesignTokens {
  name: string;
  mode: 'light' | 'dark';
}

// Responsive value type
export type ResponsiveValue<T> = T | {
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

// CSS property types for better autocomplete
export type CSSProperties = {
  [K in keyof React.CSSProperties]: ResponsiveValue<React.CSSProperties[K]>;
};

// Utility type for extracting token keys
export type TokenKeys<T> = T extends Record<infer K, any> ? K : never;
