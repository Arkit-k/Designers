/**
 * 🎨 Designers - Zero-config design tokens that just work
 *
 * The design system developers actually want to use:
 * ✨ Zero configuration - works out of the box
 * 🔥 Full TypeScript support with autocomplete
 * 🎯 Framework agnostic - works with any CSS solution
 * 🚀 Tiny bundle size - only what you use
 * 🔄 Hot reload support in development
 */

// Core design system - everything you need
export { ds } from './design-system';

// Individual token exports for tree-shaking
export { colors } from './tokens/colors';
export { spacing } from './tokens/spacing';
export { typography } from './tokens/typography';
export { breakpoints } from './tokens/breakpoints';
export { shadows, radius, transitions, opacity, borderRadius } from './tokens/effects';

// Utilities that developers actually use
export {
  createTheme,
  extendTheme,
  generateCSS,
  generateTailwindConfig,
  responsiveValue,
  colorMix,
  spacingScale
} from './utils';

// Theme mode utilities
export {
  generateThemeModeCSS,
  generateAllThemeModesCSS,
  getThemeModeConfig,
  supportsEffect,
  generateThemeAwareCSS,
  injectThemeModeCSS,
  themeModeConfigs
} from './theme-modes';

// Types for TypeScript users
export type {
  Theme,
  ColorScale,
  SpacingScale,
  TypographyScale,
  ResponsiveValue,
  DesignTokens,
  ThemeConfig
} from './types';

// Theme mode types
export type {
  ThemeMode,
  ThemeModeConfig
} from './theme-modes';

// Version
export const version = '1.0.0';
