import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'tailwindcss',
    'framer-motion',
    'gsap',
    '@radix-ui/react-slot',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
    '@mui/material',
    '@emotion/react',
    '@emotion/styled',
    '@chakra-ui/react',
    '@mantine/core',
    '@mantine/hooks'
  ],
});
