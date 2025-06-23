/**
 * Component Factory - Creates themed UI components from definitions
 */

import React, { useMemo } from 'react';
import type { DesignTokens } from '@designers/react';
import type { ComponentDefinition, ComponentProps } from '../types';
import { UIRegistry } from './ui-registry';

export class ComponentFactory {
  constructor(
    private designTokens: DesignTokens,
    private registry: UIRegistry
  ) {}
  
  /**
   * Create a single component from its definition
   */
  createComponent<T extends ComponentProps>(
    name: string,
    library: string = 'default'
  ): React.ComponentType<T> | null {
    const definition = this.registry.get(name);
    
    if (!definition) {
      console.warn(`Component "${name}" not found in registry`);
      return null;
    }
    
    const adapter = this.registry.getAdapter(library);
    
    return this.buildComponent<T>(definition, adapter);
  }
  
  /**
   * Create all registered components for a specific library
   */
  createComponents(library: string = 'default'): Record<string, React.ComponentType<any>> {
    const components: Record<string, React.ComponentType<any>> = {};
    const adapter = this.registry.getAdapter(library);
    
    this.registry.getAll().forEach((definition, name) => {
      const component = this.buildComponent(definition, adapter);
      if (component) {
        components[name] = component;
      }
    });
    
    return components;
  }
  
  /**
   * Build a component from its definition
   */
  private buildComponent<T extends ComponentProps>(
    definition: ComponentDefinition,
    adapter?: any
  ): React.ComponentType<T> | null {
    const BaseComponent = definition.component;
    
    if (!BaseComponent) {
      return null;
    }
    
    return function DesignersComponent(props: T) {
      const {
        variant = 'default',
        size = 'md',
        className = '',
        style = {},
        ...restProps
      } = props;
      
      // Resolve variant styles
      const variantStyles = definition.variants[variant] || definition.variants.default || {};
      const sizeStyles = definition.sizes?.[size] || {};
      
      // Convert design token references to actual values
      const resolvedVariantStyles = this.resolveTokenReferences(variantStyles);
      const resolvedSizeStyles = this.resolveTokenReferences(sizeStyles);
      
      // Merge styles
      const mergedStyles = {
        ...resolvedVariantStyles,
        ...resolvedSizeStyles,
        ...style,
      };
      
      // Apply adapter transformations if available
      let finalProps = {
        ...restProps,
        style: mergedStyles,
        className,
      };
      
      if (adapter && adapter.transformProps) {
        finalProps = adapter.transformProps(finalProps, definition);
      }
      
      return React.createElement(BaseComponent, finalProps);
    };
  }
  
  /**
   * Resolve design token references in styles
   */
  private resolveTokenReferences(styles: Record<string, any>): Record<string, any> {
    const resolved: Record<string, any> = {};
    
    Object.entries(styles).forEach(([property, value]) => {
      if (typeof value === 'string' && value.includes('.')) {
        // This looks like a token reference
        resolved[property] = this.resolveTokenValue(value);
      } else if (typeof value === 'object' && value !== null) {
        // Nested object (e.g., hover states)
        resolved[property] = this.resolveTokenReferences(value);
      } else {
        resolved[property] = value;
      }
    });
    
    return resolved;
  }
  
  /**
   * Resolve a single token value
   */
  private resolveTokenValue(tokenPath: string): string {
    try {
      if (tokenPath.startsWith('semantic.')) {
        return this.designTokens.getColor(tokenPath);
      } else if (tokenPath.startsWith('colors.')) {
        return this.designTokens.getColor(tokenPath.replace('colors.', ''));
      } else if (tokenPath.startsWith('spacing.')) {
        const spacingKey = tokenPath.replace('spacing.', '') as any;
        return this.designTokens.getSpacing(spacingKey);
      } else if (tokenPath.startsWith('typography.')) {
        const typographyPath = tokenPath.replace('typography.', '');
        const [category, property] = typographyPath.split('.');
        
        if (category === 'fontSize') {
          return this.designTokens.typography.fontSize[property as keyof typeof this.designTokens.typography.fontSize];
        } else if (category === 'fontWeight') {
          return this.designTokens.typography.fontWeight[property as keyof typeof this.designTokens.typography.fontWeight]?.toString();
        }
        // Add more typography mappings as needed
      } else if (tokenPath.startsWith('effects.')) {
        const effectsPath = tokenPath.replace('effects.', '');
        const [category, property] = effectsPath.split('.');
        
        if (category === 'shadows') {
          return this.designTokens.getShadow(property as any);
        } else if (category === 'borderRadius') {
          return this.designTokens.getBorderRadius(property as any);
        }
        // Add more effects mappings as needed
      }
      
      // If we can't resolve it, return the original value
      return tokenPath;
    } catch (error) {
      console.warn(`Failed to resolve token "${tokenPath}":`, error);
      return tokenPath;
    }
  }
  
  /**
   * Create a component with custom theme mapping
   */
  createThemedComponent<T extends ComponentProps>(
    baseComponent: React.ComponentType<any>,
    themeMapping: Record<string, string>,
    defaultProps?: Partial<T>
  ): React.ComponentType<T> {
    return function ThemedComponent(props: T) {
      const mergedProps = { ...defaultProps, ...props };
      const themedProps = { ...mergedProps };
      
      // Apply theme mapping
      Object.entries(themeMapping).forEach(([propKey, tokenPath]) => {
        const resolvedValue = this.resolveTokenValue(tokenPath);
        if (resolvedValue !== tokenPath) {
          (themedProps as any)[propKey] = resolvedValue;
        }
      });
      
      return React.createElement(baseComponent, themedProps);
    };
  }
  
  /**
   * Update design tokens (useful for theme switching)
   */
  updateDesignTokens(newTokens: DesignTokens): void {
    this.designTokens = newTokens;
  }
}
