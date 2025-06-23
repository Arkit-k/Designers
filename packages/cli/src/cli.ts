/**
 * Designers CLI - Command-line interface for the Designers design system
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';
import { generateCommand } from './commands/generate';
import { exportCommand } from './commands/export';
import { themeCommand } from './commands/theme';
import { importCommand } from './commands/import';
import { completeCommand } from './commands/complete';
import { setupTailwindIntegration } from './integrations/tailwind';

const program = new Command();

program
  .name('designers')
  .description('CLI for Designers design system')
  .version('0.1.0');

// ASCII art banner
const banner = `
${chalk.cyan('╔══════════════════════════════════════╗')}
${chalk.cyan('║')}          ${chalk.bold.white('🎨 DESIGNERS')}              ${chalk.cyan('║')}
${chalk.cyan('║')}     ${chalk.gray('Headless Design System')}        ${chalk.cyan('║')}
${chalk.cyan('╚══════════════════════════════════════╝')}
`;

program.addHelpText('beforeAll', banner);

// Init command - Initialize a new project with designers.config.json
program
  .command('init')
  .description('Initialize Designers in your project')
  .option('-f, --force', 'Overwrite existing configuration')
  .option('-t, --template <template>', 'Use a specific template (react, next, vite)')
  .option('--skip-install', 'Skip package installation')
  .action(initCommand);

// Generate command - Generate components and utilities
program
  .command('generate')
  .alias('gen')
  .description('Generate components and utilities')
  .argument('<type>', 'Type to generate (component, theme, tokens)')
  .argument('[name]', 'Name of the item to generate')
  .option('-o, --output <path>', 'Output directory')
  .option('-t, --template <template>', 'Template to use')
  .option('--dry-run', 'Show what would be generated without creating files')
  .action(generateCommand);

// Export command - Export design tokens to various formats
program
  .command('export')
  .description('Export design tokens to different formats')
  .argument('<format>', 'Export format (css, scss, js, ts, json, tailwind)')
  .option('-o, --output <path>', 'Output file path')
  .option('-t, --theme <theme>', 'Theme to export (light, dark, all)', 'all')
  .option('--prefix <prefix>', 'CSS variable prefix', 'designers')
  .action(exportCommand);

// Theme command - Manage themes
program
  .command('theme')
  .description('Manage design system themes')
  .option('-l, --list', 'List available themes')
  .option('-c, --create <name>', 'Create a new theme')
  .option('-e, --extend <theme>', 'Extend an existing theme')
  .option('--preview', 'Preview theme in browser')
  .action(themeCommand);

// Tailwind command - Setup Tailwind CSS integration
program
  .command('tailwind')
  .description('Setup Tailwind CSS integration')
  .option('-o, --output <path>', 'Output path for tailwind.config.js', './tailwind.config.js')
  .option('-w, --watch', 'Watch designers.config.json for changes')
  .option('-m, --merge', 'Merge with existing Tailwind config')
  .action(async (options: any) => {
    try {
      await setupTailwindIntegration({
        outputPath: options.output,
        watch: options.watch,
        merge: options.merge,
      });
    } catch (error: any) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

// Import command - Import UI libraries and components
program
  .command('import')
  .description('Import UI libraries and components')
  .option('-l, --library <library>', 'UI library to import (shadcn, mui, chakra, mantine)')
  .option('-c, --components <components...>', 'Specific components to import')
  .option('-o, --output <path>', 'Output directory for components')
  .option('-t, --theme <theme>', 'Theme integration (inherit, custom)', 'inherit')
  .option('-a, --animation <library>', 'Animation library (framer-motion, gsap, both)', 'framer-motion')
  .option('-f, --force', 'Force overwrite existing files')
  .action(importCommand);

// Add command - Add components from popular libraries
program
  .command('add')
  .description('Add pre-built components')
  .argument('<component>', 'Component to add (button, card, modal, etc.)')
  .option('-l, --library <library>', 'UI library style (shadcn, chakra, mantine)')
  .option('-o, --output <path>', 'Output directory')
  .action(async (component: string, options: any) => {
    console.log(chalk.yellow('🚧 Add command coming soon!'));
    console.log(`Would add ${component} component with ${options.library || 'default'} styling`);
  });

// Complete command - Generate comprehensive design system
program
  .command('complete')
  .description('Complete your design system with all missing elements')
  .option('-f, --force', 'Force overwrite existing files')
  .option('-o, --output <path>', 'Output directory for generated files')
  .option('--include <elements...>', 'Specific elements to include')
  .option('--exclude <elements...>', 'Elements to exclude')
  .action(completeCommand);

// Doctor command - Check project health
program
  .command('doctor')
  .description('Check your Designers setup')
  .action(async () => {
    console.log(chalk.yellow('🚧 Doctor command coming soon!'));
    console.log('Would check:');
    console.log('- Configuration validity');
    console.log('- Package versions');
    console.log('- Theme consistency');
    console.log('- Performance recommendations');
  });

// Error handling
program.exitOverride();

try {
  program.parse();
} catch (err: any) {
  if (err.code === 'commander.help') {
    process.exit(0);
  }
  if (err.code === 'commander.version') {
    process.exit(0);
  }
  console.error(chalk.red('Error:'), err.message);
  process.exit(1);
}

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
