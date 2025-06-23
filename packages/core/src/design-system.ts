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
export const ds: DesignTokens = {
  colors,
  spacing,
  typography,
  breakpoints,
  shadows,
  radius,
  transitions,
  
  // Semantic shortcuts that developers love
  space: spacing, // alias for spacing
  text: typography.text, // quick access to text sizes
  font: typography.font, // quick access to font families
  
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
