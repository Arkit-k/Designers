/**
 * 🎨 The main design system object
 * 
 * This is what developers import and use everywhere.
 * Simple, predictable, and powerful.
 */

import { colors } from './tokens/colors';
import { spacing } from './tokens/spacing';
import { typography } from './tokens/typography';
import { breakpoints } from './tokens/breakpoints';
import { shadows, radius, transitions } from './tokens/effects';
import type { DesignTokens } from './types';

/**
 * The main design system object
 * 
 * @example
 * ```ts
 * import { ds } from 'designers';
 * 
 * // Use anywhere in your app
 * const styles = {
 *   color: ds.colors.blue[500],
 *   padding: ds.spacing[4],
 *   fontSize: ds.typography.text.lg,
 *   borderRadius: ds.radius.md,
 *   boxShadow: ds.shadows.lg
 * };
 * ```
 */
// Create a typography scale that matches the expected TypographyScale interface
const typographyScale = {
  font: {
    sans: typography.fontFamily.sans,
    serif: typography.fontFamily.serif,
    mono: typography.fontFamily.mono,
  },
  text: {
    xs: typography.fontSize.xs,
    sm: typography.fontSize.sm,
    base: typography.fontSize.base,
    lg: typography.fontSize.lg,
    xl: typography.fontSize.xl,
    '2xl': typography.fontSize['2xl'],
    '3xl': typography.fontSize['3xl'],
    '4xl': typography.fontSize['4xl'],
    '5xl': typography.fontSize['5xl'],
    '6xl': typography.fontSize['6xl'],
    '7xl': typography.fontSize['7xl'],
    '8xl': typography.fontSize['8xl'],
    '9xl': typography.fontSize['9xl'],
  },
  weight: {
    thin: typography.fontWeight.thin.toString(),
    light: typography.fontWeight.light.toString(),
    normal: typography.fontWeight.normal.toString(),
    medium: typography.fontWeight.medium.toString(),
    semibold: typography.fontWeight.semibold.toString(),
    bold: typography.fontWeight.bold.toString(),
    extrabold: typography.fontWeight.extrabold.toString(),
    black: typography.fontWeight.black.toString(),
  },
  leading: {
    none: typography.lineHeight.none.toString(),
    tight: typography.lineHeight.tight.toString(),
    snug: typography.lineHeight.snug.toString(),
    normal: typography.lineHeight.normal.toString(),
    relaxed: typography.lineHeight.relaxed.toString(),
    loose: typography.lineHeight.loose.toString(),
  },
};

// Create a simple breakpoints object that matches the expected Breakpoints interface
const breakpointsScale = {
  sm: breakpoints.sm.min,
  md: breakpoints.md.min,
  lg: breakpoints.lg.min,
  xl: breakpoints.xl.min,
  '2xl': breakpoints['2xl'].min,
};

// Create a transitions object that matches the expected Effects['transitions'] interface
const transitionsScale = {
  none: 'none',
  all: 'all 150ms ease-in-out',
  default: transitions.default,
  colors: 'color 150ms ease-in-out, background-color 150ms ease-in-out, border-color 150ms ease-in-out',
  opacity: 'opacity 150ms ease-in-out',
  shadow: 'box-shadow 150ms ease-in-out',
  transform: 'transform 150ms ease-in-out',
};

export const ds: DesignTokens = {
  colors,
  spacing,
  typography: typographyScale,
  breakpoints: breakpointsScale,
  shadows,
  radius,
  transitions: transitionsScale,

  // Semantic shortcuts that developers love
  space: spacing, // alias for spacing
  text: typographyScale.text, // quick access to text sizes
  font: typographyScale.font, // quick access to font families
  
  // Utility functions attached to the main object
  responsive: (values: Record<string, any>) => {
    return Object.entries(values).reduce((acc, [key, value]) => {
      const bp = breakpoints[key as keyof typeof breakpoints];
      if (bp) {
        acc[`@media (min-width: ${bp})`] = value;
      }
      return acc;
    }, {} as Record<string, any>);
  },
  
  // Color utilities
  alpha: (color: string, alpha: number) => {
    // Simple alpha utility for any color
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return color;
  },
  
  // Spacing utilities
  stack: (size: keyof typeof spacing) => ({
    '& > * + *': {
      marginTop: spacing[size]
    }
  }),
  
  cluster: (size: keyof typeof spacing) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[size]
  })
};

// Make it extensible
export const extendDesignSystem = (extensions: Partial<DesignTokens>) => {
  return { ...ds, ...extensions };
};

// CSS-in-JS helper
export const css = (styles: any) => styles;

// Styled-components helper
export const styled = {
  div: (styles: any) => styles,
  span: (styles: any) => styles,
  button: (styles: any) => styles,
  // Add more as needed
};
