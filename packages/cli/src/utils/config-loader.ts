/**
 * Configuration loader for designers.config.json
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export interface DesignersConfig {
  $schema?: string;
  version: string;
  name?: string;
  description?: string;
  
  theme: {
    default: 'light' | 'dark';
    autoDetect: boolean;
    storage: boolean;
    themes: {
      [themeName: string]: {
        colors: Record<string, any>;
        semantic: Record<string, any>;
      };
    };
  };
  
  typography: {
    fontFamily: Record<string, string[]>;
    fontWeight?: Record<string, number>;
    fontSize: Record<string, string>;
    lineHeight?: Record<string, number>;
    letterSpacing?: Record<string, string>;
    scales?: Record<string, any>;
  };
  
  spacing: {
    scale: Record<string, string>;
    semantic?: Record<string, any>;
  };
  
  effects: {
    shadows: Record<string, string>;
    borderRadius: Record<string, string>;
    gradients?: Record<string, string>;
    blur?: Record<string, string>;
    opacity?: Record<string, string>;
  };
  
  responsive: {
    autoDetect: boolean;
    breakpoints: Record<string, any>;
    containerSizes?: Record<string, string>;
  };
  
  tokens: {
    prefix: string;
    output: string;
    formats: string[];
    include?: string[];
    exclude?: string[];
    cssVariables?: {
      generateFor: string[];
      selector: string;
      mediaQueries?: Record<string, string>;
    };
  };
  
  components: {
    output: string;
    typescript: boolean;
    styling?: string;
    library?: Record<string, any>;
  };
  
  animations?: {
    enabled: boolean;
    respectReducedMotion: boolean;
    library?: string;
    presets?: Record<string, any>;
  };
  
  integrations?: {
    uiLibrary?: string | null;
    styling?: string;
    bundler?: string;
    framework?: string;
    storybook?: any;
    tailwind?: any;
  };
  
  build?: {
    watch?: string[];
    output?: Record<string, string>;
    optimization?: any;
  };
  
  development?: {
    hotReload?: boolean;
    devtools?: boolean;
    playground?: any;
  };
  
  accessibility?: {
    enforceContrast?: boolean;
    minimumContrastRatio?: number;
    focusVisible?: boolean;
    reducedMotion?: string;
  };
  
  performance?: {
    lazyLoading?: boolean;
    bundleSize?: any;
    caching?: any;
  };
}

/**
 * Load designers.config.json from the current working directory
 */
export async function loadConfig(configPath?: string): Promise<DesignersConfig | null> {
  const configFile = configPath || path.join(process.cwd(), 'designers.config.json');
  
  if (!fs.existsSync(configFile)) {
    return null;
  }
  
  try {
    const config = await fs.readJson(configFile);
    return validateConfig(config);
  } catch (error: any) {
    throw new Error(`Failed to load config: ${error.message}`);
  }
}

/**
 * Save designers.config.json to the current working directory
 */
export async function saveConfig(config: DesignersConfig, configPath?: string): Promise<void> {
  const configFile = configPath || path.join(process.cwd(), 'designers.config.json');
  
  try {
    await fs.writeJson(configFile, config, { spaces: 2 });
  } catch (error: any) {
    throw new Error(`Failed to save config: ${error.message}`);
  }
}

/**
 * Validate configuration structure
 */
function validateConfig(config: any): DesignersConfig {
  const errors: string[] = [];
  
  // Required fields
  if (!config.version) errors.push('version is required');
  if (!config.theme) errors.push('theme configuration is required');
  if (!config.tokens) errors.push('tokens configuration is required');
  if (!config.components) errors.push('components configuration is required');
  
  // Theme validation
  if (config.theme) {
    if (!config.theme.themes || typeof config.theme.themes !== 'object') {
      errors.push('theme.themes must be an object');
    }
    if (!['light', 'dark'].includes(config.theme.default)) {
      errors.push('theme.default must be "light" or "dark"');
    }
  }
  
  // Tokens validation
  if (config.tokens) {
    if (!config.tokens.prefix) errors.push('tokens.prefix is required');
    if (!config.tokens.output) errors.push('tokens.output is required');
    if (!Array.isArray(config.tokens.formats)) errors.push('tokens.formats must be an array');
  }
  
  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.map(e => `  - ${e}`).join('\n')}`);
  }
  
  return config as DesignersConfig;
}

/**
 * Get design tokens from config
 */
export function getTokensFromConfig(config: DesignersConfig) {
  return {
    colors: config.theme.themes,
    typography: config.typography,
    spacing: config.spacing,
    effects: config.effects,
    responsive: config.responsive,
  };
}

/**
 * Get component definitions from config
 */
export function getComponentsFromConfig(config: DesignersConfig) {
  return config.components.library || {};
}

/**
 * Resolve token reference (e.g., "semantic.text.primary" -> actual value)
 */
export function resolveTokenReference(
  reference: string, 
  config: DesignersConfig, 
  theme: string = 'light'
): string {
  const parts = reference.split('.');
  const themeData = config.theme.themes[theme];
  
  if (!themeData) {
    throw new Error(`Theme "${theme}" not found`);
  }
  
  let current: any = themeData;
  
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      // Try other token categories
      if (parts[0] === 'spacing') {
        current = config.spacing.scale;
        for (let i = 1; i < parts.length; i++) {
          if (current && typeof current === 'object' && parts[i] in current) {
            current = current[parts[i]];
          } else {
            throw new Error(`Token reference "${reference}" not found`);
          }
        }
        break;
      } else if (parts[0] === 'typography') {
        current = config.typography;
        for (let i = 1; i < parts.length; i++) {
          if (current && typeof current === 'object' && parts[i] in current) {
            current = current[parts[i]];
          } else {
            throw new Error(`Token reference "${reference}" not found`);
          }
        }
        break;
      } else if (parts[0] === 'effects') {
        current = config.effects;
        for (let i = 1; i < parts.length; i++) {
          if (current && typeof current === 'object' && parts[i] in current) {
            current = current[parts[i]];
          } else {
            throw new Error(`Token reference "${reference}" not found`);
          }
        }
        break;
      } else {
        throw new Error(`Token reference "${reference}" not found`);
      }
    }
  }
  
  if (typeof current !== 'string') {
    throw new Error(`Token reference "${reference}" does not resolve to a string value`);
  }
  
  return current;
}

/**
 * Check if config file exists
 */
export function configExists(configPath?: string): boolean {
  const configFile = configPath || path.join(process.cwd(), 'designers.config.json');
  return fs.existsSync(configFile);
}

/**
 * Get config file path
 */
export function getConfigPath(configPath?: string): string {
  return configPath || path.join(process.cwd(), 'designers.config.json');
}
