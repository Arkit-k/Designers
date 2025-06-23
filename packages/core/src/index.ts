/**
 * @designers/core - Core design tokens and utilities
 * 
 * A comprehensive design token system providing:
 * - Color system with light/dark mode support
 * - Typography with fluid scaling
 * - Consistent spacing system
 * - Responsive breakpoints
 * - Visual effects (shadows, gradients, etc.)
 * - Utility functions for token manipulation
 */

// Export all design tokens
export * from './tokens';

// Export utilities
export * from './utils/token-utils';

// Version
export const version = '0.1.0';

// Default theme configuration
export const defaultConfig = {
  theme: 'light' as const,
  breakpoint: 'md' as const,
  prefix: 'designers',
};

// Re-export commonly used types for convenience
export type {
  ColorTheme,
  BreakpointKey,
  ResponsiveValue,
  SpacingKey,
  ShadowKey,
  BorderRadiusKey,
  TypographyScale,
} from './tokens';

// Main design system object for easy access
export { colorThemes as themes } from './tokens/colors';
export { typography } from './tokens/typography';
export { spacing } from './tokens/spacing';
export { breakpoints } from './tokens/breakpoints';
export { shadows, gradients, borderRadius, opacity } from './tokens/effects';
