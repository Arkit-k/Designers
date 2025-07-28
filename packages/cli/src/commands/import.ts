/**
 * Import command - Import UI libraries and components
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { execSync } from 'child_process';
import { loadConfig, saveConfig } from '../utils/config-loader';

interface ImportOptions {
  library?: string;
  components?: string[];
  output?: string;
  theme?: 'inherit' | 'custom';
  animation?: 'framer-motion' | 'gsap' | 'both';
  force?: boolean;
}

const SUPPORTED_LIBRARIES = {
  shadcn: {
    name: 'shadcn/ui',
    description: 'Beautifully designed components built with Radix UI and Tailwind CSS',
    dependencies: [
      '@radix-ui/react-slot',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
    devDependencies: [
      'tailwindcss',
      'autoprefixer',
      'postcss',
    ],
    components: [
      'button',
      'card',
      'input',
      'badge',
      'alert',
      'avatar',
      'checkbox',
      'dialog',
      'dropdown-menu',
      'form',
      'label',
      'select',
      'sheet',
      'table',
      'tabs',
      'toast',
    ],
  },
  mui: {
    name: 'Material-UI',
    description: 'React components implementing Google\'s Material Design',
    dependencies: [
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
    ],
    components: [
      'Button',
      'Card',
      'TextField',
      'Chip',
      'Alert',
      'Avatar',
      'Checkbox',
      'Dialog',
      'Menu',
      'FormControl',
      'Select',
      'Drawer',
      'Table',
      'Tabs',
      'Snackbar',
    ],
  },
  chakra: {
    name: 'Chakra UI',
    description: 'Simple, modular and accessible component library',
    dependencies: [
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
    ],
    components: [
      'Button',
      'Box',
      'Input',
      'Badge',
      'Alert',
      'Avatar',
      'Checkbox',
      'Modal',
      'Menu',
      'FormControl',
      'Select',
      'Drawer',
      'Table',
      'Tabs',
      'Toast',
    ],
  },
  mantine: {
    name: 'Mantine',
    description: 'Full-featured React components and hooks library',
    dependencies: [
      '@mantine/core',
      '@mantine/hooks',
    ],
    components: [
      'Button',
      'Card',
      'TextInput',
      'Badge',
      'Alert',
      'Avatar',
      'Checkbox',
      'Modal',
      'Menu',
      'Select',
      'Drawer',
      'Table',
      'Tabs',
      'Notification',
    ],
  },
};

export async function importCommand(options: ImportOptions) {
  const spinner = ora();
  
  try {
    console.log(chalk.cyan('\n🎨 Importing UI library components...\n'));
    
    // Load current config
    const config = await loadConfig();
    if (!config) {
      throw new Error('designers.config.json not found. Run "npx designers init" first.');
    }
    
    // Get library selection
    const library = options.library || await selectLibrary();
    const libraryInfo = SUPPORTED_LIBRARIES[library as keyof typeof SUPPORTED_LIBRARIES];
    
    if (!libraryInfo) {
      throw new Error(`Unsupported library: ${library}`);
    }
    
    // Get component selection
    const components = options.components || await selectComponents(libraryInfo);
    
    // Install dependencies
    spinner.start('Installing dependencies...');
    await installDependencies(libraryInfo);
    spinner.succeed('Dependencies installed');
    
    // Update config
    spinner.start('Updating configuration...');
    await updateConfigWithLibrary(config, library, components, options);
    spinner.succeed('Configuration updated');
    
    // Generate component files
    spinner.start('Generating component files...');
    await generateComponentFiles(library, components, options);
    spinner.succeed('Component files generated');
    
    // Setup integration
    await setupIntegration(library, config, options.animation);
    
    console.log(chalk.green('\n✅ UI library imported successfully!\n'));
    console.log(chalk.cyan('Next steps:'));
    console.log(chalk.gray('1. Import components in your app'));
    console.log(chalk.gray('2. Use the UI components with your design system'));
    console.log(chalk.gray('3. Customize themes in designers.config.json'));
    
    // Show usage example
    showUsageExample(library, components[0]);
    
  } catch (error: any) {
    spinner.fail('Import failed');
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

async function selectLibrary(): Promise<string> {
  const { library } = await inquirer.prompt([
    {
      type: 'list',
      name: 'library',
      message: 'Which UI library would you like to import?',
      choices: Object.entries(SUPPORTED_LIBRARIES).map(([key, info]) => ({
        name: `${info.name} - ${info.description}`,
        value: key,
      })),
    },
  ]);
  
  return library;
}

async function selectComponents(libraryInfo: any): Promise<string[]> {
  const { components } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'components',
      message: 'Which components would you like to import?',
      choices: [
        { name: 'All components', value: 'all' },
        new inquirer.Separator(),
        ...libraryInfo.components.map((comp: string) => ({
          name: comp,
          value: comp,
        })),
      ],
      validate: (input) => input.length > 0 || 'Please select at least one component',
    },
  ]);
  
  if (components.includes('all')) {
    return libraryInfo.components;
  }
  
  return components;
}

async function installDependencies(libraryInfo: any): Promise<void> {
  const packageManager = detectPackageManager();
  
  // Install main dependencies
  if (libraryInfo.dependencies?.length > 0) {
    const installCmd = `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} ${libraryInfo.dependencies.join(' ')}`;
    execSync(installCmd, { stdio: 'pipe' });
  }
  
  // Install dev dependencies
  if (libraryInfo.devDependencies?.length > 0) {
    const devFlag = packageManager === 'npm' ? '--save-dev' : '--dev';
    const installCmd = `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} ${devFlag} ${libraryInfo.devDependencies.join(' ')}`;
    execSync(installCmd, { stdio: 'pipe' });
  }
  
  // Install Designers integration package
  const integrationCmd = `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} @designers/integrations`;
  execSync(integrationCmd, { stdio: 'pipe' });
}

function detectPackageManager(): string {
  if (fs.existsSync('yarn.lock')) return 'yarn';
  if (fs.existsSync('pnpm-lock.yaml')) return 'pnpm';
  return 'npm';
}

async function updateConfigWithLibrary(
  config: any,
  library: string,
  components: string[],
  options: ImportOptions
): Promise<void> {
  // Add UI library integration to config
  config.integrations = config.integrations || {};
  config.integrations.uiLibrary = library;
  config.integrations.importedComponents = components;
  
  // Add library-specific configuration
  config.ui = config.ui || {};
  config.ui[library] = {
    enabled: true,
    components: components,
    theme: options.theme || 'inherit',
    customizations: {},
  };
  
  await saveConfig(config);
}

async function generateComponentFiles(
  library: string,
  components: string[],
  options: ImportOptions
): Promise<void> {
  const outputDir = options.output || path.join(process.cwd(), 'src', 'components', 'ui');
  await fs.ensureDir(outputDir);
  
  // Generate index file
  const indexContent = generateIndexFile(library, components);
  await fs.writeFile(path.join(outputDir, 'index.ts'), indexContent);
  
  // Generate individual component files (simplified for demo)
  for (const component of components) {
    const componentContent = generateComponentFile(library, component);
    const fileName = `${component.toLowerCase()}.tsx`;
    await fs.writeFile(path.join(outputDir, fileName), componentContent);
  }
}

function generateIndexFile(library: string, components: string[]): string {
  const exports = components.map(comp => 
    `export { ${comp} } from './${comp.toLowerCase()}';`
  ).join('\n');
  
  return `// Auto-generated UI components from ${library}
// Integrated with Designers design system

${exports}

// Re-export integration utilities
export { useUIComponent, useUIComponents } from '@designers/integrations';
`;
}

function generateComponentFile(library: string, component: string): string {
  return `// ${component} component integrated with Designers
import React from 'react';
import { useUIComponent } from '@designers/integrations';

export interface ${component}Props {
  variant?: string;
  size?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function ${component}(props: ${component}Props) {
  const Component = useUIComponent<${component}Props>('${component}');
  
  if (!Component) {
    throw new Error('${component} component not found. Make sure the integration is properly configured.');
  }
  
  return <Component {...props} />;
}
`;
}

async function setupIntegration(library: string, config: any, animationLibrary?: string): Promise<void> {
  // Generate integration provider setup
  const providerContent = generateProviderSetup(library, config, animationLibrary);
  const providerPath = path.join(process.cwd(), 'src', 'providers', 'ui-provider.tsx');

  await fs.ensureDir(path.dirname(providerPath));
  await fs.writeFile(providerPath, providerContent);
}

function generateProviderSetup(library: string, config: any, animationLibrary = 'framer-motion'): string {
  const libraryCapitalized = library.charAt(0).toUpperCase() + library.slice(1);

  return `// UI Integration Provider
import React from 'react';
import { DesignSystemProvider } from '@designers/react';
import { IntegrationProvider } from '@designers/integrations';
import { ${library}Components, ${library}Adapter } from '@designers/integrations/${library}';
import { AnimationProvider } from '@designers/animations';

export function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <DesignSystemProvider>
      <AnimationProvider library="${animationLibrary}">
        <IntegrationProvider
          library="${library}"
          components={${library}Components}
          config={{
            name: '${library}',
            theme: ${JSON.stringify(config.ui?.[library]?.theme || 'inherit', null, 2)},
          }}
        >
          {children}
        </IntegrationProvider>
      </AnimationProvider>
    </DesignSystemProvider>
  );
}

// Export individual components for direct use
export * from '@designers/integrations/${library}';

// Export animation utilities
export * from '@designers/animations';
`;
}

function showUsageExample(library: string, component: string): void {
  console.log(chalk.cyan('\nUsage example:'));
  console.log(chalk.gray(`
// 1. Wrap your app with providers
import { DesignSystemProvider } from '@designers/react';
import { UIProvider } from './providers/ui-provider';

function App() {
  return (
    <DesignSystemProvider>
      <UIProvider>
        <YourApp />
      </UIProvider>
    </DesignSystemProvider>
  );
}

// 2. Use components in your app
import { ${component} } from './components/ui';

function MyComponent() {
  return (
    <${component} variant="primary" size="md">
      Hello from ${library}!
    </${component}>
  );
}
`));
}
