/**
 * Integration Provider - Main provider for UI library integrations
 */

import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useDesignTokens } from 'designers-react';
import type { UILibraryConfig, ComponentDefinition } from '../types';
import { UIRegistry } from './ui-registry';
import { ComponentFactory } from './component-factory';

export interface IntegrationContextValue {
  library: string | null;
  config: UILibraryConfig | null;
  registry: UIRegistry;
  factory: ComponentFactory;
  components: Record<string, React.ComponentType<any>>;
}

const IntegrationContext = createContext<IntegrationContextValue | null>(null);

export interface IntegrationProviderProps {
  children: ReactNode;
  library?: string;
  config?: UILibraryConfig;
  components?: Record<string, ComponentDefinition>;
}

export function IntegrationProvider({
  children,
  library = null,
  config = null,
  components = {},
}: IntegrationProviderProps) {
  const designTokens = useDesignTokens();
  
  const contextValue = useMemo(() => {
    const registry = new UIRegistry();
    const factory = new ComponentFactory(designTokens, registry);
    
    // Register components from config
    Object.entries(components).forEach(([name, definition]) => {
      registry.register(name, definition);
    });
    
    // Generate component instances
    const componentInstances = factory.createComponents(library || 'default');
    
    return {
      library,
      config,
      registry,
      factory,
      components: componentInstances,
    };
  }, [library, config, components, designTokens]);
  
  return (
    <IntegrationContext.Provider value={contextValue}>
      {children}
    </IntegrationContext.Provider>
  );
}

export function useIntegration(): IntegrationContextValue {
  const context = useContext(IntegrationContext);
  
  if (!context) {
    throw new Error('useIntegration must be used within an IntegrationProvider');
  }
  
  return context;
}

/**
 * Hook to get a specific UI component
 */
export function useUIComponent<T = any>(name: string): React.ComponentType<T> | null {
  const { components } = useIntegration();
  return components[name] || null;
}

/**
 * Hook to get all available UI components
 */
export function useUIComponents(): Record<string, React.ComponentType<any>> {
  const { components } = useIntegration();
  return components;
}

/**
 * Higher-order component to inject UI components as props
 */
export function withUIComponents<P extends object>(
  Component: React.ComponentType<P & { ui: Record<string, React.ComponentType<any>> }>
) {
  return function WithUIComponentsWrapper(props: P) {
    const ui = useUIComponents();
    return <Component {...props} ui={ui} />;
  };
}

/**
 * Hook to create a component with design system theming
 */
export function useThemedComponent<T extends Record<string, any>>(
  baseComponent: React.ComponentType<T>,
  themeMapping?: Record<string, string>
): React.ComponentType<T> {
  const designTokens = useDesignTokens();
  
  return useMemo(() => {
    return function ThemedComponent(props: T) {
      const themedProps = { ...props };
      
      // Apply theme mapping if provided
      if (themeMapping) {
        Object.entries(themeMapping).forEach(([propKey, tokenPath]) => {
          if (tokenPath.startsWith('colors.')) {
            const colorValue = designTokens.getColor(tokenPath.replace('colors.', ''));
            themedProps[propKey as keyof T] = colorValue as T[keyof T];
          } else if (tokenPath.startsWith('spacing.')) {
            const spacingKey = tokenPath.replace('spacing.', '') as any;
            themedProps[propKey as keyof T] = designTokens.getSpacing(spacingKey) as T[keyof T];
          }
          // Add more token type mappings as needed
        });
      }
      
      return React.createElement(baseComponent, themedProps);
    };
  }, [baseComponent, themeMapping, designTokens]);
}
