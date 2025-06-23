# Tailwind CSS Integration with Designers

The Designers design system provides **seamless Tailwind CSS integration** that automatically generates your `tailwind.config.js` from your `designers.config.json`. No manual configuration needed!

## 🚀 Quick Setup

### 1. Initialize Designers
```bash
npx designers init
```

### 2. Setup Tailwind Integration
```bash
npx designers tailwind
```

This command:
- ✅ Generates `tailwind.config.js` from your `designers.config.json`
- ✅ Creates component classes (`.btn-primary`, `.card-elevated`, etc.)
- ✅ Adds semantic utility classes (`.text-semantic-primary`, `.bg-semantic-secondary`)
- ✅ Sets up CSS custom properties for theme switching
- ✅ Configures automatic regeneration when config changes

### 3. Add Tailwind to Your CSS
```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Use in Your Components
```tsx
// Automatic component classes from designers.config.json
<button className="btn-primary btn-md">Primary Button</button>
<div className="card-elevated card-lg">Elevated Card</div>

// Semantic utilities that adapt to light/dark themes
<div className="bg-semantic-primary text-semantic-primary">
  Theme-aware content
</div>

// All your design tokens as Tailwind utilities
<div className="p-4 text-lg font-medium rounded-lg shadow-md">
  Using design system tokens
</div>
```

## 🎯 How It Works

### Automatic Config Generation

Your `designers.config.json`:
```json
{
  "theme": {
    "themes": {
      "light": {
        "colors": {
          "primary": { "500": "#3b82f6" },
          "gray": { "500": "#6b7280" }
        },
        "semantic": {
          "text": { "primary": "#111827" },
          "background": { "primary": "#ffffff" }
        }
      }
    }
  },
  "spacing": {
    "scale": {
      "4": "1rem",
      "6": "1.5rem"
    }
  },
  "components": {
    "library": {
      "button": {
        "variants": {
          "primary": {
            "backgroundColor": "semantic.interactive.primary",
            "color": "semantic.text.inverse"
          }
        },
        "sizes": {
          "md": {
            "padding": "spacing.2 spacing.4"
          }
        }
      }
    }
  }
}
```

Automatically generates this `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 500: '#3b82f6' },
        gray: { 500: '#6b7280' },
        semantic: {
          text: { primary: 'var(--designers-semantic-text-primary)' },
          background: { primary: 'var(--designers-semantic-background-primary)' }
        }
      },
      spacing: {
        '4': '1rem',
        '6': '1.5rem'
      }
    }
  },
  plugins: [
    require('@designers/tailwind-plugin')({
      prefix: 'designers',
      components: { /* your component definitions */ }
    })
  ]
};
```

### Component Classes

The plugin automatically generates component classes:

```css
/* Generated from your designers.config.json */
.btn {
  @apply inline-flex items-center justify-center font-medium transition-all duration-200;
}

.btn-primary {
  background-color: var(--designers-semantic-interactive-primary);
  color: var(--designers-semantic-text-inverse);
}

.btn-primary:hover {
  background-color: var(--designers-semantic-interactive-primary-hover);
}

