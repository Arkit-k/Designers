/**
 * useDesignTokens - Hook for accessing design tokens with TypeScript support
 */

import { useMemo } from 'react';
import { 
  colorThemes, 
  typography, 
  spacing, 
  breakpoints, 
  shadows, 
  gradients, 
  borderRadius, 
  opacity,
  getColor,
  createStyles,
  type ColorTheme,
  type BreakpointKey,
  type SpacingKey,
  type ShadowKey,
  type BorderRadiusKey,
  type OpacityKey,
} from '@designers/core';
import { useDesignSystemContext } from '../providers/DesignSystemProvider';

export interface DesignTokens {
  // Color utilities
  colors: typeof colorThemes.light.colors;
  semantic: typeof colorThemes.light.semantic;
  getColor: (path: string) => string;
  
  // Typography
  typography: typeof typography;
  
  // Spacing
  spacing: typeof spacing;
  getSpacing: (key: SpacingKey) => string;
  
  // Breakpoints
  breakpoints: typeof breakpoints;
  currentBreakpoint: BreakpointKey;
  
  // Effects
  shadows: typeof shadows;
  getShadow: (key: ShadowKey) => string;
  gradients: typeof gradients;
  borderRadius: typeof borderRadius;
  getBorderRadius: (key: BorderRadiusKey) => string;
  opacity: typeof opacity;
  getOpacity: (key: OpacityKey) => string;
  
  // Theme info
  theme: ColorTheme;
  isDark: boolean;
  isLight: boolean;
  
  // CSS-in-JS utilities
  styles: ReturnType<typeof createStyles>;
}

/**
 * Hook to access all design tokens with current theme context
 */
export function useDesignTokens(): DesignTokens {
  const { theme, breakpoint } = useDesignSystemContext();
  
  const tokens = useMemo(() => {
    const themeData = colorThemes[theme];
    const styles = createStyles(theme);
    
    return {
      // Color utilities
      colors: themeData.colors,
      semantic: themeData.semantic,
      getColor: (path: string) => getColor(theme, path),
      
      // Typography
      typography,
      
      // Spacing
      spacing,
      getSpacing: (key: SpacingKey) => spacing[key],
      
      // Breakpoints
      breakpoints,
      currentBreakpoint: breakpoint,
      
      // Effects
      shadows,
      getShadow: (key: ShadowKey) => shadows[key],
      gradients,
      borderRadius,
      getBorderRadius: (key: BorderRadiusKey) => borderRadius[key],
      opacity,
      getOpacity: (key: OpacityKey) => opacity[key],
      
      // Theme info
      theme,
      isDark: theme === 'dark',
      isLight: theme === 'light',
      
      // CSS-in-JS utilities
      styles,
    };
  }, [theme, breakpoint]);
  
  return tokens;
}

/**
 * Hook to access only color tokens
 */
export function useColors() {
  const { colors, semantic, getColor, theme, isDark, isLight } = useDesignTokens();
  
  return {
    colors,
    semantic,
    getColor,
    theme,
    isDark,
    isLight,
  };
}

/**
 * Hook to access only spacing tokens
 */
export function useSpacing() {
  const { spacing, getSpacing } = useDesignTokens();
  
  return {
    spacing,
    getSpacing,
    // Convenience methods
    xs: spacing[1],
    sm: spacing[2],
    md: spacing[4],
    lg: spacing[6],
    xl: spacing[8],
    '2xl': spacing[12],
    '3xl': spacing[16],
  };
}

/**
 * Hook to access only typography tokens
 */
export function useTypography() {
  const { typography } = useDesignTokens();
  
  return {
    typography,
    // Convenience accessors
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize,
    fontWeight: typography.fontWeight,
    lineHeight: typography.lineHeight,
    letterSpacing: typography.letterSpacing,
    heading: typography.heading,
    body: typography.body,
    display: typography.display,
    code: typography.code,
  };
}

/**
 * Hook to access only shadow and effect tokens
 */
export function useEffects() {
  const { 
    shadows, 
    getShadow, 
    gradients, 
    borderRadius, 
    getBorderRadius, 
    opacity, 
    getOpacity 
  } = useDesignTokens();
  
  return {
    shadows,
    getShadow,
    gradients,
    borderRadius,
    getBorderRadius,
    opacity,
    getOpacity,
  };
}
