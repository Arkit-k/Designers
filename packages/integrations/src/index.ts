/**
 * @designers/integrations - UI library integrations
 * 
 * Provides seamless integration with popular UI libraries:
 * - shadcn/ui components with Designers theming
 * - Material-UI with automatic theme generation
 * - Chakra UI with design token mapping
 * - Mantine with custom theme provider
 */

export * from './core/integration-provider';
export * from './core/ui-registry';
export * from './core/component-factory';

// UI Library integrations
export * from './shadcn';
export * from './mui';
export * from './chakra';
export * from './mantine';

// Export all component collections
export { shadcnComponents, shadcnAdapter } from './shadcn';
export { muiComponents, muiAdapter } from './mui';
export { chakraComponents, chakraAdapter } from './chakra';
export { mantineComponents, mantineAdapter } from './mantine';

// Utility exports
export * from './utils/theme-adapters';
export * from './utils/component-mapper';

// Types
export type {
  UILibraryConfig,
  ComponentDefinition,
  IntegrationOptions,
  ThemeAdapter,
} from './types';

// Version
export const version = '0.1.0';
