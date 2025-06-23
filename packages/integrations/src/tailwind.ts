/**
 * 🎨 Tailwind CSS Integration
 * 
 * Automatically sync your design tokens with Tailwind CSS.
 * No manual configuration needed!
 */

import { ds } from 'designers';

/**
 * Generate Tailwind CSS configuration from design tokens
 * 
 * @example
 * ```js
 * // tailwind.config.js
 * const { tailwindConfig } = require('designers/integrations');
 * 
 * module.exports = {
 *   content: ['./src/**/*.{js,ts,jsx,tsx}'],
 *   theme: {
 *     extend: tailwindConfig.theme.extend
 *   }
 * };
 * ```
 */
export const tailwindConfig = {
  theme: {
    extend: {
      // Colors from design system
      colors: {
        // Map design system colors to Tailwind format
        ...Object.fromEntries(
          Object.entries(ds.colors).map(([name, value]) => [
            name,
            typeof value === 'string' ? value : value
          ])
        ),
      },
      
      // Spacing from design system
      spacing: ds.spacing,
      
      // Typography
      fontFamily: ds.typography.font,
      fontSize: ds.typography.text,
      fontWeight: ds.typography.weight,
      lineHeight: ds.typography.leading,
      
      // Effects
      boxShadow: ds.shadows,
      borderRadius: ds.radius,
      transitionProperty: ds.transitions,
      
      // Breakpoints
      screens: ds.breakpoints,
    }
  }
};

/**
 * Tailwind CSS plugin for design system integration
 * 
 * @example
 * ```js
 * // tailwind.config.js
 * const { designersPlugin } = require('designers/integrations');
 * 
 * module.exports = {
 *   plugins: [designersPlugin]
 * };
 * ```
 */
export function designersPlugin({ addUtilities, addComponents, theme }: any) {
  // Add design system utilities
  addUtilities({
    // Stack utilities
    '.stack > * + *': {
      marginTop: 'var(--stack-space, 1rem)',
    },
    '.stack-xs': { '--stack-space': theme('spacing.2') },
    '.stack-sm': { '--stack-space': theme('spacing.4') },
    '.stack-md': { '--stack-space': theme('spacing.6') },
    '.stack-lg': { '--stack-space': theme('spacing.8') },
    '.stack-xl': { '--stack-space': theme('spacing.12') },
    
    // Cluster utilities
    '.cluster': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--cluster-space, 1rem)',
    },
    '.cluster-xs': { '--cluster-space': theme('spacing.2') },
    '.cluster-sm': { '--cluster-space': theme('spacing.4') },
    '.cluster-md': { '--cluster-space': theme('spacing.6') },
    '.cluster-lg': { '--cluster-space': theme('spacing.8') },
    '.cluster-xl': { '--cluster-space': theme('spacing.12') },
    
    // Focus utilities
    '.focus-ring': {
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${theme('colors.blue.500')}40`,
      }
    },
    
    // Gradient text utilities
    '.gradient-text': {
      background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
    },
  });
  
  // Add design system components
  addComponents({
    '.btn': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme('spacing.2'),
      padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
      borderRadius: theme('borderRadius.md'),
      border: 'none',
      fontWeight: theme('fontWeight.medium'),
      fontSize: theme('fontSize.sm'),
      lineHeight: theme('lineHeight.none'),
      cursor: 'pointer',
      transition: 'all 0.2s',
      userSelect: 'none',
      
      '&:disabled': {
        opacity: '0.6',
        cursor: 'not-allowed',
      },
      
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${theme('colors.blue.500')}40`,
      },
    },
    
    '.btn-primary': {
      backgroundColor: theme('colors.blue.600'),
      color: theme('colors.white'),
      
      '&:hover:not(:disabled)': {
        backgroundColor: theme('colors.blue.700'),
      },
      
      '&:active:not(:disabled)': {
        backgroundColor: theme('colors.blue.800'),
      },
    },
    
    '.btn-secondary': {
      backgroundColor: theme('colors.gray.100'),
      color: theme('colors.gray.900'),
      
      '&:hover:not(:disabled)': {
        backgroundColor: theme('colors.gray.200'),
      },
      
      '&:active:not(:disabled)': {
        backgroundColor: theme('colors.gray.300'),
      },
    },
    
    '.btn-outline': {
      backgroundColor: 'transparent',
      color: theme('colors.blue.600'),
      border: `1px solid ${theme('colors.blue.600')}`,
      
      '&:hover:not(:disabled)': {
        backgroundColor: theme('colors.blue.50'),
      },
      
      '&:active:not(:disabled)': {
        backgroundColor: theme('colors.blue.100'),
      },
    },
    
    '.card': {
      backgroundColor: theme('colors.white'),
      borderRadius: theme('borderRadius.lg'),
      boxShadow: theme('boxShadow.md'),
      border: `1px solid ${theme('colors.gray.200')}`,
      padding: theme('spacing.6'),
    },
    
    '.input': {
      display: 'block',
      width: '100%',
      padding: `${theme('spacing.2')} ${theme('spacing.3')}`,
      border: `1px solid ${theme('colors.gray.300')}`,
      borderRadius: theme('borderRadius.md'),
      fontSize: theme('fontSize.sm'),
      lineHeight: theme('lineHeight.normal'),
      transition: 'all 0.2s',
      
      '&:focus': {
        outline: 'none',
        borderColor: theme('colors.blue.500'),
        boxShadow: `0 0 0 3px ${theme('colors.blue.500')}20`,
      },
      
      '&:disabled': {
        backgroundColor: theme('colors.gray.50'),
        color: theme('colors.gray.500'),
        cursor: 'not-allowed',
      },
      
      '&::placeholder': {
        color: theme('colors.gray.400'),
      },
    },
  });
}

/**
 * Generate CSS custom properties for design tokens
 */
export function generateCSSVariables(prefix = 'ds'): string {
  const cssVars: string[] = [];
  
  // Colors
  Object.entries(ds.colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'string') {
      cssVars.push(`  --${prefix}-color-${colorName}: ${colorValue};`);
    } else {
      Object.entries(colorValue).forEach(([shade, value]) => {
        cssVars.push(`  --${prefix}-color-${colorName}-${shade}: ${value};`);
      });
    }
  });
  
  // Spacing
  Object.entries(ds.spacing).forEach(([key, value]) => {
    cssVars.push(`  --${prefix}-spacing-${key}: ${value};`);
  });
  
  // Typography
  Object.entries(ds.typography.text).forEach(([key, value]) => {
    cssVars.push(`  --${prefix}-text-${key}: ${value};`);
  });
  
  // Effects
  Object.entries(ds.shadows).forEach(([key, value]) => {
    cssVars.push(`  --${prefix}-shadow-${key}: ${value};`);
  });
  
  Object.entries(ds.radius).forEach(([key, value]) => {
    cssVars.push(`  --${prefix}-radius-${key}: ${value};`);
  });
  
  return `:root {\n${cssVars.join('\n')}\n}`;
}

/**
 * Watch for design token changes and regenerate Tailwind config
 */
export function watchDesignTokens(callback: () => void) {
  // In a real implementation, this would watch the designers.config.json file
  // and call the callback when it changes
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Development mode: watch for changes
    const interval = setInterval(() => {
      // Check if design tokens have changed
      // This is a simplified implementation
      callback();
    }, 1000);
    
    return () => clearInterval(interval);
  }
  
  return () => {};
}
