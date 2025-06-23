/**
 * @designers/tailwind-plugin
 * Tailwind CSS plugin that automatically generates component classes from designers.config.json
 */

import plugin from 'tailwindcss/plugin';
import type { PluginAPI } from 'tailwindcss/types/config';

export interface DesignersPluginOptions {
  prefix?: string;
  components?: Record<string, any>;
  generateUtilities?: boolean;
  generateComponents?: boolean;
  configPath?: string;
}

const defaultOptions: DesignersPluginOptions = {
  prefix: 'designers',
  components: {},
  generateUtilities: true,
  generateComponents: true,
};

export default plugin.withOptions<DesignersPluginOptions>((options = {}) => {
  const opts = { ...defaultOptions, ...options };
  
  return ({ addComponents, addUtilities, theme, addBase }: PluginAPI) => {
    // Add CSS custom properties for semantic colors
    if (opts.generateUtilities) {
      addBase({
        ':root': generateCSSVariables(opts.prefix!),
        '[data-theme="dark"]': generateDarkModeCSSVariables(opts.prefix!),
      });
      
      // Add semantic utility classes
      addUtilities(generateSemanticUtilities(opts.prefix!));
    }
    
    // Add component classes
    if (opts.generateComponents && opts.components) {
      addComponents(generateComponentClasses(opts.components, opts.prefix!));
    }
  };
});

/**
 * Generate CSS custom properties for light theme
 */
function generateCSSVariables(prefix: string): Record<string, string> {
  return {
    // Semantic colors (light theme defaults)
    [`--${prefix}-semantic-text-primary`]: '#111827',
    [`--${prefix}-semantic-text-secondary`]: '#374151',
    [`--${prefix}-semantic-text-tertiary`]: '#6b7280',
    [`--${prefix}-semantic-text-inverse`]: '#ffffff',
    [`--${prefix}-semantic-text-disabled`]: '#9ca3af',
    
    [`--${prefix}-semantic-background-primary`]: '#ffffff',
    [`--${prefix}-semantic-background-secondary`]: '#f9fafb',
    [`--${prefix}-semantic-background-tertiary`]: '#f3f4f6',
    [`--${prefix}-semantic-background-inverse`]: '#111827',
    [`--${prefix}-semantic-background-overlay`]: 'rgba(0, 0, 0, 0.5)',
    
    [`--${prefix}-semantic-border-primary`]: '#e5e7eb',
    [`--${prefix}-semantic-border-secondary`]: '#d1d5db',
    [`--${prefix}-semantic-border-tertiary`]: '#9ca3af',
    [`--${prefix}-semantic-border-focus`]: '#3b82f6',
    [`--${prefix}-semantic-border-error`]: '#ef4444',
    [`--${prefix}-semantic-border-success`]: '#22c55e',
    
    [`--${prefix}-semantic-interactive-primary`]: '#2563eb',
    [`--${prefix}-semantic-interactive-primary-hover`]: '#1d4ed8',
    [`--${prefix}-semantic-interactive-primary-active`]: '#1e40af',
    [`--${prefix}-semantic-interactive-secondary`]: '#f3f4f6',
    [`--${prefix}-semantic-interactive-secondary-hover`]: '#e5e7eb',
    [`--${prefix}-semantic-interactive-secondary-active`]: '#d1d5db',
  };
}

/**
 * Generate CSS custom properties for dark theme
 */
