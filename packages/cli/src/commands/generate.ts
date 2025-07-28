/**
 * Generate command - Generate components and utilities
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import Handlebars from 'handlebars';

interface GenerateOptions {
  output?: string;
  template?: string;
  dryRun?: boolean;
}

export async function generateCommand(type: string, name: string, options: GenerateOptions) {
  const spinner = ora();
  
  try {
    console.log(chalk.cyan(`\n🎨 Generating ${type}${name ? ` "${name}"` : ''}...\n`));
    
    const generators: Record<string, () => Promise<void>> = {
      component: () => generateComponent(name, options),
      theme: () => generateTheme(name, options),
      tokens: () => generateTokens(options),
      hook: () => generateHook(name, options),
      provider: () => generateProvider(name, options),
    };
    
    const generator = generators[type.toLowerCase()];
    
    if (!generator) {
      throw new Error(`Unsupported type: ${type}. Supported types: ${Object.keys(generators).join(', ')}`);
    }
    
    await generator();
    
    if (!options.dryRun) {
      console.log(chalk.green(`\n✅ ${type} generated successfully!\n`));
    }
    
  } catch (error: any) {
    spinner.fail('Generation failed');
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

async function generateComponent(name: string, options: GenerateOptions) {
  if (!name) {
    const { componentName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'componentName',
        message: 'Component name:',
        validate: (input) => input.trim() !== '' || 'Component name is required',
      },
    ]);
    name = componentName;
  }
  
  const { variants, sizes, styling } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'variants',
      message: 'Select variants:',
      choices: [
        { name: 'Primary', value: 'primary' },
        { name: 'Secondary', value: 'secondary' },
        { name: 'Outline', value: 'outline' },
        { name: 'Ghost', value: 'ghost' },
        { name: 'Destructive', value: 'destructive' },
      ],
      default: ['primary', 'secondary'],
    },
    {
      type: 'checkbox',
      name: 'sizes',
      message: 'Select sizes:',
      choices: [
        { name: 'Small', value: 'sm' },
        { name: 'Medium', value: 'md' },
        { name: 'Large', value: 'lg' },
      ],
      default: ['sm', 'md', 'lg'],
    },
    {
      type: 'list',
      name: 'styling',
      message: 'Styling approach:',
      choices: [
        { name: 'CSS-in-JS (styled)', value: 'styled' },
        { name: 'CSS Modules', value: 'modules' },
        { name: 'Inline styles', value: 'inline' },
        { name: 'Tailwind classes', value: 'tailwind' },
      ],
      default: 'styled',
    },
  ]);
  
  const componentCode = generateComponentCode(name, { variants, sizes, styling });
  const outputPath = options.output || `src/components/${name}.tsx`;
  
  if (options.dryRun) {
    console.log(chalk.yellow('Dry run - would generate:'));
    console.log(chalk.gray(outputPath));
    console.log(componentCode);
    return;
  }
  
  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, componentCode);
  
  console.log(chalk.green(`✓ Generated ${outputPath}`));
}

async function generateTheme(name: string, options: GenerateOptions) {
  if (!name) {
    const { themeName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'themeName',
        message: 'Theme name:',
        validate: (input) => input.trim() !== '' || 'Theme name is required',
      },
    ]);
    name = themeName;
  }
  
  const { baseTheme, customColors } = await inquirer.prompt([
    {
      type: 'list',
      name: 'baseTheme',
      message: 'Base theme to extend:',
      choices: [
        { name: 'Light', value: 'light' },
        { name: 'Dark', value: 'dark' },
      ],
      default: 'light',
    },
    {
      type: 'confirm',
      name: 'customColors',
      message: 'Add custom brand colors?',
      default: true,
    },
  ]);
  
  let brandColors = {};
  if (customColors) {
    const { primary, secondary } = await inquirer.prompt([
      {
        type: 'input',
        name: 'primary',
        message: 'Primary brand color (hex):',
        default: '#3b82f6',
        validate: (input) => /^#[0-9A-F]{6}$/i.test(input) || 'Please enter a valid hex color',
      },
      {
        type: 'input',
        name: 'secondary',
        message: 'Secondary brand color (hex):',
        default: '#64748b',
        validate: (input) => /^#[0-9A-F]{6}$/i.test(input) || 'Please enter a valid hex color',
      },
    ]);
    
    brandColors = { primary, secondary };
  }
  
  const themeCode = generateThemeCode(name, { baseTheme, brandColors });
  const outputPath = options.output || `src/themes/${name}.ts`;
  
  if (options.dryRun) {
    console.log(chalk.yellow('Dry run - would generate:'));
    console.log(chalk.gray(outputPath));
    console.log(themeCode);
    return;
  }
  
  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, themeCode);
  
  console.log(chalk.green(`✓ Generated ${outputPath}`));
}

async function generateTokens(options: GenerateOptions) {
  const { format, output } = await inquirer.prompt([
    {
      type: 'list',
      name: 'format',
      message: 'Token format:',
      choices: [
        { name: 'TypeScript', value: 'ts' },
        { name: 'JavaScript', value: 'js' },
        { name: 'CSS Custom Properties', value: 'css' },
        { name: 'SCSS Variables', value: 'scss' },
      ],
      default: 'ts',
    },
    {
      type: 'input',
      name: 'output',
      message: 'Output directory:',
      default: 'src/tokens',
    },
  ]);
  
  // This would call the export command internally
  console.log(chalk.blue(`Use: designers export ${format} --output ${output}`));
}

async function generateHook(name: string, options: GenerateOptions) {
  if (!name) {
    const { hookName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'hookName',
        message: 'Hook name (without "use" prefix):',
        validate: (input) => input.trim() !== '' || 'Hook name is required',
      },
    ]);
    name = hookName;
  }
  
  const hookCode = generateHookCode(name);
  const outputPath = options.output || `src/hooks/use${name.charAt(0).toUpperCase() + name.slice(1)}.ts`;
  
  if (options.dryRun) {
    console.log(chalk.yellow('Dry run - would generate:'));
    console.log(chalk.gray(outputPath));
    console.log(hookCode);
    return;
  }
  
  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, hookCode);
  
  console.log(chalk.green(`✓ Generated ${outputPath}`));
}

async function generateProvider(name: string, options: GenerateOptions) {
  if (!name) {
    const { providerName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'providerName',
        message: 'Provider name:',
        validate: (input) => input.trim() !== '' || 'Provider name is required',
      },
    ]);
    name = providerName;
  }
  
  const providerCode = generateProviderCode(name);
  const outputPath = options.output || `src/providers/${name}Provider.tsx`;
  
  if (options.dryRun) {
    console.log(chalk.yellow('Dry run - would generate:'));
    console.log(chalk.gray(outputPath));
    console.log(providerCode);
    return;
  }
  
  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, providerCode);
  
  console.log(chalk.green(`✓ Generated ${outputPath}`));
}

function generateComponentCode(name: string, config: any): string {
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);
  
  return `import React from 'react';
import { useDesignTokens } from '@designers/react';

export interface ${componentName}Props {
  variant?: ${config.variants.map((v: string) => `'${v}'`).join(' | ')};
  size?: ${config.sizes.map((s: string) => `'${s}'`).join(' | ')};
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function ${componentName}({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
}: ${componentName}Props) {
  const { colors, spacing, typography, borderRadius } = useDesignTokens();
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.semantic.interactive.primary,
          color: colors.semantic.text.inverse,
          border: 'none',
        };
      case 'secondary':
        return {
          backgroundColor: colors.semantic.interactive.secondary,
          color: colors.semantic.text.primary,
          border: \`1px solid \${colors.semantic.border.primary}\`,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: colors.semantic.interactive.primary,
          border: \`1px solid \${colors.semantic.interactive.primary}\`,
        };
      default:
        return {};
    }
  };
  
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: \`\${spacing[1]} \${spacing[3]}\`,
          fontSize: typography.fontSize.sm,
        };
      case 'lg':
        return {
          padding: \`\${spacing[3]} \${spacing[6]}\`,
          fontSize: typography.fontSize.lg,
        };
      default:
        return {
          padding: \`\${spacing[2]} \${spacing[4]}\`,
          fontSize: typography.fontSize.base,
        };
    }
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...getVariantStyles(),
        ...getSizeStyles(),
        borderRadius: borderRadius.md,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        fontWeight: typography.fontWeight.medium,
        transition: 'all 0.2s ease',
      }}
    >
      {children}
    </button>
  );
}
`;
}

function generateThemeCode(name: string, config: any): string {
  return `import { deepMerge, colorThemes } from '@designers/core';

export const ${name}Theme = deepMerge(colorThemes.${config.baseTheme}, {
  colors: {
    ${config.brandColors.primary ? `primary: {
      500: '${config.brandColors.primary}',
      // Add other shades as needed
    },` : ''}
    ${config.brandColors.secondary ? `secondary: {
      500: '${config.brandColors.secondary}',
      // Add other shades as needed
    },` : ''}
  },
});

export default ${name}Theme;
`;
}

function generateHookCode(name: string): string {
  const hookName = `use${name.charAt(0).toUpperCase() + name.slice(1)}`;
  
  return `import { useState, useEffect } from 'react';

export function ${hookName}() {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Hook logic here
  }, []);
  
  return {
    state,
    // Add other return values
  };
}
`;
}

function generateProviderCode(name: string): string {
  const providerName = `${name.charAt(0).toUpperCase() + name.slice(1)}Provider`;
  const contextName = `${name.charAt(0).toUpperCase() + name.slice(1)}Context`;
  
  return `import React, { createContext, useContext, ReactNode } from 'react';

interface ${contextName}Value {
  // Define context value type
}

const ${contextName} = createContext<${contextName}Value | null>(null);

export interface ${providerName}Props {
  children: ReactNode;
}

export function ${providerName}({ children }: ${providerName}Props) {
  const contextValue: ${contextName}Value = {
    // Implement context value
  };
  
  return (
    <${contextName}.Provider value={contextValue}>
      {children}
    </${contextName}.Provider>
  );
}

export function use${name.charAt(0).toUpperCase() + name.slice(1)}(): ${contextName}Value {
  const context = useContext(${contextName});
  
  if (!context) {
    throw new Error('use${name.charAt(0).toUpperCase() + name.slice(1)} must be used within a ${providerName}');
  }
  
  return context;
}
`;
}
