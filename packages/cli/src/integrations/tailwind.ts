/**
 * Tailwind CSS integration for Designers
 * Automatically generates tailwind.config.js from designers.config.json
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import prettier from 'prettier';
import { loadConfig, type DesignersConfig, resolveTokenReference } from '../utils/config-loader';

export interface TailwindIntegrationOptions {
  configPath?: string;
  outputPath?: string;
  watch?: boolean;
  merge?: boolean;
}

/**
 * Generate Tailwind config from Designers config
 */
export async function generateTailwindConfig(options: TailwindIntegrationOptions = {}) {
  const designersConfig = await loadConfig(options.configPath);
  
  if (!designersConfig) {
    throw new Error('designers.config.json not found. Run "npx designers init" first.');
  }
  
  const tailwindConfig = buildTailwindConfig(designersConfig);
  const outputPath = options.outputPath || path.join(process.cwd(), 'tailwind.config.js');
  
  let finalConfig = tailwindConfig;
  
  // Merge with existing config if requested
  if (options.merge && fs.existsSync(outputPath)) {
    const existingConfig = await loadExistingTailwindConfig(outputPath);
    finalConfig = mergeTailwindConfigs(existingConfig, tailwindConfig);
  }
  
  const configCode = generateTailwindConfigCode(finalConfig, designersConfig);
  const formattedCode = await prettier.format(configCode, { parser: 'babel' });
  
  await fs.writeFile(outputPath, formattedCode);
  
  console.log(chalk.green(`✓ Generated ${outputPath}`));
  
  if (options.watch) {
    await watchDesignersConfig(options);
  }
}

/**
 * Build Tailwind config object from Designers config
 */
function buildTailwindConfig(config: DesignersConfig) {
  const tailwindConfig: any = {
    content: [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: buildTailwindColors(config),
        fontFamily: config.typography.fontFamily,
        fontSize: buildTailwindFontSizes(config),
        fontWeight: config.typography.fontWeight || {},
        lineHeight: config.typography.lineHeight || {},
        letterSpacing: config.typography.letterSpacing || {},
        spacing: buildTailwindSpacing(config),
        borderRadius: config.effects.borderRadius,
        boxShadow: config.effects.shadows,
        screens: buildTailwindScreens(config),
        container: buildTailwindContainer(config),
        backgroundImage: config.effects.gradients || {},
        blur: config.effects.blur || {},
        opacity: config.effects.opacity || {},
      },
    },
    plugins: [
      // Add Designers plugin for component classes
      'require("@designers/tailwind-plugin")',
    ],
    darkMode: 'class', // Enable class-based dark mode
  };
  
  return tailwindConfig;
}

/**
 * Build Tailwind colors from all themes
 */
function buildTailwindColors(config: DesignersConfig) {
  const colors: any = {};
  
  // Add base colors from light theme (primary source)
  const lightTheme = config.theme.themes.light;
  if (lightTheme?.colors) {
    Object.assign(colors, lightTheme.colors);
  }
  
  // Add semantic colors with CSS variable references
  const semanticColors: any = {};
  if (lightTheme?.semantic) {
    Object.entries(lightTheme.semantic).forEach(([category, values]) => {
      semanticColors[category] = {};
      Object.entries(values as Record<string, string>).forEach(([key, value]) => {
        // Use CSS variables for semantic colors to support theme switching
        semanticColors[category][key] = `var(--${config.tokens.prefix}-semantic-${category}-${key})`;
      });
    });
  }
  
  return {
    ...colors,
    semantic: semanticColors,
  };
}

/**
 * Build Tailwind font sizes with line heights
 */
function buildTailwindFontSizes(config: DesignersConfig) {
  const fontSizes: any = {};
  
  Object.entries(config.typography.fontSize).forEach(([key, size]) => {
    const lineHeight = config.typography.lineHeight?.[key];
    
    if (lineHeight) {
      fontSizes[key] = [size, { lineHeight: lineHeight.toString() }];
    } else {
      fontSizes[key] = size;
    }
  });
  
  // Add semantic typography scales
  if (config.typography.scales) {
    Object.entries(config.typography.scales).forEach(([category, scales]) => {
      Object.entries(scales as Record<string, any>).forEach(([key, scale]) => {
        const scaleKey = `${category}-${key}`;
        fontSizes[scaleKey] = [
          scale.fontSize,
          {
            lineHeight: scale.lineHeight,
            letterSpacing: scale.letterSpacing,
            fontWeight: scale.fontWeight,
          },
        ];
      });
    });
  }
  
  return fontSizes;
}

