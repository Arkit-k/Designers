/**
 * Export command - Export design tokens to various formats
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import prettier from 'prettier';
import {
  colorThemes,
  typography,
  spacing,
  shadows,
  borderRadius,
  opacity,
  breakpoints,
  type ColorTheme
} from '@designers/core';
import { generateTailwindConfig, setupTailwindIntegration } from '../integrations/tailwind';
import { loadConfig } from '../utils/config-loader';

interface ExportOptions {
  output?: string;
  theme: 'light' | 'dark' | 'all';
  prefix: string;
}

export async function exportCommand(format: string, options: ExportOptions) {
  const spinner = ora();
  
  try {
    console.log(chalk.cyan(`\n🎨 Exporting design tokens to ${format.toUpperCase()}...\n`));
    
    spinner.start('Generating tokens...');
    
    const exporters: Record<string, () => Promise<void>> = {
      css: () => exportCSS(options),
      scss: () => exportSCSS(options),
      js: () => exportJS(options),
      ts: () => exportTS(options),
      json: () => exportJSON(options),
      tailwind: () => exportTailwindFromConfig(options),
    };
    
    const exporter = exporters[format.toLowerCase()];
    
    if (!exporter) {
      throw new Error(`Unsupported format: ${format}. Supported formats: ${Object.keys(exporters).join(', ')}`);
    }
    
    await exporter();
    
    spinner.succeed(`Tokens exported successfully to ${format.toUpperCase()}`);
    
  } catch (error: any) {
    spinner.fail('Export failed');
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

async function exportCSS(options: ExportOptions) {
  const themes = options.theme === 'all' ? ['light', 'dark'] : [options.theme];
  
  for (const theme of themes) {
    const css = generateCSSVariables(theme as ColorTheme, options.prefix);
    const filename = options.output || `tokens-${theme}.css`;
    const outputPath = path.resolve(filename);
    
    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, css);
    
    console.log(chalk.green(`✓ Generated ${filename}`));
  }
}

async function exportSCSS(options: ExportOptions) {
  const themes = options.theme === 'all' ? ['light', 'dark'] : [options.theme];
  
  for (const theme of themes) {
    const scss = generateSCSSVariables(theme as ColorTheme, options.prefix);
    const filename = options.output || `tokens-${theme}.scss`;
    const outputPath = path.resolve(filename);
    
    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, scss);
    
    console.log(chalk.green(`✓ Generated ${filename}`));
  }
}

async function exportJS(options: ExportOptions) {
  const js = generateJSTokens(options.theme, options.prefix);
  const filename = options.output || 'tokens.js';
  const outputPath = path.resolve(filename);
  
  const formatted = await prettier.format(js, { parser: 'babel' });
  
  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, formatted);
  
  console.log(chalk.green(`✓ Generated ${filename}`));
}

async function exportTS(options: ExportOptions) {
  const ts = generateTSTokens(options.theme, options.prefix);
  const filename = options.output || 'tokens.ts';
  const outputPath = path.resolve(filename);
  
  const formatted = await prettier.format(ts, { parser: 'typescript' });
  
  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, formatted);
  
  console.log(chalk.green(`✓ Generated ${filename}`));
}

async function exportJSON(options: ExportOptions) {
  const json = generateJSONTokens(options.theme);
  const filename = options.output || 'tokens.json';
  const outputPath = path.resolve(filename);
  
  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeJson(outputPath, json, { spaces: 2 });
  
  console.log(chalk.green(`✓ Generated ${filename}`));
}

async function exportTailwindFromConfig(options: ExportOptions) {
  await generateTailwindConfig({
    outputPath: options.output,
    merge: true,
  });
}

function generateCSSVariables(theme: ColorTheme, prefix: string): string {
  const themeData = colorThemes[theme];
  const vars: string[] = [];
  
  // Helper to flatten nested objects
  function flattenObject(obj: any, keyPrefix: string = ''): void {
    for (const [key, value] of Object.entries(obj)) {
      const cssKey = keyPrefix ? `${keyPrefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        flattenObject(value, cssKey);
      } else if (typeof value === 'string') {
        vars.push(`  --${prefix}-${cssKey}: ${value};`);
      }
    }
  }
  
  // Add colors
  flattenObject(themeData.colors, 'color');
  flattenObject(themeData.semantic, 'semantic');
  
  // Add spacing
  Object.entries(spacing).forEach(([key, value]) => {
    vars.push(`  --${prefix}-spacing-${key}: ${value};`);
  });
  
  // Add typography
  Object.entries(typography.fontSize).forEach(([key, value]) => {
    vars.push(`  --${prefix}-font-size-${key}: ${value};`);
  });
  
  // Add shadows
  Object.entries(shadows).forEach(([key, value]) => {
    vars.push(`  --${prefix}-shadow-${key}: ${value};`);
  });
  
  // Add border radius
  Object.entries(borderRadius).forEach(([key, value]) => {
    vars.push(`  --${prefix}-radius-${key}: ${value};`);
  });
  
  return `:root {\n${vars.join('\n')}\n}\n`;
}

function generateSCSSVariables(theme: ColorTheme, prefix: string): string {
  const themeData = colorThemes[theme];
  const vars: string[] = [];
  
  // Helper to flatten nested objects
  function flattenObject(obj: any, keyPrefix: string = ''): void {
    for (const [key, value] of Object.entries(obj)) {
      const scssKey = keyPrefix ? `${keyPrefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        flattenObject(value, scssKey);
      } else if (typeof value === 'string') {
        vars.push(`$${prefix}-${scssKey}: ${value};`);
      }
    }
  }
  
  flattenObject(themeData.colors, 'color');
  flattenObject(themeData.semantic, 'semantic');
  
  Object.entries(spacing).forEach(([key, value]) => {
    vars.push(`$${prefix}-spacing-${key}: ${value};`);
  });
  
  return vars.join('\n') + '\n';
}

function generateJSTokens(theme: string, prefix: string): string {
  const themes = theme === 'all' ? { light: colorThemes.light, dark: colorThemes.dark } : { [theme]: colorThemes[theme as ColorTheme] };
  
  return `// Generated design tokens
export const tokens = ${JSON.stringify({
    themes,
    typography,
    spacing,
    shadows,
    borderRadius,
    opacity,
    breakpoints,
  }, null, 2)};

export default tokens;
`;
}

function generateTSTokens(theme: string, prefix: string): string {
  const themes = theme === 'all' ? { light: colorThemes.light, dark: colorThemes.dark } : { [theme]: colorThemes[theme as ColorTheme] };
  
  return `// Generated design tokens
import type { ColorTheme } from '@designers/core';

export interface DesignTokens {
  themes: Record<string, any>;
  typography: typeof typography;
  spacing: typeof spacing;
  shadows: typeof shadows;
  borderRadius: typeof borderRadius;
  opacity: typeof opacity;
  breakpoints: typeof breakpoints;
}

export const tokens: DesignTokens = ${JSON.stringify({
    themes,
    typography,
    spacing,
    shadows,
    borderRadius,
    opacity,
    breakpoints,
  }, null, 2)};

export default tokens;
`;
}

function generateJSONTokens(theme: string) {
  const themes = theme === 'all' ? { light: colorThemes.light, dark: colorThemes.dark } : { [theme]: colorThemes[theme as ColorTheme] };
  
  return {
    themes,
    typography,
    spacing,
    shadows,
    borderRadius,
    opacity,
    breakpoints,
  };
}

function generateTailwindConfig(theme: string): string {
  const themeData = theme === 'all' ? colorThemes.light : colorThemes[theme as ColorTheme];
  
  return `// Generated Tailwind config for Designers tokens
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(themeData.colors, null, 6)},
      spacing: ${JSON.stringify(spacing, null, 6)},
      fontSize: ${JSON.stringify(typography.fontSize, null, 6)},
      fontFamily: ${JSON.stringify(typography.fontFamily, null, 6)},
      boxShadow: ${JSON.stringify(shadows, null, 6)},
      borderRadius: ${JSON.stringify(borderRadius, null, 6)},
      screens: ${JSON.stringify(Object.fromEntries(
        Object.entries(breakpoints).map(([key, value]) => [key, value.min])
      ), null, 6)},
    },
  },
};
`;
}
