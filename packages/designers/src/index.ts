/**
 * Designers - A complete, lightweight, headless design system for React applications
 *
 * This is the main entry point that re-exports all the individual packages
 * for convenient access when using `npm install designers`
 */

// Re-export everything from core package
export * from 'designers-core';

// Re-export everything from react package
export * from 'designers-react';

// Re-export the tailwind plugin
export { default as tailwindPlugin } from 'designers-tailwind-plugin';

// Import and re-export animations and integrations with proper handling
import animationsModule from 'designers-animations';
import integrationsModule from 'designers-integrations';
import cliModule from 'designers-cli';

// Re-export as named exports
export const animations = animationsModule;
export const integrations = integrationsModule;
export const cli = cliModule;

// Default export for convenience
import * as core from 'designers-core';
import * as react from 'designers-react';
import tailwindPlugin from 'designers-tailwind-plugin';

export default {
  core,
  react,
  animations: animationsModule,
  integrations: integrationsModule,
  tailwindPlugin,
  cli: cliModule,
};

// Version information
export const version = '2.0.0';

// Package information
export const packages = {
  'designers-core': '2.0.0',
  'designers-cli': '2.0.0',
  'designers-react': '2.0.0',
  'designers-animations': '2.0.0',
  'designers-integrations': '2.0.0',
  'designers-tailwind-plugin': '2.0.0',
} as const;