/**
 * Build Tailwind spacing scale
 */
function buildTailwindSpacing(config: DesignersConfig) {
  const spacing = { ...config.spacing.scale };
  
  // Add semantic spacing
  if (config.spacing.semantic) {
    Object.entries(config.spacing.semantic).forEach(([category, values]) => {
      Object.entries(values as Record<string, string>).forEach(([key, value]) => {
        spacing[`${category}-${key}`] = value;
      });
    });
  }
  
  return spacing;
}

/**
 * Build Tailwind screens from breakpoints
 */
function buildTailwindScreens(config: DesignersConfig) {
  const screens: any = {};
  
  Object.entries(config.responsive.breakpoints).forEach(([key, breakpoint]) => {
    if (typeof breakpoint === 'object' && breakpoint.min) {
      screens[key] = breakpoint.min;
    }
  });
  
  return screens;
}

/**
 * Build Tailwind container configuration
 */
function buildTailwindContainer(config: DesignersConfig) {
  return {
    center: true,
    padding: '1rem',
    screens: config.responsive.containerSizes || {},
  };
}

/**
 * Generate the actual tailwind.config.js code
 */
function generateTailwindConfigCode(tailwindConfig: any, designersConfig: DesignersConfig): string {
  return `/** @type {import('tailwindcss').Config} */
// Auto-generated from designers.config.json
// Do not edit this file directly - run 'npx designers export tailwind' to regenerate

const designersPlugin = require('@designers/tailwind-plugin');

module.exports = {
  content: ${JSON.stringify(tailwindConfig.content, null, 4)},
  darkMode: '${tailwindConfig.darkMode}',
  theme: {
    extend: ${JSON.stringify(tailwindConfig.theme.extend, null, 6)},
  },
  plugins: [
    designersPlugin({
      // Designers configuration
      prefix: '${designersConfig.tokens.prefix}',
      components: ${JSON.stringify(designersConfig.components.library || {}, null, 6)},
    }),
  ],
};
`;
}

/**
 * Load existing Tailwind config for merging
 */
async function loadExistingTailwindConfig(configPath: string): Promise<any> {
  try {
    // This is a simplified approach - in production, you'd want to use a proper JS parser
    const content = await fs.readFile(configPath, 'utf-8');
    
    // Extract the config object (this is a basic implementation)
    // In production, you'd use a proper AST parser
    const match = content.match(/module\.exports\s*=\s*({[\s\S]*});?\s*$/);
    if (match) {
      // This is unsafe - in production, use a proper parser
      return eval(`(${match[1]})`);
    }
    
    return {};
  } catch (error) {
    console.warn(chalk.yellow('Could not parse existing Tailwind config, creating new one'));
    return {};
  }
}

/**
 * Merge existing Tailwind config with generated config
 */
function mergeTailwindConfigs(existing: any, generated: any): any {
  return {
    ...existing,
    ...generated,
    theme: {
      ...existing.theme,
      ...generated.theme,
      extend: {
        ...existing.theme?.extend,
        ...generated.theme?.extend,
      },
    },
    plugins: [
      ...(existing.plugins || []),
      ...(generated.plugins || []),
    ],
  };
}

/**
 * Watch designers.config.json for changes and auto-regenerate Tailwind config
 */
async function watchDesignersConfig(options: TailwindIntegrationOptions) {
  const configPath = options.configPath || path.join(process.cwd(), 'designers.config.json');
  
  console.log(chalk.blue('👀 Watching designers.config.json for changes...'));
  
  fs.watchFile(configPath, async () => {
    try {
      console.log(chalk.cyan('🔄 Regenerating Tailwind config...'));
      await generateTailwindConfig({ ...options, watch: false });
      console.log(chalk.green('✅ Tailwind config updated'));
    } catch (error: any) {
      console.error(chalk.red('❌ Failed to regenerate Tailwind config:'), error.message);
    }
  });
}

/**
 * Setup automatic Tailwind integration
 */
