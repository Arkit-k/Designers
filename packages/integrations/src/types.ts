/**
 * Types for UI library integrations
 */

import type { ComponentType, ReactNode } from 'react';
import type { DesignTokens } from '@designers/react';

export interface ComponentProps {
  variant?: string;
  size?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  [key: string]: any;
}

export interface ComponentDefinition {
  component: ComponentType<any>;
  library: string;
  category?: string;
  variants: Record<string, any>;
  sizes?: Record<string, any>;
  states?: Record<string, any>;
  tags?: string[];
  description?: string;
  examples?: ComponentExample[];
}

export interface ComponentExample {
  name: string;
  description?: string;
  code: string;
  props?: Record<string, any>;
}

export interface UILibraryConfig {
  name: string;
  version?: string;
  theme?: Record<string, any>;
  components?: Record<string, ComponentDefinition>;
  customizations?: Record<string, any>;
}

export interface UILibraryAdapter {
  name: string;
  transformProps?: (props: any, definition: ComponentDefinition) => any;
  generateTheme?: (designTokens: DesignTokens) => Record<string, any>;
  setupProvider?: (config: UILibraryConfig) => ComponentType<{ children: ReactNode }>;
  customHooks?: Record<string, () => any>;
}

export interface IntegrationOptions {
  library: string;
  components?: string[];
  theme?: 'auto' | 'custom';
  customizations?: Record<string, any>;
  prefix?: string;
}

export interface ThemeAdapter {
  name: string;
  convert: (designTokens: DesignTokens) => any;
  validate?: (theme: any) => boolean;
}

export interface ComponentImportConfig {
  source: string; // 'shadcn', 'mui', 'chakra', etc.
  components: ComponentImportItem[];
  theme?: 'inherit' | 'custom';
  customizations?: Record<string, any>;
}

export interface ComponentImportItem {
  name: string;
  as?: string; // Rename component
  variants?: string[];
  sizes?: string[];
  customProps?: Record<string, any>;
}

export interface UILibraryMetadata {
  name: string;
  displayName: string;
  description: string;
  version: string;
  homepage?: string;
  documentation?: string;
  installation: {
    npm: string[];
    dependencies?: string[];
  };
  features: string[];
  categories: string[];
}

// Specific library types
export interface ShadcnConfig extends UILibraryConfig {
  name: 'shadcn';
  tailwind?: boolean;
  cssVariables?: boolean;
}

export interface MUIConfig extends UILibraryConfig {
  name: 'mui';
  theme?: {
    palette?: any;
    typography?: any;
    spacing?: any;
    breakpoints?: any;
  };
}

export interface ChakraConfig extends UILibraryConfig {
  name: 'chakra';
  theme?: {
    colors?: any;
    fonts?: any;
    fontSizes?: any;
    space?: any;
  };
}

export interface MantineConfig extends UILibraryConfig {
  name: 'mantine';
  theme?: {
    colorScheme?: 'light' | 'dark';
    colors?: any;
    fontFamily?: string;
    spacing?: any;
  };
}
