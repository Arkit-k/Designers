import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  external: ['react', '@designers/core'],
  treeshake: true,
  outDir: 'dist',
  esbuildOptions: (options) => {
    options.jsx = 'automatic';
  },
});
