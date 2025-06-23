/**
 * Color system with semantic scales and light/dark mode support
 */

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

export interface ColorSystem {
  // Base colors
  white: string;
  black: string;
  transparent: string;
  
  // Gray scale
  gray: ColorScale;
  
  // Brand colors
  primary: ColorScale;
  secondary: ColorScale;
  
  // Semantic colors
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
}

export interface SemanticColors {
  // Text colors
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    disabled: string;
  };
  
  // Background colors
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    overlay: string;
  };
  
  // Border colors
  border: {
    primary: string;
    secondary: string;
    tertiary: string;
    focus: string;
    error: string;
    success: string;
  };
  
  // Interactive colors
  interactive: {
    primary: string;
    primaryHover: string;
    primaryActive: string;
    secondary: string;
    secondaryHover: string;
    secondaryActive: string;
  };
}

// Base color palette
export const baseColors: ColorSystem = {
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
  
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  
  info: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
};

// Light theme semantic colors
export const lightSemanticColors: SemanticColors = {
  text: {
    primary: baseColors.gray[900],
    secondary: baseColors.gray[700],
    tertiary: baseColors.gray[500],
    inverse: baseColors.white,
    disabled: baseColors.gray[400],
  },
  
  background: {
    primary: baseColors.white,
    secondary: baseColors.gray[50],
    tertiary: baseColors.gray[100],
    inverse: baseColors.gray[900],
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  border: {
    primary: baseColors.gray[200],
    secondary: baseColors.gray[300],
    tertiary: baseColors.gray[400],
    focus: baseColors.primary[500],
    error: baseColors.error[500],
    success: baseColors.success[500],
  },
  
  interactive: {
    primary: baseColors.primary[600],
    primaryHover: baseColors.primary[700],
    primaryActive: baseColors.primary[800],
    secondary: baseColors.gray[100],
    secondaryHover: baseColors.gray[200],
    secondaryActive: baseColors.gray[300],
  },
};

// Dark theme semantic colors
export const darkSemanticColors: SemanticColors = {
  text: {
    primary: baseColors.gray[100],
    secondary: baseColors.gray[300],
    tertiary: baseColors.gray[500],
    inverse: baseColors.gray[900],
    disabled: baseColors.gray[600],
  },
  
  background: {
    primary: baseColors.gray[900],
    secondary: baseColors.gray[800],
    tertiary: baseColors.gray[700],
    inverse: baseColors.white,
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  
  border: {
    primary: baseColors.gray[700],
    secondary: baseColors.gray[600],
    tertiary: baseColors.gray[500],
    focus: baseColors.primary[400],
    error: baseColors.error[400],
    success: baseColors.success[400],
  },
  
  interactive: {
    primary: baseColors.primary[500],
    primaryHover: baseColors.primary[400],
    primaryActive: baseColors.primary[300],
    secondary: baseColors.gray[700],
    secondaryHover: baseColors.gray[600],
    secondaryActive: baseColors.gray[500],
  },
};

export type ColorTheme = 'light' | 'dark';

export const colorThemes = {
  light: {
    colors: baseColors,
    semantic: lightSemanticColors,
  },
  dark: {
    colors: baseColors,
    semantic: darkSemanticColors,
  },
} as const;
