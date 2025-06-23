# Designers

A complete, lightweight, headless design system for React applications with automatic Tailwind CSS integration.

## Quick Start

```bash
npm install designers
```

This single package includes everything you need:

- **Core design tokens and utilities**
- **React components and hooks**
- **Animation utilities (Framer Motion & GSAP)**
- **UI library integrations (shadcn, MUI, Chakra UI, Mantine)**
- **Tailwind CSS plugin**
- **CLI for project initialization**

## Usage

### Initialize a new project

```bash
npx designers init
```

### Import everything

```typescript
import designers from 'designers';

// Access individual modules
const { core, react, animations, integrations, tailwindPlugin, cli } = designers;
```

### Import specific modules

```typescript
// Core design tokens
import { tokens, createTheme } from 'designers/core';

// React components and hooks
import { useTheme, ThemeProvider } from 'designers/react';

// Animations
import { fadeIn, slideUp } from 'designers/animations';

// UI integrations
import { shadcnIntegration } from 'designers/integrations';

// Tailwind plugin
import tailwindPlugin from 'designers/tailwind-plugin';
```

### Tailwind CSS Integration

Add the plugin to your `tailwind.config.js`:

```javascript
module.exports = {
  plugins: [
    require('designers/tailwind-plugin')
  ]
}
```

## Individual Packages

If you prefer to install packages individually:

- `designers-core` - Core design tokens and utilities
- `designers-react` - React components and hooks  
- `designers-animations` - Animation utilities
- `designers-integrations` - UI library integrations
- `designers-tailwind-plugin` - Tailwind CSS plugin
- `designers-cli` - Command-line interface

## Features

### 🎨 Design Tokens
- Comprehensive color palettes
- Typography scales
- Spacing systems
- Responsive breakpoints

### ⚛️ React Components
- Headless, unstyled components
- Full TypeScript support
- Accessibility built-in
- Customizable themes

### 🎬 Animations
- Framer Motion presets
- GSAP utilities
- Performance optimized
- Easy-to-use APIs

### 🔌 UI Library Integration
- **shadcn/ui** - Seamless integration
- **Material-UI** - Theme mapping
- **Chakra UI** - Token synchronization
- **Mantine** - Style system bridge

### 🎯 Tailwind CSS Plugin
- Automatic token injection
- Custom utilities
- Responsive variants
- Dark mode support

## Documentation

Visit our [documentation site](https://designers-docs.example.com) for:

- Complete API reference
- Usage examples
- Migration guides
- Best practices

## Examples

Check out the `/examples` directory for:

- Basic usage
- Complete workflow
- UI library integrations
- Custom theming

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## License

MIT © arkit karmokar