function generateDarkModeCSSVariables(prefix: string): Record<string, string> {
  return {
    // Semantic colors (dark theme)
    [`--${prefix}-semantic-text-primary`]: '#f3f4f6',
    [`--${prefix}-semantic-text-secondary`]: '#d1d5db',
    [`--${prefix}-semantic-text-tertiary`]: '#6b7280',
    [`--${prefix}-semantic-text-inverse`]: '#111827',
    [`--${prefix}-semantic-text-disabled`]: '#4b5563',
    
    [`--${prefix}-semantic-background-primary`]: '#111827',
    [`--${prefix}-semantic-background-secondary`]: '#1f2937',
    [`--${prefix}-semantic-background-tertiary`]: '#374151',
    [`--${prefix}-semantic-background-inverse`]: '#ffffff',
    [`--${prefix}-semantic-background-overlay`]: 'rgba(0, 0, 0, 0.7)',
    
    [`--${prefix}-semantic-border-primary`]: '#374151',
    [`--${prefix}-semantic-border-secondary`]: '#4b5563',
    [`--${prefix}-semantic-border-tertiary`]: '#6b7280',
    [`--${prefix}-semantic-border-focus`]: '#60a5fa',
    [`--${prefix}-semantic-border-error`]: '#f87171',
    [`--${prefix}-semantic-border-success`]: '#4ade80',
    
    [`--${prefix}-semantic-interactive-primary`]: '#3b82f6',
    [`--${prefix}-semantic-interactive-primary-hover`]: '#60a5fa',
    [`--${prefix}-semantic-interactive-primary-active`]: '#93c5fd',
    [`--${prefix}-semantic-interactive-secondary`]: '#374151',
    [`--${prefix}-semantic-interactive-secondary-hover`]: '#4b5563',
    [`--${prefix}-semantic-interactive-secondary-active`]: '#6b7280',
  };
}

/**
 * Generate semantic utility classes
 */
function generateSemanticUtilities(prefix: string): Record<string, Record<string, string>> {
  return {
    // Text utilities
    '.text-semantic-primary': { color: `var(--${prefix}-semantic-text-primary)` },
    '.text-semantic-secondary': { color: `var(--${prefix}-semantic-text-secondary)` },
    '.text-semantic-tertiary': { color: `var(--${prefix}-semantic-text-tertiary)` },
    '.text-semantic-inverse': { color: `var(--${prefix}-semantic-text-inverse)` },
    '.text-semantic-disabled': { color: `var(--${prefix}-semantic-text-disabled)` },
    
    // Background utilities
    '.bg-semantic-primary': { backgroundColor: `var(--${prefix}-semantic-background-primary)` },
    '.bg-semantic-secondary': { backgroundColor: `var(--${prefix}-semantic-background-secondary)` },
    '.bg-semantic-tertiary': { backgroundColor: `var(--${prefix}-semantic-background-tertiary)` },
    '.bg-semantic-inverse': { backgroundColor: `var(--${prefix}-semantic-background-inverse)` },
    
    // Border utilities
    '.border-semantic-primary': { borderColor: `var(--${prefix}-semantic-border-primary)` },
    '.border-semantic-secondary': { borderColor: `var(--${prefix}-semantic-border-secondary)` },
    '.border-semantic-tertiary': { borderColor: `var(--${prefix}-semantic-border-tertiary)` },
    '.border-semantic-focus': { borderColor: `var(--${prefix}-semantic-border-focus)` },
    '.border-semantic-error': { borderColor: `var(--${prefix}-semantic-border-error)` },
    '.border-semantic-success': { borderColor: `var(--${prefix}-semantic-border-success)` },
    
    // Interactive utilities
    '.bg-interactive-primary': { backgroundColor: `var(--${prefix}-semantic-interactive-primary)` },
    '.bg-interactive-secondary': { backgroundColor: `var(--${prefix}-semantic-interactive-secondary)` },
    
    // Hover utilities
    '.hover\\:bg-interactive-primary-hover:hover': { 
      backgroundColor: `var(--${prefix}-semantic-interactive-primary-hover)` 
    },
    '.hover\\:bg-interactive-secondary-hover:hover': { 
      backgroundColor: `var(--${prefix}-semantic-interactive-secondary-hover)` 
    },
    
    // Focus utilities
    '.focus\\:border-semantic-focus:focus': { 
      borderColor: `var(--${prefix}-semantic-border-focus)`,
      outline: 'none',
      boxShadow: `0 0 0 3px var(--${prefix}-semantic-border-focus)25`,
    },
  };
}

/**
 * Generate component classes from designers.config.json
 */
