import { defineConfig } from 'tsup';

export default defineConfig([
  // Main library build
  {
    entry: ['src/index.ts'],
    format: ['cjs'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: false,
    external: ['designers-core', 'commander', 'inquirer', 'chalk', 'ora', 'fs-extra', 'handlebars', 'prettier'],
    treeshake: true,
    outDir: 'dist',
  },
  // CLI build with shebang
  {
    entry: ['src/cli.ts'],
    format: ['cjs'],
    dts: false,
    splitting: false,
    sourcemap: true,
    clean: false,
    minify: false,
    external: ['designers-core', 'commander', 'inquirer', 'chalk', 'ora', 'fs-extra', 'handlebars', 'prettier'],
    treeshake: true,
    outDir: 'dist',
    banner: {
      js: '#!/usr/bin/env node',
    },
  },
]);
