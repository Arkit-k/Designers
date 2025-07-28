# UI Library Integration with Designers

The Designers design system provides **seamless integration** with popular UI libraries like shadcn/ui, Material-UI, Chakra UI, and Mantine. Import components directly through your `designers.config.json` and use them with your design system tokens automatically applied.

## 🚀 Quick Start

### 1. Import a UI Library
```bash
# Interactive import
npx designers import

# Import specific library
npx designers import --library shadcn

# Import specific components
npx designers import --library shadcn --components button card input
```

### 2. Use Components with Your Design System
```tsx
import { Button, Card, Input } from './components/ui';

function MyApp() {
  return (
    <Card variant="elevated" size="lg">
      <Input variant="default" size="md" placeholder="Enter text..." />
      <Button variant="primary" size="md">
        Submit
      </Button>
    </Card>
  );
}
```

The components automatically use your design system tokens! 🎉

## 🎯 How It Works

### Automatic Configuration

When you run `npx designers import --library shadcn`, it:

1. **Installs dependencies** automatically
2. **Updates your `designers.config.json`**
3. **Generates component files** with design system integration
4. **Sets up providers** for seamless usage

Your `designers.config.json` gets updated:
```json
{
  "integrations": {
    "uiLibrary": "shadcn"
  },
  "ui": {
    "shadcn": {
      "enabled": true,
      "components": ["button", "card", "input"],
      "theme": "inherit",
      "customizations": {
        "borderRadius": "0.5rem",
        "cssVariables": true
      }
    }
  }
}
```

### Component Generation

Generated components automatically map to your design tokens:

```tsx
// Generated: src/components/ui/button.tsx
import React from 'react';
import { useUIComponent } from '@designers/integrations';

export function Button(props) {
  const Component = useUIComponent('Button');
  return <Component {...props} />;
}
```

### Provider Setup

```tsx
// Generated: src/providers/ui-provider.tsx
import { IntegrationProvider } from '@designers/integrations';
import { shadcnComponents } from '@designers/integrations/shadcn';

export function UIProvider({ children }) {
  return (
    <IntegrationProvider
      library="shadcn"
      components={shadcnComponents}
    >
      {children}
    </IntegrationProvider>
  );
}
```

## 🎨 Supported Libraries

### shadcn/ui
```bash
npx designers import --library shadcn
```

**Features:**
- ✅ Tailwind CSS integration
- ✅ Radix UI primitives
- ✅ CSS variables for theming
- ✅ Full TypeScript support

**Components:** Button, Card, Input, Badge, Alert, Avatar, Checkbox, Dialog, Form, Select, Table, Tabs, Toast

### Material-UI (MUI)
```bash
npx designers import --library mui
```

**Features:**
- ✅ Automatic theme generation
- ✅ Emotion styling integration
- ✅ Material Design components
- ✅ Advanced customization

**Components:** Button, Card, TextField, Chip, Alert, Avatar, Checkbox, Dialog, Menu, Select, Table, Tabs, Snackbar

### Chakra UI
```bash
npx designers import --library chakra
```

**Features:**
- ✅ Theme object generation
- ✅ Style props integration
- ✅ Responsive design utilities
- ✅ Accessibility features

**Components:** Button, Box, Input, Badge, Alert, Avatar, Checkbox, Modal, Menu, Select, Table, Tabs, Toast

### Mantine
```bash
npx designers import --library mantine
```

**Features:**
- ✅ Theme provider integration
- ✅ CSS-in-JS styling
- ✅ Rich component library
- ✅ Hooks integration

**Components:** Button, Card, TextInput, Badge, Alert, Avatar, Checkbox, Modal, Menu, Select, Table, Tabs, Notification

## 🔧 Usage Examples

### Complete App Setup

```tsx
// App.tsx
import { DesignSystemProvider } from '@designers/react';
import { UIProvider } from './providers/ui-provider';
import { MyComponent } from './components/MyComponent';

function App() {
  return (
    <DesignSystemProvider
      config={{
        theme: 'light',
        autoDetectColorScheme: true,
      }}
    >
      <UIProvider>
        <MyComponent />
      </UIProvider>
    </DesignSystemProvider>
  );
}
```

### Using Components

