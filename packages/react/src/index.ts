/**
 * @designers/react - React hooks and providers for Designers design system
 * 
 * Provides React-specific utilities including:
 * - Design system provider and context
 * - Responsive design hooks
 * - Color scheme management
 * - Design token access hooks
 * - TypeScript support for all hooks
 */

// Provider exports
export {
  DesignSystemProvider,
  useDesignSystemContext
} from './providers/DesignSystemProvider';
export type {
  DesignSystemConfig,
  DesignSystemContextValue,
  DesignSystemProviderProps
} from './providers/DesignSystemProvider';

// Theme Mode Provider exports
export {
  ThemeModeProvider,
  useThemeMode,
  injectThemeTransitionCSS
} from './providers/ThemeModeProvider';
export type {
  ThemeMode,
  ThemeModeConfig,
  ThemeModeContextValue,
  ThemeModeProviderProps
} from './providers/ThemeModeProvider';

// Design tokens hooks
export { 
  useDesignTokens, 
  useColors, 
  useSpacing, 
  useTypography, 
  useEffects 
} from './hooks/useDesignTokens';
export type { DesignTokens } from './hooks/useDesignTokens';

// Responsive hooks
export { 
  useResponsive, 
  useBreakpoint, 
  useBreakpointMatch, 
  useBreakpointUp, 
  useBreakpointDown, 
  useResponsiveValue, 
  useMediaQuery 
} from './hooks/useResponsive';
export type { 
  ResponsiveState, 
  ResponsiveUtilities 
} from './hooks/useResponsive';

// Color scheme hooks
export { 
  useColorScheme, 
  useTheme, 
  useIsDark, 
  useIsLight, 
  useThemeToggle, 
  useSystemColorScheme, 
  usePrefersReducedMotion, 
  usePrefersHighContrast 
} from './hooks/useColorScheme';
export type { 
  ColorSchemeState, 
  ColorSchemeUtilities 
} from './hooks/useColorScheme';

// Component exports
export {
  ThemeModeSelector
} from './components';
export type {
  ThemeModeSelectorProps,
  ThemeOption
} from './components';

// Re-export core types for convenience
export type {
  ColorTheme,
  BreakpointKey,
  ResponsiveValue,
  SpacingKey,
  ShadowKey,
  BorderRadiusKey,
  TypographyScale,
} from '@designers/core';

// Version
export const version = '0.1.0';
