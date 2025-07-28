/**
 * Complete command - Generate a comprehensive design system
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { loadConfig, saveConfig } from '../utils/config-loader';

interface CompleteOptions {
  force?: boolean;
  output?: string;
  include?: string[];
  exclude?: string[];
}

const DESIGN_SYSTEM_ELEMENTS = {
  animations: {
    name: 'Animations & Transitions',
    description: 'Motion design, easing curves, and transition presets',
    files: ['animations.ts', 'transitions.ts'],
  },
  iconography: {
    name: 'Iconography System',
    description: 'Icon library integration, sizes, and stroke weights',
    files: ['icons.ts', 'icon-sets.ts'],
  },
  layout: {
    name: 'Layout System',
    description: 'Grid system, containers, z-index, and aspect ratios',
    files: ['layout.ts', 'grid.ts', 'containers.ts'],
  },
  states: {
    name: 'Interactive States',
    description: 'Hover, focus, active, disabled, loading states',
    files: ['states.ts', 'interactions.ts'],
  },
  content: {
    name: 'Content Guidelines',
    description: 'Images, avatars, logos, and content placeholders',
    files: ['content.ts', 'media.ts'],
  },
  forms: {
    name: 'Form System',
    description: 'Form validation, field sizes, labels, and help text',
    files: ['forms.ts', 'validation.ts'],
  },
  feedback: {
    name: 'Feedback Components',
    description: 'Alerts, toasts, loading states, and progress indicators',
    files: ['feedback.ts', 'notifications.ts'],
  },
  data: {
    name: 'Data Visualization',
    description: 'Tables, charts, and data display components',
    files: ['data.ts', 'charts.ts'],
  },
};

export async function completeCommand(options: CompleteOptions) {
  const spinner = ora();
  
  try {
    console.log(chalk.cyan('\n🎨 Completing your design system...\n'));
    
    // Load current config
    const config = await loadConfig();
    if (!config) {
      throw new Error('designers.config.json not found. Run "npx designers init" first.');
    }
    
    // Get elements to include
    const elements = options.include || await selectElements();
    
    // Update config with missing elements
    spinner.start('Updating configuration...');
    await updateConfigWithElements(config, elements);
    spinner.succeed('Configuration updated');
    
    // Generate TypeScript definitions
    spinner.start('Generating TypeScript definitions...');
    await generateTypeDefinitions(elements, options);
    spinner.succeed('TypeScript definitions generated');
    
    // Generate utility functions
    spinner.start('Generating utility functions...');
    await generateUtilities(elements, options);
    spinner.succeed('Utility functions generated');
    
    // Generate React hooks
    spinner.start('Generating React hooks...');
    await generateReactHooks(elements, options);
    spinner.succeed('React hooks generated');
    
    // Generate documentation
    spinner.start('Generating documentation...');
    await generateDocumentation(elements, options);
    spinner.succeed('Documentation generated');
    
    console.log(chalk.green('\n✅ Design system completed successfully!\n'));
    console.log(chalk.cyan('Added elements:'));
    elements.forEach(element => {
      const info = DESIGN_SYSTEM_ELEMENTS[element as keyof typeof DESIGN_SYSTEM_ELEMENTS];
      console.log(chalk.gray(`  ✓ ${info.name} - ${info.description}`));
    });
    
    console.log(chalk.cyan('\nNext steps:'));
    console.log(chalk.gray('1. Review generated files in src/design-system/'));
    console.log(chalk.gray('2. Import and use the new utilities in your components'));
    console.log(chalk.gray('3. Customize the generated elements in designers.config.json'));
    
  } catch (error: any) {
    spinner.fail('Completion failed');
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

async function selectElements(): Promise<string[]> {
  const { elements } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'elements',
      message: 'Which design system elements would you like to add?',
      choices: [
        { name: 'All elements', value: 'all' },
        new inquirer.Separator(),
        ...Object.entries(DESIGN_SYSTEM_ELEMENTS).map(([key, info]) => ({
          name: `${info.name} - ${info.description}`,
          value: key,
        })),
      ],
      validate: (input) => input.length > 0 || 'Please select at least one element',
    },
  ]);
  
  if (elements.includes('all')) {
    return Object.keys(DESIGN_SYSTEM_ELEMENTS);
  }
  
  return elements;
}

async function updateConfigWithElements(config: any, elements: string[]): Promise<void> {
  // Add missing sections to config
  elements.forEach(element => {
    if (!config[element]) {
      switch (element) {
        case 'animations':
          config.animations = {
            enabled: true,
            respectReducedMotion: true,
            library: 'framer-motion',
            durations: {
              fast: '150ms',
              normal: '300ms',
              slow: '500ms',
            },
            easings: {
              easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
              easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
              easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
          };
          break;
          
        case 'iconography':
          config.iconography = {
            library: 'lucide-react',
            sizes: {
              sm: '16px',
              md: '20px',
              lg: '24px',
            },
            strokeWidth: {
              normal: 1.5,
              medium: 2,
              thick: 2.5,
            },
          };
          break;
          
        case 'layout':
          config.layout = {
            containers: {
              sm: '640px',
              md: '768px',
              lg: '1024px',
              xl: '1280px',
            },
            zIndex: {
              dropdown: 1000,
              modal: 1400,
              toast: 1700,
            },
          };
          break;
          
        case 'states':
          config.states = {
            interactive: {
              hover: { scale: 1.02 },
              active: { scale: 0.98 },
              focus: { outline: '2px solid' },
              disabled: { opacity: 0.5 },
            },
          };
          break;
          
        case 'content':
          config.content = {
            images: {
              aspectRatios: {
                square: '1:1',
                video: '16:9',
                photo: '4:3',
              },
            },
            avatars: {
              sizes: {
                sm: '32px',
                md: '40px',
                lg: '48px',
              },
            },
          };
          break;
          
        case 'forms':
          config.forms = {
            validation: {
              error: { borderColor: 'semantic.border.error' },
              success: { borderColor: 'semantic.border.success' },
            },
            fieldSizes: {
              sm: { height: '32px' },
              md: { height: '40px' },
              lg: { height: '48px' },
            },
          };
          break;
          
        case 'feedback':
          config.feedback = {
            alerts: {
              variants: {
                info: { backgroundColor: 'colors.primary.50' },
                success: { backgroundColor: 'colors.success.50' },
                warning: { backgroundColor: 'colors.warning.50' },
                error: { backgroundColor: 'colors.error.50' },
              },
            },
          };
          break;
          
        case 'data':
          config.data = {
            tables: {
              headerBackground: 'semantic.background.secondary',
              rowHover: 'semantic.background.tertiary',
            },
            charts: {
              colors: [
                'colors.primary.500',
                'colors.secondary.500',
                'colors.success.500',
              ],
            },
          };
          break;
      }
    }
  });
  
  await saveConfig(config);
}

async function generateTypeDefinitions(elements: string[], options: CompleteOptions): Promise<void> {
  const outputDir = options.output || path.join(process.cwd(), 'src', 'design-system', 'types');
  await fs.ensureDir(outputDir);
  
  for (const element of elements) {
    const typeContent = generateElementTypes(element);
    await fs.writeFile(path.join(outputDir, `${element}.ts`), typeContent);
  }
  
  // Generate main types index
  const indexContent = generateTypesIndex(elements);
  await fs.writeFile(path.join(outputDir, 'index.ts'), indexContent);
}

async function generateUtilities(elements: string[], options: CompleteOptions): Promise<void> {
  const outputDir = options.output || path.join(process.cwd(), 'src', 'design-system', 'utils');
  await fs.ensureDir(outputDir);
  
  for (const element of elements) {
    const utilContent = generateElementUtils(element);
    await fs.writeFile(path.join(outputDir, `${element}.ts`), utilContent);
  }
  
  // Generate main utils index
  const indexContent = generateUtilsIndex(elements);
  await fs.writeFile(path.join(outputDir, 'index.ts'), indexContent);
}

async function generateReactHooks(elements: string[], options: CompleteOptions): Promise<void> {
  const outputDir = options.output || path.join(process.cwd(), 'src', 'design-system', 'hooks');
  await fs.ensureDir(outputDir);
  
  for (const element of elements) {
    const hookContent = generateElementHook(element);
    await fs.writeFile(path.join(outputDir, `use${element.charAt(0).toUpperCase() + element.slice(1)}.ts`), hookContent);
  }
  
  // Generate main hooks index
  const indexContent = generateHooksIndex(elements);
  await fs.writeFile(path.join(outputDir, 'index.ts'), indexContent);
}

async function generateDocumentation(elements: string[], options: CompleteOptions): Promise<void> {
  const outputDir = options.output || path.join(process.cwd(), 'docs', 'design-system');
  await fs.ensureDir(outputDir);
  
  for (const element of elements) {
    const docContent = generateElementDocs(element);
    await fs.writeFile(path.join(outputDir, `${element}.md`), docContent);
  }
  
  // Generate main documentation index
  const indexContent = generateDocsIndex(elements);
  await fs.writeFile(path.join(outputDir, 'README.md'), indexContent);
}

function generateElementTypes(element: string): string {
  return `// ${element.charAt(0).toUpperCase() + element.slice(1)} types
export interface ${element.charAt(0).toUpperCase() + element.slice(1)}Config {
  // Add specific types for ${element}
}

export type ${element.charAt(0).toUpperCase() + element.slice(1)}Variant = string;
export type ${element.charAt(0).toUpperCase() + element.slice(1)}Size = string;
`;
}

function generateElementUtils(element: string): string {
  return `// ${element.charAt(0).toUpperCase() + element.slice(1)} utilities
import { useDesignTokens } from '@designers/react';

export function get${element.charAt(0).toUpperCase() + element.slice(1)}Styles(variant: string, size: string) {
  // Implementation for ${element} styles
  return {};
}

export function create${element.charAt(0).toUpperCase() + element.slice(1)}Classes(config: any) {
  // Implementation for ${element} classes
  return {};
}
`;
}

function generateElementHook(element: string): string {
  return `// use${element.charAt(0).toUpperCase() + element.slice(1)} hook
import { useDesignTokens } from '@designers/react';

export function use${element.charAt(0).toUpperCase() + element.slice(1)}() {
  const designTokens = useDesignTokens();
  
  // Implementation for ${element} hook
  
  return {
    // Return ${element} utilities
  };
}
`;
}

function generateElementDocs(element: string): string {
  const info = DESIGN_SYSTEM_ELEMENTS[element as keyof typeof DESIGN_SYSTEM_ELEMENTS];
  
  return `# ${info.name}

${info.description}

## Usage

\`\`\`tsx
import { use${element.charAt(0).toUpperCase() + element.slice(1)} } from '@/design-system/hooks';

function MyComponent() {
  const ${element} = use${element.charAt(0).toUpperCase() + element.slice(1)}();
  
  return (
    <div>
      {/* Use ${element} utilities */}
    </div>
  );
}
\`\`\`

## Configuration

Configure ${element} in your \`designers.config.json\`:

\`\`\`json
{
  "${element}": {
    // Configuration options
  }
}
\`\`\`
`;
}

function generateTypesIndex(elements: string[]): string {
  const exports = elements.map(element => 
    `export * from './${element}';`
  ).join('\n');
  
  return `// Design system types
${exports}
`;
}

function generateUtilsIndex(elements: string[]): string {
  const exports = elements.map(element => 
    `export * from './${element}';`
  ).join('\n');
  
  return `// Design system utilities
${exports}
`;
}

function generateHooksIndex(elements: string[]): string {
  const exports = elements.map(element => 
    `export { use${element.charAt(0).toUpperCase() + element.slice(1)} } from './use${element.charAt(0).toUpperCase() + element.slice(1)}';`
  ).join('\n');
  
  return `// Design system hooks
${exports}
`;
}

function generateDocsIndex(elements: string[]): string {
  const links = elements.map(element => {
    const info = DESIGN_SYSTEM_ELEMENTS[element as keyof typeof DESIGN_SYSTEM_ELEMENTS];
    return `- [${info.name}](./${element}.md) - ${info.description}`;
  }).join('\n');
  
  return `# Design System Documentation

This documentation covers all aspects of your design system.

## Elements

${links}

## Getting Started

1. Import the design system provider
2. Use hooks to access design tokens
3. Apply styles using utilities
4. Customize through designers.config.json
`;
}
