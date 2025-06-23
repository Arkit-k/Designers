/**
 * @designers/cli - Command-line interface for Designers design system
 * 
 * Provides CLI tools for:
 * - Project initialization with designers.config.json
 * - Component generation
 * - Theme management
 * - Token export to various formats
 * - Code scaffolding
 */

export { initCommand } from './commands/init';
export { generateCommand } from './commands/generate';
export { exportCommand } from './commands/export';
export { themeCommand } from './commands/theme';

// Version
export const version = '0.1.0';
