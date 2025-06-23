/**
 * Utility functions for working with design tokens
 */

import type { 
  ColorTheme, 
  BreakpointKey, 
  ResponsiveValue,
  SpacingKey,
  ShadowKey,
  BorderRadiusKey 
} from '../tokens';

import { 
  colorThemes, 
  breakpoints, 
  spacing, 
  shadows, 
  borderRadius 
} from '../tokens';

/**
 * Get color value from theme
 */
export function getColor(
  theme: ColorTheme,
  path: string
): string {
  const themeColors = colorThemes[theme];
  const pathArray = path.split('.');
  
  let current: any = themeColors;
  for (const key of pathArray) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      console.warn(`Color path "${path}" not found in theme "${theme}"`);
      return '#000000'; // fallback color
    }
  }
  
  return typeof current === 'string' ? current : '#000000';
}

/**
 * Generate CSS custom properties from design tokens
 */
export function generateCSSCustomProperties(theme: ColorTheme = 'light'): string {
  const themeData = colorThemes[theme];
  const cssVars: string[] = [];
  
  // Helper function to flatten nested objects
  function flattenObject(obj: any, prefix: string = ''): void {
    for (const [key, value] of Object.entries(obj)) {
      const cssKey = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        flattenObject(value, cssKey);
      } else if (typeof value === 'string') {
        cssVars.push(`  --designers-${cssKey}: ${value};`);
      }
    }
  }
  
  // Generate color variables
  flattenObject(themeData.colors, 'color');
  flattenObject(themeData.semantic, 'semantic');
  
  // Generate spacing variables
  Object.entries(spacing).forEach(([key, value]) => {
    cssVars.push(`  --designers-spacing-${key}: ${value};`);
  });
  
  // Generate shadow variables
  Object.entries(shadows).forEach(([key, value]) => {
    cssVars.push(`  --designers-shadow-${key}: ${value};`);
  });
  
  // Generate border radius variables
  Object.entries(borderRadius).forEach(([key, value]) => {
    cssVars.push(`  --designers-radius-${key}: ${value};`);
  });
  
  return `:root {\n${cssVars.join('\n')}\n}`;
}

/**
 * Resolve responsive values based on current breakpoint
 */
export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T>,
  currentBreakpoint: BreakpointKey
): T {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const responsiveObj = value as Partial<Record<BreakpointKey, T>>;
    
    // Get breakpoint order
    const breakpointOrder: BreakpointKey[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
    
    // Find the closest defined value at or below current breakpoint
    for (let i = currentIndex; i >= 0; i--) {
      const bp = breakpointOrder[i];
      if (responsiveObj[bp] !== undefined) {
        return responsiveObj[bp] as T;
      }
    }
    
    // If no value found, try to find any defined value
    for (const bp of breakpointOrder) {
      if (responsiveObj[bp] !== undefined) {
        return responsiveObj[bp] as T;
      }
    }
  }
  
  return value as T;
}

/**
 * Get current breakpoint based on window width
 */
export function getCurrentBreakpoint(width: number): BreakpointKey {
  if (width >= 1536) return '2xl';
  if (width >= 1280) return 'xl';
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 640) return 'sm';
  return 'xs';
}

/**
 * Convert spacing key to CSS value
 */
export function getSpacingValue(key: SpacingKey): string {
  return spacing[key];
}

/**
 * Convert multiple spacing keys to CSS shorthand
 */
export function getSpacingShorthand(
  top: SpacingKey,
  right?: SpacingKey,
  bottom?: SpacingKey,
  left?: SpacingKey
): string {
  const values = [spacing[top]];
  
  if (right !== undefined) values.push(spacing[right]);
  if (bottom !== undefined) values.push(spacing[bottom]);
  if (left !== undefined) values.push(spacing[left]);
  
  return values.join(' ');
}

/**
 * Generate media query string
 */
export function createMediaQuery(breakpoint: BreakpointKey): string {
  return `@media (min-width: ${breakpoints[breakpoint].min})`;
}

/**
 * Create CSS-in-JS styles with design tokens
 */
export function createStyles(theme: ColorTheme = 'light') {
  const themeData = colorThemes[theme];
  
  return {
    // Color utilities
    color: (path: string) => getColor(theme, path),
    
    // Spacing utilities
    spacing: (key: SpacingKey) => spacing[key],
    spacingShorthand: getSpacingShorthand,
    
    // Shadow utilities
    shadow: (key: ShadowKey) => shadows[key],
    
    // Border radius utilities
    radius: (key: BorderRadiusKey) => borderRadius[key],
    
    // Media query utilities
    mediaQuery: createMediaQuery,
    
    // Theme data
    theme: themeData,
  };
}

/**
 * Validate design token structure
 */
export function validateTokens(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate color themes
  for (const [themeName, theme] of Object.entries(colorThemes)) {
    if (!theme.colors || !theme.semantic) {
      errors.push(`Theme "${themeName}" is missing required color structure`);
    }
  }
  
  // Validate spacing scale
  if (!spacing || typeof spacing !== 'object') {
    errors.push('Spacing scale is invalid');
  }
  
  // Validate breakpoints
  if (!breakpoints || typeof breakpoints !== 'object') {
    errors.push('Breakpoints are invalid');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Deep merge utility for extending themes
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target };

  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {} as any, source[key] as any);
    } else {
      result[key] = source[key] as any;
    }
  }

  return result;
}

/**
 * Convert hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return { h: h * 360, s: s * 100, l: l * 100 };
}
