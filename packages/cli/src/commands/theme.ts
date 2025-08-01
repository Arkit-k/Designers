/**
 * Theme command - Manage design system themes
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { colors, createTheme } from '@designers/core';

interface ThemeOptions {
  list?: boolean;
  create?: string;
  extend?: string;
  preview?: boolean;
}

export async function themeCommand(options: ThemeOptions) {
  try {
    if (options.list) {
      listThemes();
      return;
    }
    
    if (options.create) {
      await createTheme(options.create);
      return;
    }
    
    if (options.extend) {
      await extendTheme(options.extend);
      return;
    }
    
    if (options.preview) {
      await previewThemes();
      return;
    }
    
    // Interactive mode
    await interactiveThemeManager();
    
  } catch (error: any) {
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

function listThemes() {
  console.log(chalk.cyan('\n🎨 Available Themes:\n'));
  
  Object.entries(colorThemes).forEach(([name, theme]) => {
    console.log(chalk.bold(name));
    console.log(chalk.gray(`  Primary: ${theme.colors.primary[500]}`));
    console.log(chalk.gray(`  Background: ${theme.semantic.background.primary}`));
    console.log(chalk.gray(`  Text: ${theme.semantic.text.primary}\n`));
  });
}

async function createTheme(name: string) {
  const spinner = ora();
  
  console.log(chalk.cyan(`\n🎨 Creating theme "${name}"...\n`));
  
  const { baseTheme, primaryColor, secondaryColor } = await inquirer.prompt([
    {
      type: 'list',
      name: 'baseTheme',
      message: 'Base theme to start from:',
      choices: [
        { name: 'Light', value: 'light' },
        { name: 'Dark', value: 'dark' },
        { name: 'Custom (blank)', value: 'custom' },
      ],
      default: 'light',
    },
    {
      type: 'input',
      name: 'primaryColor',
      message: 'Primary brand color (hex):',
      default: '#3b82f6',
      validate: (input) => /^#[0-9A-F]{6}$/i.test(input) || 'Please enter a valid hex color',
    },
    {
      type: 'input',
      name: 'secondaryColor',
      message: 'Secondary color (hex):',
      default: '#64748b',
      validate: (input) => /^#[0-9A-F]{6}$/i.test(input) || 'Please enter a valid hex color',
    },
  ]);
  
  spinner.start('Generating theme...');
  
  const themeCode = generateThemeFile(name, {
    baseTheme,
    primaryColor,
    secondaryColor,
  });
  
  const outputPath = path.join(process.cwd(), 'src', 'themes', `${name}.ts`);
  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, themeCode);
  
  spinner.succeed(`Theme "${name}" created successfully`);
  console.log(chalk.green(`✓ Generated ${outputPath}`));
  
  // Generate usage example
  const exampleCode = generateThemeUsageExample(name);
  console.log(chalk.cyan('\nUsage example:'));
  console.log(chalk.gray(exampleCode));
}

async function extendTheme(baseTheme: string) {
  if (!colorThemes[baseTheme as keyof typeof colorThemes]) {
    throw new Error(`Theme "${baseTheme}" not found. Available themes: ${Object.keys(colorThemes).join(', ')}`);
  }
  
  const { name, modifications } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'New theme name:',
      validate: (input) => input.trim() !== '' || 'Theme name is required',
    },
    {
      type: 'checkbox',
      name: 'modifications',
      message: 'What would you like to modify?',
      choices: [
        { name: 'Primary colors', value: 'primary' },
        { name: 'Secondary colors', value: 'secondary' },
        { name: 'Success colors', value: 'success' },
        { name: 'Warning colors', value: 'warning' },
        { name: 'Error colors', value: 'error' },
        { name: 'Typography', value: 'typography' },
        { name: 'Spacing', value: 'spacing' },
      ],
    },
  ]);
  
  const customizations: any = {};
  
  for (const mod of modifications) {
    if (mod === 'primary' || mod === 'secondary' || mod === 'success' || mod === 'warning' || mod === 'error') {
      const { color } = await inquirer.prompt([
        {
          type: 'input',
          name: 'color',
          message: `${mod.charAt(0).toUpperCase() + mod.slice(1)} color (hex):`,
          validate: (input) => /^#[0-9A-F]{6}$/i.test(input) || 'Please enter a valid hex color',
        },
      ]);
      customizations[mod] = color;
    }
  }
  
  const themeCode = generateExtendedThemeFile(name, baseTheme, customizations);
  const outputPath = path.join(process.cwd(), 'src', 'themes', `${name}.ts`);
  
  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, themeCode);
  
  console.log(chalk.green(`✓ Extended theme "${name}" created successfully`));
  console.log(chalk.green(`✓ Generated ${outputPath}`));
}

async function previewThemes() {
  console.log(chalk.cyan('\n🎨 Theme Preview:\n'));
  
  Object.entries(colorThemes).forEach(([name, theme]) => {
    console.log(chalk.bold(`${name.toUpperCase()} THEME`));
    console.log('─'.repeat(40));
    
    // Color swatches
    console.log('Colors:');
    console.log(`  Primary:   ${colorBox(theme.colors.primary[500])} ${theme.colors.primary[500]}`);
    console.log(`  Secondary: ${colorBox(theme.colors.secondary[500])} ${theme.colors.secondary[500]}`);
    console.log(`  Success:   ${colorBox(theme.colors.success[500])} ${theme.colors.success[500]}`);
    console.log(`  Warning:   ${colorBox(theme.colors.warning[500])} ${theme.colors.warning[500]}`);
    console.log(`  Error:     ${colorBox(theme.colors.error[500])} ${theme.colors.error[500]}`);
    
    console.log('\nSemantic Colors:');
    console.log(`  Background: ${colorBox(theme.semantic.background.primary)} ${theme.semantic.background.primary}`);
    console.log(`  Text:       ${colorBox(theme.semantic.text.primary)} ${theme.semantic.text.primary}`);
    console.log(`  Border:     ${colorBox(theme.semantic.border.primary)} ${theme.semantic.border.primary}`);
    
    console.log('\n');
  });
}

async function interactiveThemeManager() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: 'List available themes', value: 'list' },
        { name: 'Create a new theme', value: 'create' },
        { name: 'Extend an existing theme', value: 'extend' },
        { name: 'Preview themes', value: 'preview' },
        { name: 'Export theme tokens', value: 'export' },
      ],
    },
  ]);
  
  switch (action) {
    case 'list':
      listThemes();
      break;
    case 'create':
      const { name } = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Theme name:',
          validate: (input) => input.trim() !== '' || 'Theme name is required',
        },
      ]);
      await createTheme(name);
      break;
    case 'extend':
      const { baseTheme } = await inquirer.prompt([
        {
          type: 'list',
          name: 'baseTheme',
          message: 'Base theme to extend:',
          choices: Object.keys(colorThemes),
        },
      ]);
      await extendTheme(baseTheme);
      break;
    case 'preview':
      await previewThemes();
      break;
    case 'export':
      console.log(chalk.blue('Use: designers export <format> --theme <theme>'));
      break;
  }
}

function generateThemeFile(name: string, config: any): string {
  return `import { deepMerge, colorThemes } from '@designers/core';

// Custom ${name} theme
export const ${name}Theme = deepMerge(colorThemes.${config.baseTheme}, {
  colors: {
    primary: {
      500: '${config.primaryColor}',
      // Add other shades as needed
      // You can use tools like https://uicolors.app to generate full scales
    },
    secondary: {
      500: '${config.secondaryColor}',
      // Add other shades as needed
    },
  },
  // You can also override semantic colors
  semantic: {
    // Uncomment and modify as needed
    // interactive: {
    //   primary: '${config.primaryColor}',
    // },
  },
});

export default ${name}Theme;
`;
}

function generateExtendedThemeFile(name: string, baseTheme: string, customizations: any): string {
  const colorOverrides = Object.entries(customizations)
    .map(([key, value]) => `    ${key}: {\n      500: '${value}',\n      // Add other shades as needed\n    },`)
    .join('\n');
  
  return `import { deepMerge, colorThemes } from '@designers/core';

// Extended ${name} theme based on ${baseTheme}
export const ${name}Theme = deepMerge(colorThemes.${baseTheme}, {
  colors: {
${colorOverrides}
  },
});

export default ${name}Theme;
`;
}

function generateThemeUsageExample(name: string): string {
  return `
// In your app root:
import { DesignSystemProvider } from '@designers/react';
import { ${name}Theme } from './themes/${name}';

function App() {
  return (
    <DesignSystemProvider theme={${name}Theme}>
      <YourApp />
    </DesignSystemProvider>
  );
}
`;
}

function colorBox(color: string): string {
  // Simple color representation for terminal
  return `[${color}]`;
}
