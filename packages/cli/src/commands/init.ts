/**
 * Init command - Initialize Designers in a project
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora, { type Ora } from 'ora';
import inquirer from 'inquirer';
import { execSync } from 'child_process';

interface InitOptions {
  force?: boolean;
  template?: string;
  skipInstall?: boolean;
}

interface ProjectConfig {
  name: string;
  framework: 'react' | 'next' | 'vite' | 'other';
  typescript: boolean;
  styling: 'css' | 'scss' | 'styled-components' | 'emotion' | 'tailwind';
  uiLibrary?: 'shadcn' | 'chakra' | 'mantine' | 'antd' | 'none';
  theme: 'light' | 'dark' | 'auto';
  animations: boolean;
}

const defaultConfig = {
  $schema: "https://designers.dev/schema.json",
  version: "0.1.0",
  name: "My Design System",
  description: "Custom design system configuration",
  theme: {
    default: "light",
    autoDetect: true,
    storage: true,
    themes: {
      light: {
        colors: {
          primary: {
            "500": "#3b82f6"
          },
          secondary: {
            "500": "#64748b"
          }
        },
        semantic: {
          text: {
            primary: "#111827",
            secondary: "#374151"
          },
          background: {
            primary: "#ffffff",
            secondary: "#f9fafb"
          },
          border: {
            primary: "#e5e7eb",
            focus: "#3b82f6"
          },
          interactive: {
            primary: "#2563eb",
            primaryHover: "#1d4ed8"
          }
        }
      }
    }
  },
  typography: {
    fontFamily: {
      sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"]
    },
    fontSize: {
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem"
    }
  },
  spacing: {
    scale: {
      "1": "0.25rem",
      "2": "0.5rem",
      "4": "1rem",
      "6": "1.5rem",
      "8": "2rem"
    }
  },
  effects: {
    shadows: {
      sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    borderRadius: {
      md: "0.375rem",
      lg: "0.5rem"
    }
  },
  responsive: {
    autoDetect: true,
    breakpoints: {
      sm: { min: "640px" },
      md: { min: "768px" },
      lg: { min: "1024px" },
      xl: { min: "1280px" }
    }
  },
  tokens: {
    prefix: "designers",
    output: "./src/styles/tokens",
    formats: ["css", "ts"]
  },
  components: {
    output: "./src/components/ui",
    typescript: true,
    library: {
      button: {
        variants: {
          primary: {
            backgroundColor: "semantic.interactive.primary",
            color: "semantic.text.inverse"
          },
          secondary: {
            backgroundColor: "semantic.interactive.secondary",
            color: "semantic.text.primary"
          }
        },
        sizes: {
          sm: { padding: "spacing.1 spacing.3" },
          md: { padding: "spacing.2 spacing.4" },
          lg: { padding: "spacing.3 spacing.6" }
        }
      }
    }
  },
  animations: {
    enabled: true,
    respectReducedMotion: true,
    library: "framer-motion"
  },
  integrations: {
    uiLibrary: null,
    styling: "css"
  }
};

export async function initCommand(options: InitOptions) {
  const spinner = ora();
  
  try {
    console.log(chalk.cyan('\n🎨 Initializing Designers in your project...\n'));
    
    // Check if config already exists
    const configPath = path.join(process.cwd(), 'designers.config.json');
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    
    if (fs.existsSync(configPath) && !options.force) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: 'designers.config.json already exists. Overwrite?',
          default: false,
        },
      ]);
      
      if (!overwrite) {
        console.log(chalk.yellow('Initialization cancelled.'));
        return;
      }
    }
    
    // Detect project setup
    spinner.start('Analyzing project structure...');
    const projectInfo = await detectProjectSetup();
    spinner.succeed('Project analysis complete');
    
    // Gather user preferences
    const config = await gatherUserPreferences(projectInfo, options);
    
    // Generate configuration
    spinner.start('Generating configuration...');
    const finalConfig = generateConfig(config);
    await fs.writeJson(configPath, finalConfig, { spaces: 2 });
    spinner.succeed('Configuration generated');
    
    // Install dependencies
    if (!options.skipInstall) {
      await installDependencies(config, spinner);
    }
    
    // Generate initial files
    await generateInitialFiles(config, spinner);
    
    // Success message
    console.log(chalk.green('\n✅ Designers has been successfully initialized!\n'));
    console.log(chalk.cyan('Next steps:'));
    console.log(chalk.gray('1. Review your designers.config.json'));
    console.log(chalk.gray('2. Import the DesignSystemProvider in your app'));
    console.log(chalk.gray('3. Start using design tokens with useDesignTokens()'));
    console.log(chalk.gray('\nRun "designers --help" to see available commands\n'));
    
  } catch (error: any) {
    spinner.fail('Initialization failed');
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

async function detectProjectSetup(): Promise<Partial<ProjectConfig>> {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const tsConfigPath = path.join(process.cwd(), 'tsconfig.json');
  
  let packageJson: any = {};
  
  if (fs.existsSync(packageJsonPath)) {
    packageJson = await fs.readJson(packageJsonPath);
  }
  
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };
  
  return {
    name: packageJson.name || path.basename(process.cwd()),
    framework: detectFramework(dependencies),
    typescript: fs.existsSync(tsConfigPath),
    styling: detectStyling(dependencies),
    uiLibrary: detectUILibrary(dependencies),
  };
}

function detectFramework(dependencies: Record<string, string>): ProjectConfig['framework'] {
  if (dependencies.next) return 'next';
  if (dependencies.vite) return 'vite';
  if (dependencies.react) return 'react';
  return 'other';
}

function detectStyling(dependencies: Record<string, string>): ProjectConfig['styling'] {
  if (dependencies.tailwindcss) return 'tailwind';
  if (dependencies.sass || dependencies.scss) return 'scss';
  if (dependencies['styled-components']) return 'styled-components';
  if (dependencies['@emotion/react']) return 'emotion';
  return 'css';
}

function detectUILibrary(dependencies: Record<string, string>): ProjectConfig['uiLibrary'] {
  if (dependencies['@chakra-ui/react']) return 'chakra';
  if (dependencies['@mantine/core']) return 'mantine';
  if (dependencies.antd) return 'antd';
  return 'none';
}

async function gatherUserPreferences(
  detected: Partial<ProjectConfig>,
  options: InitOptions
): Promise<ProjectConfig> {
  if (options.template) {
    return getTemplateConfig(options.template, detected);
  }
  
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'What framework are you using?',
      choices: [
        { name: 'React', value: 'react' },
        { name: 'Next.js', value: 'next' },
        { name: 'Vite', value: 'vite' },
        { name: 'Other', value: 'other' },
      ],
      default: detected.framework || 'react',
    },
    {
      type: 'confirm',
      name: 'typescript',
      message: 'Are you using TypeScript?',
      default: detected.typescript ?? true,
    },
    {
      type: 'list',
      name: 'styling',
      message: 'What styling solution are you using?',
      choices: [
        { name: 'CSS', value: 'css' },
        { name: 'SCSS/Sass', value: 'scss' },
        { name: 'Tailwind CSS', value: 'tailwind' },
        { name: 'Styled Components', value: 'styled-components' },
        { name: 'Emotion', value: 'emotion' },
      ],
      default: detected.styling || 'css',
    },
    {
      type: 'list',
      name: 'uiLibrary',
      message: 'Are you using a UI library?',
      choices: [
        { name: 'None', value: 'none' },
        { name: 'shadcn/ui', value: 'shadcn' },
        { name: 'Chakra UI', value: 'chakra' },
        { name: 'Mantine', value: 'mantine' },
        { name: 'Ant Design', value: 'antd' },
      ],
      default: detected.uiLibrary || 'none',
    },
    {
      type: 'list',
      name: 'theme',
      message: 'Default theme preference?',
      choices: [
        { name: 'Auto (system preference)', value: 'auto' },
        { name: 'Light', value: 'light' },
        { name: 'Dark', value: 'dark' },
      ],
      default: 'auto',
    },
    {
      type: 'confirm',
      name: 'animations',
      message: 'Enable animations?',
      default: true,
    },
  ]);
  
  return {
    name: detected.name || 'my-app',
    ...answers,
  };
}

function getTemplateConfig(template: string, detected: Partial<ProjectConfig>): ProjectConfig {
  const templates: Record<string, Partial<ProjectConfig>> = {
    react: {
      framework: 'react',
      typescript: true,
      styling: 'css',
      uiLibrary: 'none',
      theme: 'auto',
      animations: true,
    },
    next: {
      framework: 'next',
      typescript: true,
      styling: 'css',
      uiLibrary: 'shadcn',
      theme: 'auto',
      animations: true,
    },
    vite: {
      framework: 'vite',
      typescript: true,
      styling: 'css',
      uiLibrary: 'none',
      theme: 'auto',
      animations: true,
    },
  };
  
  return {
    name: detected.name || 'my-app',
    ...templates[template],
    ...detected,
  } as ProjectConfig;
}

function generateConfig(config: ProjectConfig) {
  return {
    ...defaultConfig,
    theme: {
      ...defaultConfig.theme,
      default: config.theme === 'auto' ? 'light' : config.theme,
      autoDetect: config.theme === 'auto',
    },
    components: {
      ...defaultConfig.components,
      typescript: config.typescript,
    },
    animations: {
      ...defaultConfig.animations,
      enabled: config.animations,
    },
    integrations: {
      uiLibrary: config.uiLibrary === 'none' ? null : config.uiLibrary,
      styling: config.styling,
    },
  };
}

async function installDependencies(config: ProjectConfig, spinner: Ora) {
  const packages = ['@designers/core', '@designers/react'];
  
  if (config.animations) {
    packages.push('@designers/animations');
  }
  
  spinner.start('Installing Designers packages...');
  
  try {
    const packageManager = detectPackageManager();
    const installCommand = `${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} ${packages.join(' ')}`;
    
    execSync(installCommand, { stdio: 'pipe' });
    spinner.succeed('Packages installed successfully');
  } catch (error) {
    spinner.warn('Package installation failed - you can install manually');
    console.log(chalk.yellow(`Run: npm install ${packages.join(' ')}`));
  }
}

function detectPackageManager(): string {
  if (fs.existsSync('yarn.lock')) return 'yarn';
  if (fs.existsSync('pnpm-lock.yaml')) return 'pnpm';
  return 'npm';
}

async function generateInitialFiles(config: ProjectConfig, spinner: Ora) {
  spinner.start('Generating initial files...');
  
  // Generate provider setup file
  const providerTemplate = generateProviderTemplate(config);
  const providerPath = path.join(process.cwd(), 'src', 'providers', 'design-system.tsx');
  
  await fs.ensureDir(path.dirname(providerPath));
  await fs.writeFile(providerPath, providerTemplate);
  
  // Generate example component
  const exampleTemplate = generateExampleComponent(config);
  const examplePath = path.join(process.cwd(), 'src', 'components', 'example.tsx');
  
  await fs.ensureDir(path.dirname(examplePath));
  await fs.writeFile(examplePath, exampleTemplate);
  
  spinner.succeed('Initial files generated');
}

function generateProviderTemplate(config: ProjectConfig): string {
  return `import React from 'react';
import { DesignSystemProvider } from '@designers/react';

export function AppDesignSystemProvider({ children }: { children: React.ReactNode }) {
  return (
    <DesignSystemProvider
      config={{
        theme: '${config.theme === 'auto' ? 'light' : config.theme}',
        autoDetectColorScheme: ${config.theme === 'auto'},
        autoDetectBreakpoint: true,
        injectGlobalStyles: true,
      }}
    >
      {children}
    </DesignSystemProvider>
  );
}
`;
}

function generateExampleComponent(config: ProjectConfig): string {
  return `import React from 'react';
import { useDesignTokens, useResponsive, useColorScheme } from '@designers/react';

export function ExampleComponent() {
  const { colors, spacing, typography } = useDesignTokens();
  const { state } = useResponsive();
  const { toggleTheme, isDark } = useColorScheme();

  return (
    <div
      style={{
        backgroundColor: colors.semantic.background.primary,
        color: colors.semantic.text.primary,
        padding: spacing[6],
        fontFamily: typography.fontFamily.sans.join(', '),
      }}
    >
      <h1 style={typography.heading.h1}>
        Welcome to Designers!
      </h1>

      <p style={typography.body.base}>
        Current breakpoint: {state.breakpoint}
      </p>

      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: colors.semantic.interactive.primary,
          color: colors.semantic.text.inverse,
          border: 'none',
          padding: \`\${spacing[2]} \${spacing[4]}\`,
          borderRadius: '0.375rem',
          cursor: 'pointer',
        }}
      >
        Switch to {isDark ? 'light' : 'dark'} mode
      </button>
    </div>
  );
}
`;
}
