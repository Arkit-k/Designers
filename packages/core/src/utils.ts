/**
 * 🛠️ Utilities that developers actually use
 * 
 * These functions solve real problems and save time.
 */

import { colors } from './tokens/colors';
import { spacing } from './tokens/spacing';
import { typography } from './tokens/typography';
import { breakpoints } from './tokens/breakpoints';
import type { Theme, ThemeConfig, ResponsiveValue } from './types';

/**
 * Create a custom theme by extending the default theme
 * 
 * @example
 * ```ts
 * const myTheme = createTheme({
 *   colors: {
 *     primary: {
 *       500: '#ff6b6b'
 *     }
 *   }
 * });
 * ```
 */
export function createTheme(config: ThemeConfig): Theme {
  return {
    name: 'custom',
    mode: 'light',
    colors: { ...colors, ...config.colors },
    spacing: { ...spacing, ...config.spacing },
    typography: { ...typography, ...config.typography },
    breakpoints: { ...breakpoints, ...config.breakpoints },
    shadows: {},
    radius: {},
    transitions: {},
    space: spacing,
    text: typography.text,
    font: typography.font,
    responsive: () => ({}),
    alpha: () => '',
    stack: () => ({}),
    cluster: () => ({})
  } as Theme;
}

/**
 * Extend an existing theme
 */
export function extendTheme(baseTheme: Theme, config: ThemeConfig): Theme {
  return {
    ...baseTheme,
    colors: { ...baseTheme.colors, ...config.colors },
    spacing: { ...baseTheme.spacing, ...config.spacing },
    typography: { ...baseTheme.typography, ...config.typography },
    breakpoints: { ...baseTheme.breakpoints, ...config.breakpoints },
  };
}

/**
 * Generate CSS custom properties from design tokens
 * 
 * @example
 * ```ts
 * const css = generateCSS();
 * // Returns CSS with --ds-color-blue-500: #3b82f6; etc.
 * ```
 */
export function generateCSS(prefix = 'ds'): string {
  const cssVars: string[] = [];
  
  // Generate color variables
  Object.entries(colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'string') {
      cssVars.push(`  --${prefix}-color-${colorName}: ${colorValue};`);
    } else {
      Object.entries(colorValue).forEach(([shade, value]) => {
        cssVars.push(`  --${prefix}-color-${colorName}-${shade}: ${value};`);
      });
    }
  });
  
  // Generate spacing variables
  Object.entries(spacing).forEach(([key, value]) => {
    cssVars.push(`  --${prefix}-spacing-${key}: ${value};`);
  });
  
  return `:root {\n${cssVars.join('\n')}\n}`;
}

/**
 * Generate Tailwind CSS configuration
 * 
 * @example
 * ```ts
 * const tailwindConfig = generateTailwindConfig();
 * // Use in your tailwind.config.js
 * ```
 */
export function generateTailwindConfig() {
  return {
    theme: {
      extend: {
        colors: Object.fromEntries(
          Object.entries(colors).map(([name, value]) => [
            name,
            typeof value === 'string' ? value : value
          ])
        ),
        spacing,
        fontFamily: typography.font,
        fontSize: typography.text,
        screens: breakpoints,
      }
    }
  };
}

/**
 * Create responsive values that work across breakpoints
 * 
 * @example
 * ```ts
 * const padding = responsiveValue({
 *   sm: '1rem',
 *   md: '2rem',
 *   lg: '3rem'
 * });
 * ```
 */
export function responsiveValue<T>(values: ResponsiveValue<T>): Record<string, T> {
  if (typeof values !== 'object' || values === null) {
    return { default: values as T };
  }
  
  const result: Record<string, T> = {};
  
  Object.entries(values).forEach(([breakpoint, value]) => {
    if (breakpoint in breakpoints) {
      result[`@media (min-width: ${breakpoints[breakpoint as keyof typeof breakpoints]})`] = value as T;
    } else {
      result[breakpoint] = value as T;
    }
  });
  
  return result;
}

/**
 * Mix two colors together
 * 
 * @example
 * ```ts
 * const mixedColor = colorMix('#ff0000', '#0000ff', 0.5);
 * // Returns a purple color
 * ```
 */
export function colorMix(color1: string, color2: string, ratio: number = 0.5): string {
  // Simple color mixing for hex colors
  if (color1.startsWith('#') && color2.startsWith('#')) {
    const hex1 = color1.slice(1);
    const hex2 = color2.slice(1);
    
    const r1 = parseInt(hex1.slice(0, 2), 16);
    const g1 = parseInt(hex1.slice(2, 4), 16);
    const b1 = parseInt(hex1.slice(4, 6), 16);
    
    const r2 = parseInt(hex2.slice(0, 2), 16);
    const g2 = parseInt(hex2.slice(2, 4), 16);
    const b2 = parseInt(hex2.slice(4, 6), 16);
    
    const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  return color1; // Fallback
}

/**
 * Generate a spacing scale based on a multiplier
 * 
 * @example
 * ```ts
 * const tightSpacing = spacingScale(0.75);
 * // Returns spacing values multiplied by 0.75
 * ```
 */
export function spacingScale(multiplier: number) {
  return Object.fromEntries(
    Object.entries(spacing).map(([key, value]) => {
      if (value === '0px' || value === '1px') return [key, value];
      
      const numValue = parseFloat(value);
      const unit = value.replace(numValue.toString(), '');
      
      return [key, `${numValue * multiplier}${unit}`];
    })
  );
}

/**
 * Get a color with alpha transparency
 * 
 * @example
 * ```ts
 * const semiTransparent = alpha(colors.blue[500], 0.5);
 * ```
 */
export function alpha(color: string, alphaValue: number): string {
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alphaValue})`;
  }
  
  // For other color formats, try to append alpha
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alphaValue})`);
  }
  
  return color;
}

/**
 * Create a CSS-in-JS object for stacked elements
 */
export function stack(gap: keyof typeof spacing) {
  return {
    '& > * + *': {
      marginTop: spacing[gap]
    }
  };
}

/**
 * Create a CSS-in-JS object for clustered elements
 */
export function cluster(gap: keyof typeof spacing) {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[gap]
  };
}