export async function setupTailwindIntegration(options: TailwindIntegrationOptions = {}) {
  const designersConfig = await loadConfig();
  
  if (!designersConfig) {
    throw new Error('designers.config.json not found. Run "npx designers init" first.');
  }
  
  // Update designers.config.json to enable Tailwind integration
  designersConfig.integrations = {
    ...designersConfig.integrations,
    tailwind: {
      enabled: true,
      configPath: options.outputPath || './tailwind.config.js',
      autoGenerate: true,
      watch: options.watch || false,
    },
  };
  
  // Save updated config
  const configPath = options.configPath || path.join(process.cwd(), 'designers.config.json');
  await fs.writeJson(configPath, designersConfig, { spaces: 2 });
  
  // Generate initial Tailwind config
  await generateTailwindConfig(options);
  
  // Create Tailwind plugin if it doesn't exist
  await createTailwindPlugin(designersConfig);
  
  console.log(chalk.green('\n✅ Tailwind integration setup complete!'));
  console.log(chalk.cyan('\nNext steps:'));
  console.log(chalk.gray('1. Install Tailwind CSS if not already installed'));
  console.log(chalk.gray('2. Add Tailwind directives to your CSS'));
  console.log(chalk.gray('3. Use Designers classes in your components'));
  console.log(chalk.gray('\nExample: <button className="btn-primary btn-md">Click me</button>'));
}

/**
 * Create Tailwind plugin for component classes
 */
async function createTailwindPlugin(config: DesignersConfig) {
  const pluginPath = path.join(process.cwd(), 'node_modules', '@designers', 'tailwind-plugin', 'index.js');
  
  await fs.ensureDir(path.dirname(pluginPath));
  
  const pluginCode = generateTailwindPluginCode(config);
  await fs.writeFile(pluginPath, pluginCode);
}

/**
 * Generate Tailwind plugin code for component classes
 */
function generateTailwindPluginCode(config: DesignersConfig): string {
  return `const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addComponents, theme, addUtilities }) {
  // Add component classes from Designers config
  const components = ${JSON.stringify(generateComponentClasses(config), null, 2)};
  
  addComponents(components);
  
  // Add utility classes for semantic colors
  const semanticUtilities = {
    '.text-semantic-primary': { color: 'var(--designers-semantic-text-primary)' },
    '.text-semantic-secondary': { color: 'var(--designers-semantic-text-secondary)' },
    '.bg-semantic-primary': { backgroundColor: 'var(--designers-semantic-background-primary)' },
    '.bg-semantic-secondary': { backgroundColor: 'var(--designers-semantic-background-secondary)' },
    '.border-semantic-primary': { borderColor: 'var(--designers-semantic-border-primary)' },
  };
  
  addUtilities(semanticUtilities);
});
`;
}

/**
 * Generate component classes from config
 */
function generateComponentClasses(config: DesignersConfig): Record<string, any> {
  const classes: Record<string, any> = {};
  
  if (!config.components.library) return classes;
  
  Object.entries(config.components.library).forEach(([componentName, component]) => {
    // Base component class
    classes[`.${componentName}`] = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
    };
    
    // Variant classes
    if (component.variants) {
      Object.entries(component.variants).forEach(([variantName, variant]) => {
        const className = `.${componentName}-${variantName}`;
        classes[className] = convertDesignersStylesToCSS(variant, config);
      });
    }
    
    // Size classes
    if (component.sizes) {
      Object.entries(component.sizes).forEach(([sizeName, size]) => {
        const className = `.${componentName}-${sizeName}`;
        classes[className] = convertDesignersStylesToCSS(size, config);
      });
    }
  });
  
  return classes;
}

/**
 * Convert Designers styles to CSS
 */
function convertDesignersStylesToCSS(styles: any, config: DesignersConfig): Record<string, string> {
  const css: Record<string, string> = {};
  
  Object.entries(styles).forEach(([property, value]) => {
    if (typeof value === 'string' && value.includes('.')) {
      // This is a token reference
      try {
        const resolvedValue = resolveTokenReference(value, config);
        css[property] = resolvedValue;
      } catch (error) {
        // If resolution fails, use CSS variable
        const cssVar = value.replace(/\./g, '-');
        css[property] = `var(--${config.tokens.prefix}-${cssVar})`;
      }
    } else if (typeof value === 'string') {
      css[property] = value;
    }
  });
  
  return css;
}