```tsx
// components/MyComponent.tsx
import { Button, Card, Input, Badge } from './ui';
import { useColorScheme } from '@designers/react';

export function MyComponent() {
  const { toggleTheme, isDark } = useColorScheme();
  
  return (
    <Card variant="elevated" size="lg">
      <div className="space-y-4">
        <h2 className="text-semantic-primary text-2xl font-bold">
          Welcome to Designers + shadcn/ui
        </h2>
        
        <Input 
          variant="default" 
          size="md" 
          placeholder="Enter your name..."
        />
        
        <div className="flex gap-2">
          <Button variant="primary" size="md">
            Primary Action
          </Button>
          
          <Button variant="outline" size="md">
            Secondary Action
          </Button>
          
          <Button 
            variant="ghost" 
            size="md"
            onClick={toggleTheme}
          >
            {isDark ? '☀️' : '🌙'} Toggle Theme
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Error</Badge>
        </div>
      </div>
    </Card>
  );
}
```

### Theme-Aware Components

Components automatically adapt to your theme:

```tsx
// Light mode
<Button variant="primary">  // Uses your light theme colors
<Card variant="elevated">   // Light background with shadows

// Dark mode (automatically switches)
<Button variant="primary">  // Uses your dark theme colors  
<Card variant="elevated">   // Dark background with shadows
```

### Custom Variants

Add custom variants in your `designers.config.json`:

```json
{
  "components": {
    "library": {
      "button": {
        "variants": {
          "gradient": {
            "background": "effects.gradients.primary",
            "color": "semantic.text.inverse",
            "border": "none"
          },
          "brand": {
            "backgroundColor": "colors.primary.500",
            "color": "semantic.text.inverse"
          }
        }
      }
    }
  }
}
```

Use custom variants:
```tsx
<Button variant="gradient">Gradient Button</Button>
<Button variant="brand">Brand Button</Button>
```

## 🎨 Advanced Features

### Multiple Libraries

You can use multiple UI libraries together:

```bash
npx designers import --library shadcn --components button card
npx designers import --library mui --components TextField Chip
```

```tsx
import { Button, Card } from './ui/shadcn';
import { TextField, Chip } from './ui/mui';

function MixedComponent() {
  return (
    <Card variant="elevated">
      <TextField variant="outlined" label="Name" />
      <Chip label="shadcn + MUI" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

### Custom Theme Mapping

Override how design tokens map to UI library themes:

```json
{
  "ui": {
    "shadcn": {
      "customizations": {
        "borderRadius": "effects.borderRadius.lg",
        "primaryColor": "colors.primary.600",
        "backgroundColor": "semantic.background.secondary"
      }
    }
  }
}
```

### Component Customization

Extend imported components:

```tsx
// components/ui/custom-button.tsx
import { Button as ShadcnButton } from './button';
import { useDesignTokens } from '@designers/react';

export function CustomButton({ children, ...props }) {
  const { colors } = useDesignTokens();
  
  return (
    <ShadcnButton
      {...props}
      style={{
        boxShadow: `0 0 20px ${colors.primary[500]}40`,
        ...props.style,
      }}
    >
      {children}
    </ShadcnButton>
  );
}
```

### Responsive Components

Use responsive props with imported components:

```tsx
import { useResponsive } from '@designers/react';
import { Button, Card } from './ui';

function ResponsiveComponent() {
  const { resolve } = useResponsive();
  
  const buttonSize = resolve({
    xs: 'sm',
    md: 'md', 
    lg: 'lg',
  });
  
  return (
    <Card variant="default">
      <Button variant="primary" size={buttonSize}>
        Responsive Button
      </Button>
    </Card>
  );
}
```

## 🔄 Updates and Maintenance

### Update Components
```bash
# Re-import with latest versions
npx designers import --library shadcn --force

# Add new components
npx designers import --library shadcn --components dialog sheet
```

### Sync with Design System
```bash
# Regenerate component mappings after updating designers.config.json
npx designers generate components --library shadcn
```

### Remove Library
```bash
# Remove library integration (coming soon)
npx designers remove --library shadcn
```

## 🎯 Benefits

✅ **Zero Configuration**: Import and use immediately
✅ **Automatic Theming**: Components use your design tokens
✅ **Type Safety**: Full TypeScript support
✅ **Theme Switching**: Automatic light/dark mode support
✅ **Consistent API**: Same props across all libraries
✅ **Performance**: Tree-shakeable imports
✅ **Customizable**: Override any aspect through config
✅ **Multiple Libraries**: Use different libraries together

## 🚀 Migration Guide

### From Manual UI Library Setup

1. **Remove manual theme configuration**
2. **Import through Designers**: `npx designers import --library shadcn`
3. **Update imports** to use generated components
4. **Remove manual theme providers**
5. **Use Designers providers** instead

### From Custom Components

1. **Keep existing components** as-is
2. **Import UI library** for new components
3. **Gradually migrate** existing components
4. **Use design tokens** consistently across both

The UI library integration provides a seamless bridge between your design system and popular component libraries, eliminating setup complexity while maintaining full customization control through your `designers.config.json`.