.btn-md {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
```

### Semantic Utilities

Theme-aware utility classes:

```css
/* Light theme */
:root {
  --designers-semantic-text-primary: #111827;
  --designers-semantic-background-primary: #ffffff;
}

/* Dark theme */
[data-theme="dark"] {
  --designers-semantic-text-primary: #f3f4f6;
  --designers-semantic-background-primary: #111827;
}

/* Utility classes */
.text-semantic-primary { color: var(--designers-semantic-text-primary); }
.bg-semantic-primary { background-color: var(--designers-semantic-background-primary); }
```

## 🎨 Usage Examples

### Component Classes
```tsx
// Button variants from your config
<button className="btn-primary btn-lg">Large Primary</button>
<button className="btn-secondary btn-sm">Small Secondary</button>
<button className="btn-outline btn-md">Medium Outline</button>

// Card variants
<div className="card-default card-md">Default Card</div>
<div className="card-elevated card-lg">Elevated Card</div>

// Input variants
<input className="input-default input-md" />
<input className="input-error input-sm" />
```

### Semantic Colors
```tsx
// Text colors that adapt to theme
<h1 className="text-semantic-primary">Primary heading</h1>
<p className="text-semantic-secondary">Secondary text</p>
<span className="text-semantic-tertiary">Tertiary text</span>

// Background colors
<div className="bg-semantic-primary">Primary background</div>
<div className="bg-semantic-secondary">Secondary background</div>

// Interactive colors
<button className="bg-interactive-primary hover:bg-interactive-primary-hover">
  Interactive button
</button>
```

### Design Tokens
```tsx
// All your spacing, typography, colors available as Tailwind utilities
<div className="p-6 text-lg font-semibold rounded-lg shadow-md bg-primary-500 text-white">
  Using design system tokens
</div>

// Responsive design with your breakpoints
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  Responsive grid
</div>
```

## 🔄 Automatic Updates

### Watch Mode
```bash
# Auto-regenerate Tailwind config when designers.config.json changes
npx designers tailwind --watch
```

### Manual Regeneration
```bash
# Regenerate Tailwind config
npx designers export tailwind

# Or use the tailwind command
npx designers tailwind --merge
```

## 🎯 Advanced Features

### Custom Component Classes

Add to your `designers.config.json`:
```json
{
  "components": {
    "library": {
      "badge": {
        "variants": {
          "success": {
            "backgroundColor": "colors.success.500",
            "color": "semantic.text.inverse"
          },
          "warning": {
            "backgroundColor": "colors.warning.500",
            "color": "semantic.text.primary"
          }
        },
        "sizes": {
          "sm": { "padding": "spacing.1 spacing.2", "fontSize": "typography.fontSize.xs" },
          "md": { "padding": "spacing.1.5 spacing.3", "fontSize": "typography.fontSize.sm" }
        }
      }
    }
  }
}
```

Use in your components:
```tsx
<span className="badge-success badge-sm">Success</span>
<span className="badge-warning badge-md">Warning</span>
```

### Theme Switching

```tsx
import { useColorScheme } from '@designers/react';

function ThemeToggle() {
  const { toggleTheme, isDark } = useColorScheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className="btn-secondary btn-md"
    >
      {isDark ? '☀️' : '🌙'} Toggle theme
    </button>
  );
}

// The semantic classes automatically adapt!
<div className="bg-semantic-primary text-semantic-primary p-6">
  This content adapts to the current theme
</div>
```

### Responsive Components

```json
{
  "components": {
    "library": {
      "container": {
        "variants": {
          "responsive": {
            "padding": {
              "sm": "spacing.4",
              "md": "spacing.6", 
              "lg": "spacing.8"
            }
          }
        }
      }
    }
  }
}
```

## 🛠️ Configuration Options

### Tailwind Plugin Options

```js
// tailwind.config.js
module.exports = {
  plugins: [
    require('@designers/tailwind-plugin')({
      prefix: 'designers',           // CSS variable prefix
      generateUtilities: true,      // Generate semantic utilities
      generateComponents: true,     // Generate component classes
      components: { /* config */ }, // Component definitions
    })
  ]
};
```

### CLI Options

```bash
# Setup with custom output path
npx designers tailwind --output ./config/tailwind.config.js

# Merge with existing config
npx designers tailwind --merge

# Watch for changes
npx designers tailwind --watch

# Export just the config
npx designers export tailwind --output ./tailwind.config.js
```

## 🎉 Benefits

✅ **Zero Configuration**: No manual Tailwind setup needed
✅ **Automatic Sync**: Config stays in sync with your design system
✅ **Theme Support**: Built-in light/dark mode with CSS variables
✅ **Component Classes**: Auto-generated from your component definitions
✅ **Semantic Utilities**: Theme-aware utility classes
✅ **Type Safety**: Full TypeScript support
✅ **Performance**: Optimized CSS generation
✅ **Developer Experience**: Hot reloading and watch mode

## 🚀 Migration from Manual Tailwind

If you have an existing `tailwind.config.js`:

1. **Backup your config**: `cp tailwind.config.js tailwind.config.backup.js`
2. **Setup Designers**: `npx designers init`
3. **Migrate your tokens** to `designers.config.json`
4. **Generate new config**: `npx designers tailwind --merge`
5. **Update your components** to use semantic classes
6. **Test thoroughly** and remove old config

The integration provides a seamless bridge between your design system and Tailwind CSS, eliminating the need for manual configuration while providing powerful automation and theme support.