function generateComponentClasses(components: Record<string, any>, prefix: string): Record<string, any> {
  const classes: Record<string, any> = {};
  
  Object.entries(components).forEach(([componentName, component]) => {
    // Base component class
    const baseClass = `.${componentName}`;
    classes[baseClass] = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '500',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      userSelect: 'none',
      '&:disabled': {
        opacity: '0.5',
        cursor: 'not-allowed',
      },
    };
    
    // Variant classes
    if (component.variants) {
      Object.entries(component.variants).forEach(([variantName, variant]) => {
        const className = `.${componentName}-${variantName}`;
        classes[className] = convertStylesToCSS(variant as Record<string, any>, prefix);
      });
    }
    
    // Size classes
    if (component.sizes) {
      Object.entries(component.sizes).forEach(([sizeName, size]) => {
        const className = `.${componentName}-${sizeName}`;
        classes[className] = convertStylesToCSS(size as Record<string, any>, prefix);
      });
    }
    
    // State classes
    if (component.states) {
      Object.entries(component.states).forEach(([stateName, state]) => {
        const className = `.${componentName}-${stateName}`;
        classes[className] = convertStylesToCSS(state as Record<string, any>, prefix);
      });
    }
  });
  
  return classes;
}

/**
 * Convert Designers styles to CSS with proper token resolution
 */
function convertStylesToCSS(styles: Record<string, any>, prefix: string): Record<string, any> {
  const css: Record<string, any> = {};
  
  Object.entries(styles).forEach(([property, value]) => {
    if (property === 'hover' && typeof value === 'object') {
      // Handle hover states
      const hoverStyles = convertStylesToCSS(value, prefix);
      Object.entries(hoverStyles).forEach(([hoverProp, hoverValue]) => {
        css[`&:hover`] = css[`&:hover`] || {};
        css[`&:hover`][hoverProp] = hoverValue;
      });
    } else if (property === 'focus' && typeof value === 'object') {
      // Handle focus states
      const focusStyles = convertStylesToCSS(value, prefix);
      Object.entries(focusStyles).forEach(([focusProp, focusValue]) => {
        css[`&:focus`] = css[`&:focus`] || {};
        css[`&:focus`][focusProp] = focusValue;
      });
    } else if (property === 'active' && typeof value === 'object') {
      // Handle active states
      const activeStyles = convertStylesToCSS(value, prefix);
      Object.entries(activeStyles).forEach(([activeProp, activeValue]) => {
        css[`&:active`] = css[`&:active`] || {};
        css[`&:active`][activeProp] = activeValue;
      });
    } else if (typeof value === 'string') {
      // Convert token references to CSS variables
      if (value.startsWith('semantic.')) {
        const tokenPath = value.replace(/\./g, '-');
        css[property] = `var(--${prefix}-${tokenPath})`;
      } else if (value.startsWith('spacing.')) {
        // Handle spacing tokens
        const spacingValue = value.replace('spacing.', '');
        css[property] = `var(--${prefix}-spacing-${spacingValue}, ${getSpacingFallback(spacingValue)})`;
      } else if (value.startsWith('typography.')) {
        // Handle typography tokens
        const typographyValue = value.replace('typography.', '').replace(/\./g, '-');
        css[property] = `var(--${prefix}-${typographyValue})`;
      } else if (value.startsWith('effects.')) {
        // Handle effects tokens
        const effectsValue = value.replace('effects.', '').replace(/\./g, '-');
        css[property] = `var(--${prefix}-${effectsValue})`;
      } else {
        // Regular CSS value
        css[property] = value;
      }
    }
  });
  
  return css;
}

/**
 * Get fallback values for spacing tokens
 */
function getSpacingFallback(spacingKey: string): string {
  const spacingMap: Record<string, string> = {
    '0': '0px',
    'px': '1px',
    '0.5': '0.125rem',
    '1': '0.25rem',
    '1.5': '0.375rem',
    '2': '0.5rem',
    '2.5': '0.625rem',
    '3': '0.75rem',
    '3.5': '0.875rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '7': '1.75rem',
    '8': '2rem',
  };
  
  return spacingMap[spacingKey] || '1rem';
}
