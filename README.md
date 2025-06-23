# Designers - Headless Design System

A lightweight, headless design system for React applications that provides structured design tokens, adaptive layouts, and seamless UI library integration while remaining completely framework-agnostic.

## 🚀 Features

- **🎨 Comprehensive Design Tokens**: Colors, typography, spacing, shadows, effects, and animations
- **📱 Responsive by Default**: Mobile-first breakpoints with automatic detection
- **🌙 Advanced Theme Modes**: Light, Dark, Midnight (SaaS-style), and System modes with seamless switching
- **🌌 Premium Effects**: Glass morphism, floating orbs, and glow effects in Midnight mode
- **⚡ Performance Focused**: Tree-shakeable, minimal runtime overhead, optimized for production
- **🔧 TypeScript Native**: Full type safety, IntelliSense support, and auto-completion
- **🎯 Framework Agnostic**: Works with any UI library (shadcn, MUI, Chakra, Mantine) or custom components
- **🪝 React Hooks**: Powerful hooks for responsive design, theming, and state management
- **🎨 Tailwind Integration**: Automatic `tailwind.config.js` generation from your design system
- **🔧 CLI-Driven**: Complete workflow automation from `designers.config.json`
- **🎭 Animation System**: Built-in support for Framer Motion and GSAP with accessibility features
- **🔄 Hot Reload**: Real-time design token updates during development

## 📦 Packages

This monorepo contains six specialized packages:

- **`@designers/core`** - Core design tokens, utilities, and theme engine
- **`@designers/react`** - React hooks, providers, and components
- **`@designers/cli`** - Command-line tools for project setup and code generation
- **`@designers/animations`** - Animation primitives for Framer Motion and GSAP
- **`@designers/tailwind-plugin`** - Tailwind CSS plugin for automatic integration
- **`@designers/integrations`** - Pre-built integrations for popular UI libraries

## 🏗️ Installation

### Quick Start (Recommended)

```bash
# Initialize a new project with Designers
npx @designers/cli init

# Or install manually
npm install @designers/core @designers/react
```

### Full Installation

```bash
# Core packages (required)
npm install @designers/core @designers/react

# Optional packages
npm install @designers/animations        # For animations
npm install @designers/tailwind-plugin  # For Tailwind CSS integration
npm install @designers/integrations     # For UI library integrations
```

## 🎯 Quick Start

### 1. Initialize Your Design System

```bash
# Create a new project with Designers (interactive setup)
npx @designers/cli init

# Or use a template for faster setup
npx @designers/cli init --template react    # React template
npx @designers/cli init --template next     # Next.js template
npx @designers/cli init --template vite     # Vite template

# Setup automatic Tailwind CSS integration
npx @designers/cli tailwind

# Generate your first component
npx @designers/cli generate component Button
```

### 2. Setup the Design System Provider

```tsx
import React from 'react';
import { DesignSystemProvider } from '@designers/react';

function App() {
  return (
    <DesignSystemProvider
      config={{
        theme: 'light', // 'light' | 'dark' | 'auto'
        autoDetectColorScheme: true,
        autoDetectBreakpoint: true,
        injectGlobalStyles: true,
        respectReducedMotion: true,
      }}
    >
      <YourApp />
    </DesignSystemProvider>
  );
}

export default App;
```

### 3. Use Design Tokens in Components

```tsx
import React from 'react';
import { useDesignTokens } from '@designers/react';

function MyComponent() {
  const { colors, spacing, typography, effects } = useDesignTokens();

  return (
    <div
      style={{
        backgroundColor: colors.semantic.background.primary,
        color: colors.semantic.text.primary,
        padding: spacing[6],
        fontFamily: typography.fontFamily.sans.join(', '),
        borderRadius: effects.borderRadius.lg,
        boxShadow: effects.shadows.md,
      }}
    >
      <h1 style={typography.heading.h1}>
        Welcome to Designers!
      </h1>
      <p style={typography.body.base}>
        Your design system is now active and ready to use.
      </p>
    </div>
  );
}
```

### 4. Create Your First Component

```tsx
import React from 'react';
import { useDesignTokens, useColorScheme } from '@designers/react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ variant = 'primary', size = 'md', children, onClick }: ButtonProps) {
  const { colors, spacing, typography, effects } = useDesignTokens();
  const { isDark } = useColorScheme();

  const variants = {
    primary: {
      backgroundColor: colors.semantic.interactive.primary,
      color: colors.semantic.text.inverse,
      border: 'none',
    },
    secondary: {
      backgroundColor: colors.semantic.interactive.secondary,
      color: colors.semantic.text.primary,
      border: `1px solid ${colors.semantic.border.primary}`,
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.semantic.interactive.primary,
      border: `1px solid ${colors.semantic.interactive.primary}`,
    },
  };

  const sizes = {
    sm: { padding: `${spacing[1]} ${spacing[3]}`, fontSize: typography.fontSize.sm },
    md: { padding: `${spacing[2]} ${spacing[4]}`, fontSize: typography.fontSize.base },
    lg: { padding: `${spacing[3]} ${spacing[6]}`, fontSize: typography.fontSize.lg },
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...variants[variant],
        ...sizes[size],
        fontFamily: typography.fontFamily.sans.join(', '),
        borderRadius: effects.borderRadius.md,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontWeight: 500,
      }}
    >
      {children}
    </button>
  );
}

export default Button;
```

## 🎨 Core Concepts

### Design Tokens

Design tokens are the foundation of your design system. They define colors, typography, spacing, and other design decisions in a structured, reusable format.

```tsx
// Your designers.config.json defines tokens like:
{
  "theme": {
    "themes": {
      "light": {
        "colors": {
          "primary": { "500": "#3b82f6" },
          "gray": { "100": "#f3f4f6", "900": "#111827" }
        },
        "semantic": {
          "text": { "primary": "#111827", "secondary": "#374151" },
          "background": { "primary": "#ffffff", "secondary": "#f9fafb" }
        }
      }
    }
  }
}

// Access them in React:
const { colors } = useDesignTokens();
console.log(colors.primary[500]); // "#3b82f6"
console.log(colors.semantic.text.primary); // "#111827" (light) or "#f9fafb" (dark)
```

### Responsive Design

```tsx
import { useResponsive } from '@designers/react';

function ResponsiveComponent() {
  const { state, resolve, isBreakpointUp } = useResponsive();

  // Resolve values based on current breakpoint
  const padding = resolve({
    xs: spacing[2],    // 0.5rem on mobile
    md: spacing[4],    // 1rem on tablet
    lg: spacing[6],    // 1.5rem on desktop
  });

  // Conditional rendering based on breakpoint
  const layout = resolve({
    xs: 'vertical',
    lg: 'horizontal',
  });

  return (
    <div style={{ padding }} className={`layout-${layout}`}>
      <h2>Current breakpoint: {state.breakpoint}</h2>

      {/* Conditional content */}
      {state.isMobile && <MobileNavigation />}
      {state.isTablet && <TabletLayout />}
      {state.isDesktop && <DesktopSidebar />}

      {/* Responsive utilities */}
      {isBreakpointUp('md') && <AdvancedFeatures />}
    </div>
  );
}
```

### Tailwind CSS Integration (Zero Config!)

After running `npx @designers/cli tailwind`, your design tokens automatically become Tailwind utilities:

```tsx
function TailwindExample() {
  return (
    <div className="bg-semantic-background-primary text-semantic-text-primary">
      {/* Your design tokens as Tailwind classes */}
      <h1 className="text-primary-500 text-heading-h1 font-sans-primary">
        Heading using design tokens
      </h1>

      {/* Component classes generated from your config */}
      <button className="btn-primary btn-md">
        Primary Button
      </button>

      <div className="card-elevated card-lg">
        <p className="text-body-base text-semantic-text-secondary">
          Card with elevation and semantic colors
        </p>
      </div>

      {/* Responsive utilities */}
      <div className="p-2 md:p-4 lg:p-6">
        Responsive padding using your spacing scale
      </div>
    </div>
  );
}
```

### Advanced Theme Modes

Designers now supports four distinct theme modes with premium visual effects:

```tsx
import { ThemeModeProvider, useThemeMode, ThemeModeSelector } from '@designers/react';

function App() {
  return (
    <ThemeModeProvider
      config={{
        defaultMode: 'midnight',
        enableSystemDetection: true,
        enableTransitions: true,
        transitionDuration: 300,
      }}
    >
      <YourApp />
    </ThemeModeProvider>
  );
}

function ThemeControls() {
  const { themeMode, setThemeMode, resolvedTheme } = useThemeMode();

  return (
    <div>
      <p>Current mode: {themeMode}</p>
      <p>Resolved theme: {resolvedTheme}</p>

      {/* Pre-built theme selector component */}
      <ThemeModeSelector
        variant="dropdown"
        showLabels={true}
        showDescriptions={true}
        showPreviews={true}
      />

      {/* Manual theme switching */}
      <button onClick={() => setThemeMode('light')}>Light Mode</button>
      <button onClick={() => setThemeMode('dark')}>Dark Mode</button>
      <button onClick={() => setThemeMode('midnight')}>Midnight Mode</button>
      <button onClick={() => setThemeMode('system')}>System Mode</button>
    </div>
  );
}
```

#### Available Theme Modes

1. **🌞 Light Mode**
   - Clean, bright interface
   - High contrast for readability
   - Professional appearance
   - Perfect for daytime use

2. **🌙 Dark Mode**
   - Traditional dark theme
   - Easy on the eyes
   - Reduced blue light
   - Modern aesthetic

3. **🌌 Midnight Mode** (Premium SaaS-style)
   - Deep black backgrounds
   - Vibrant blue accents
   - Floating animated orbs
   - Glass morphism effects
   - Glow effects on interactive elements
   - Premium visual experience

4. **💻 System Mode**
   - Automatically follows OS preference
   - Seamless switching
   - Respects user's system settings

#### Theme Mode Selector Component

```tsx
import { ThemeModeSelector } from '@designers/react';

// Dropdown variant (default)
<ThemeModeSelector
  variant="dropdown"
  showLabels={true}
  showDescriptions={true}
  showPreviews={true}
  size="md"
/>

// Button group variant
<ThemeModeSelector
  variant="buttons"
  showLabels={false}
  size="sm"
/>

// Tab variant
<ThemeModeSelector
  variant="tabs"
  showLabels={true}
  size="lg"
/>
```

### Legacy Theme Management

For backward compatibility, the original theme management is still available:

```tsx
import { useColorScheme } from '@designers/react';

function LegacyThemeControls() {
  const {
    theme,           // 'light' | 'dark' | 'auto'
    resolvedTheme,   // 'light' | 'dark' (actual theme being used)
    toggleTheme,     // Function to toggle between light/dark
    setTheme,        // Function to set specific theme
    isDark,          // Boolean for current theme
    systemTheme      // System preference
  } = useColorScheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <p>System preference: {systemTheme}</p>

      <button onClick={toggleTheme}>
        Switch to {isDark ? 'light' : 'dark'} mode
      </button>

      <button onClick={() => setTheme('auto')}>
        Use system preference
      </button>
    </div>
  );
}
```

## 🔧 CLI Commands

The Designers CLI provides powerful commands for managing your design system:

### Initialize Project

```bash
# Interactive setup with prompts
npx @designers/cli init

# Use specific template
npx @designers/cli init --template next
npx @designers/cli init --template react
npx @designers/cli init --template vite

# Force overwrite existing config
npx @designers/cli init --force

# Skip package installation
npx @designers/cli init --skip-install
```

### Generate Components

```bash
# Generate a new component
npx @designers/cli generate component Button

# Generate with specific output directory
npx @designers/cli generate component Card --output ./src/components

# Generate theme files
npx @designers/cli generate theme dark-theme

# Generate design tokens
npx @designers/cli generate tokens
```

### Export Design Tokens

```bash
# Export to CSS variables
npx @designers/cli export css --output ./src/styles/tokens.css

# Export to TypeScript
npx @designers/cli export ts --output ./src/tokens.ts

# Export to JSON
npx @designers/cli export json --output ./tokens.json

# Export Tailwind config
npx @designers/cli export tailwind --output ./tailwind.config.js

# Export specific theme
npx @designers/cli export css --theme dark --output ./dark-theme.css
```

### Tailwind Integration

```bash
# Setup Tailwind CSS integration
npx @designers/cli tailwind

# Watch for changes and update Tailwind config
npx @designers/cli tailwind --watch

# Merge with existing Tailwind config
npx @designers/cli tailwind --merge
```

### Import UI Libraries

```bash
# Import shadcn/ui components
npx @designers/cli import --library shadcn --components Button Card Input

# Import all components from a library
npx @designers/cli import --library chakra

# Import with custom output directory
npx @designers/cli import --library mantine --output ./src/ui

# Import with theme integration
npx @designers/cli import --library mui --theme inherit
```

### Complete Design System

```bash
# Generate a complete design system
npx @designers/cli complete

# Include specific elements
npx @designers/cli complete --include colors typography spacing

# Exclude certain elements
npx @designers/cli complete --exclude animations effects
```

## 🎨 Design Token Reference

### Colors

```tsx
import { useDesignTokens } from '@designers/react';

function ColorExample() {
  const { colors } = useDesignTokens();

  return (
    <div>
      {/* Base color palette */}
      <div style={{ backgroundColor: colors.primary[500] }}>Primary 500</div>
      <div style={{ backgroundColor: colors.secondary[600] }}>Secondary 600</div>
      <div style={{ backgroundColor: colors.gray[100] }}>Gray 100</div>

      {/* Semantic colors (theme-aware) */}
      <div style={{
        backgroundColor: colors.semantic.background.primary,
        color: colors.semantic.text.primary
      }}>
        Semantic colors adapt to light/dark themes
      </div>

      {/* Interactive states */}
      <button style={{
        backgroundColor: colors.semantic.interactive.primary,
        color: colors.semantic.text.inverse
      }}>
        Interactive Primary
      </button>
    </div>
  );
}
```

### Typography

```tsx
import { useDesignTokens } from '@designers/react';

function TypographyExample() {
  const { typography } = useDesignTokens();

  return (
    <div>
      {/* Font families */}
      <h1 style={{ fontFamily: typography.fontFamily.sans.join(', ') }}>
        Sans-serif heading
      </h1>
      <code style={{ fontFamily: typography.fontFamily.mono.join(', ') }}>
        Monospace code
      </code>

      {/* Semantic typography scales */}
      <h1 style={typography.heading.h1}>Heading 1</h1>
      <h2 style={typography.heading.h2}>Heading 2</h2>
      <p style={typography.body.base}>Body text</p>
      <small style={typography.body.small}>Small text</small>

      {/* Font sizes */}
      <p style={{ fontSize: typography.fontSize.lg }}>Large text</p>
      <p style={{ fontSize: typography.fontSize.base }}>Base text</p>
      <p style={{ fontSize: typography.fontSize.sm }}>Small text</p>
    </div>
  );
}
```

### Spacing & Layout

```tsx
import { useDesignTokens } from '@designers/react';

function SpacingExample() {
  const { spacing, getSpacing } = useDesignTokens();

  return (
    <div>
      {/* Direct spacing values */}
      <div style={{ padding: spacing[4] }}>Padding 4 (1rem)</div>
      <div style={{ margin: spacing[8] }}>Margin 8 (2rem)</div>

      {/* Dynamic spacing */}
      <div style={{ padding: getSpacing(12) }}>Dynamic padding</div>

      {/* Responsive spacing */}
      <div style={{
        padding: `${spacing[2]} ${spacing[4]}`,
        margin: `${spacing[6]} auto`
      }}>
        Combined spacing values
      </div>
    </div>
  );
}
```

### Effects & Shadows

```tsx
import { useDesignTokens } from '@designers/react';

function EffectsExample() {
  const { effects } = useDesignTokens();

  return (
    <div>
      {/* Shadows */}
      <div style={{ boxShadow: effects.shadows.sm }}>Small shadow</div>
      <div style={{ boxShadow: effects.shadows.md }}>Medium shadow</div>
      <div style={{ boxShadow: effects.shadows.lg }}>Large shadow</div>

      {/* Border radius */}
      <div style={{ borderRadius: effects.borderRadius.sm }}>Small radius</div>
      <div style={{ borderRadius: effects.borderRadius.md }}>Medium radius</div>
      <div style={{ borderRadius: effects.borderRadius.lg }}>Large radius</div>

      {/* Transitions */}
      <div style={{
        transition: effects.transitions.default,
        ':hover': { transform: 'scale(1.05)' }
      }}>
        Hover to see transition
      </div>
    </div>
  );
}
```

## 🔧 Advanced Usage

### Custom Theme Extension

```tsx
import { deepMerge, colorThemes } from '@designers/core';

// Extend existing theme
const customTheme = deepMerge(colorThemes.light, {
  colors: {
    primary: {
      500: '#your-brand-color',
      600: '#your-darker-brand-color',
    },
    custom: {
      accent: '#ff6b6b',
      warning: '#ffd93d',
    },
  },
  typography: {
    fontFamily: {
      brand: ['Your Brand Font', 'sans-serif'],
    },
  },
});

// Use custom theme
function App() {
  return (
    <DesignSystemProvider
      config={{
        customThemes: { custom: customTheme },
        theme: 'custom',
      }}
    >
      <YourApp />
    </DesignSystemProvider>
  );
}
```

### CSS Custom Properties Generation

```tsx
import { generateCSSCustomProperties } from '@designers/core';

// Generate CSS variables for any theme
const lightThemeCSS = generateCSSCustomProperties('light');
const darkThemeCSS = generateCSSCustomProperties('dark');

// Output example:
// :root {
//   --designers-color-primary-500: #3b82f6;
//   --designers-spacing-4: 1rem;
//   --designers-typography-heading-h1-font-size: clamp(1.875rem, 4vw, 3rem);
// }
```

### Media Queries & Responsive Utilities

```tsx
import { useMediaQuery, useResponsive } from '@designers/react';

function ResponsiveComponent() {
  // Custom media queries
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  // Responsive utilities
  const { state, resolve, isBreakpointUp, isBreakpointDown } = useResponsive();

  return (
    <div>
      {/* Conditional rendering */}
      {isMobile && <MobileNavigation />}
      {isBreakpointUp('lg') && <DesktopSidebar />}

      {/* Responsive values */}
      <div style={{
        padding: resolve({
          xs: '1rem',
          md: '2rem',
          lg: '3rem',
        }),
        flexDirection: resolve({
          xs: 'column',
          md: 'row',
        }),
      }}>
        Content adapts to screen size
      </div>

      {/* Accessibility considerations */}
      {!prefersReducedMotion && <AnimatedComponent />}
    </div>
  );
}
```

### Performance Optimization

```tsx
import { memo, useMemo } from 'react';
import { useDesignTokens } from '@designers/react';

// Memoize expensive token calculations
const OptimizedComponent = memo(function OptimizedComponent() {
  const { colors, spacing, typography } = useDesignTokens();

  // Memoize computed styles
  const styles = useMemo(() => ({
    container: {
      backgroundColor: colors.semantic.background.primary,
      padding: spacing[6],
      fontFamily: typography.fontFamily.sans.join(', '),
    },
    heading: {
      ...typography.heading.h2,
      color: colors.semantic.text.primary,
      marginBottom: spacing[4],
    },
  }), [colors, spacing, typography]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Optimized Component</h2>
    </div>
  );
});
```

## 🎭 UI Library Integration

Designers works seamlessly with popular UI libraries through automatic theme mapping and component integration:

### shadcn/ui Integration

```bash
# Setup shadcn/ui with Designers
npx @designers/cli import --library shadcn --components Button Card Input Dialog

# Or setup manually
npx @designers/cli init --template next  # Includes shadcn setup
```

```tsx
import { useDesignTokens } from '@designers/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function ShadcnExample() {
  const { colors } = useDesignTokens();

  return (
    <Card style={{
      '--primary': colors.primary[600],
      '--primary-foreground': colors.semantic.text.inverse,
      '--background': colors.semantic.background.primary,
      '--foreground': colors.semantic.text.primary,
    }}>
      <CardHeader>
        <CardTitle>Themed Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Themed Button</Button>
      </CardContent>
    </Card>
  );
}
```

### Chakra UI Integration

```tsx
import { useDesignTokens } from '@designers/react';
import { extendTheme, ChakraProvider, Button, Box } from '@chakra-ui/react';

function ChakraExample() {
  const { colors, spacing, typography } = useDesignTokens();

  const chakraTheme = extendTheme({
    colors: {
      primary: colors.primary,
      gray: colors.gray,
      semantic: colors.semantic,
    },
    space: spacing,
    fonts: {
      heading: typography.fontFamily.sans.join(', '),
      body: typography.fontFamily.sans.join(', '),
    },
  });

  return (
    <ChakraProvider theme={chakraTheme}>
      <Box bg="semantic.background.primary" p={6}>
        <Button colorScheme="primary">Themed Button</Button>
      </Box>
    </ChakraProvider>
  );
}
```

### Material-UI (MUI) Integration

```tsx
import { useDesignTokens } from '@designers/react';
import { createTheme, ThemeProvider, Button, Card } from '@mui/material';

function MUIExample() {
  const { colors, typography, spacing } = useDesignTokens();

  const muiTheme = createTheme({
    palette: {
      primary: {
        main: colors.primary[500],
        dark: colors.primary[700],
        light: colors.primary[300],
      },
      background: {
        default: colors.semantic.background.primary,
        paper: colors.semantic.background.secondary,
      },
      text: {
        primary: colors.semantic.text.primary,
        secondary: colors.semantic.text.secondary,
      },
    },
    typography: {
      fontFamily: typography.fontFamily.sans.join(', '),
      h1: typography.heading.h1,
      body1: typography.body.base,
    },
    spacing: (factor) => spacing[factor] || `${factor * 0.25}rem`,
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <Card>
        <Button variant="contained" color="primary">
          Themed MUI Button
        </Button>
      </Card>
    </ThemeProvider>
  );
}
```

### Mantine Integration

```tsx
import { useDesignTokens } from '@designers/react';
import { MantineProvider, Button, Card } from '@mantine/core';

function MantineExample() {
  const { colors, spacing, typography } = useDesignTokens();

  const mantineTheme = {
    colors: {
      primary: Object.values(colors.primary),
      gray: Object.values(colors.gray),
    },
    spacing: spacing,
    fontFamily: typography.fontFamily.sans.join(', '),
    headings: {
      fontFamily: typography.fontFamily.sans.join(', '),
    },
  };

  return (
    <MantineProvider theme={mantineTheme}>
      <Card>
        <Button color="primary">Themed Mantine Button</Button>
      </Card>
    </MantineProvider>
  );
}
```

## 🎨 Animation System

Designers includes a comprehensive animation system with support for both Framer Motion and GSAP:

### Framer Motion Integration

```bash
# Install animations package
npm install @designers/animations framer-motion
```

```tsx
import { motion } from 'framer-motion';
import { useDesignTokens, usePrefersReducedMotion } from '@designers/react';
import { fadeInOut, slideInOut } from '@designers/animations/framer';

function AnimatedComponent() {
  const { effects } = useDesignTokens();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      variants={fadeInOut}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: effects.transitions.easing.default
      }}
      style={{
        borderRadius: effects.borderRadius.lg,
        boxShadow: effects.shadows.md,
      }}
    >
      <motion.h2
        variants={slideInOut}
        transition={{ delay: 0.1 }}
      >
        Animated Content
      </motion.h2>
    </motion.div>
  );
}
```

### GSAP Integration

```tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useDesignTokens, usePrefersReducedMotion } from '@designers/react';
import { fadeIn, slideIn } from '@designers/animations/gsap';

function GSAPComponent() {
  const containerRef = useRef(null);
  const { effects } = useDesignTokens();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline();

    tl.fromTo(containerRef.current,
      fadeIn.from,
      { ...fadeIn.to, duration: 0.6 }
    )
    .fromTo('.animated-child',
      slideIn.from,
      { ...slideIn.to, duration: 0.4, stagger: 0.1 },
      '-=0.3'
    );

    return () => tl.kill();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      style={{
        borderRadius: effects.borderRadius.lg,
        boxShadow: effects.shadows.md,
      }}
    >
      <h2 className="animated-child">GSAP Animated Title</h2>
      <p className="animated-child">GSAP Animated Content</p>
    </div>
  );
}
```

### Animation Presets

```tsx
import {
  fadeInOut,
  slideInOut,
  scaleInOut,
  staggerChildren
} from '@designers/animations';

// Use with Framer Motion
<motion.div variants={fadeInOut}>Fade animation</motion.div>
<motion.div variants={slideInOut}>Slide animation</motion.div>
<motion.div variants={scaleInOut}>Scale animation</motion.div>

// Stagger children animations
<motion.div variants={staggerChildren}>
  <motion.div variants={fadeInOut}>Child 1</motion.div>
  <motion.div variants={fadeInOut}>Child 2</motion.div>
  <motion.div variants={fadeInOut}>Child 3</motion.div>
</motion.div>
```

### Accessibility-First Animations

```tsx
import { useDesignTokens, usePrefersReducedMotion } from '@designers/react';
import { motion } from 'framer-motion';

function AccessibleAnimation() {
  const { effects } = useDesignTokens();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Automatically disable animations for users who prefer reduced motion
  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 }
      };

  return (
    <motion.div {...animationProps}>
      <p>This animation respects user preferences</p>
    </motion.div>
  );
}
```

## � Configuration Reference

### designers.config.json

Complete configuration file structure:

```json
{
  "$schema": "https://designers.dev/schema.json",
  "version": "0.1.0",
  "name": "My Design System",
  "description": "Custom design system configuration",

  "theme": {
    "default": "light",
    "autoDetect": true,
    "storage": true,
    "themes": {
      "light": {
        "colors": {
          "primary": { "500": "#3b82f6" },
          "secondary": { "500": "#64748b" }
        },
        "semantic": {
          "text": { "primary": "#111827", "secondary": "#374151" },
          "background": { "primary": "#ffffff", "secondary": "#f9fafb" },
          "border": { "primary": "#e5e7eb", "focus": "#3b82f6" },
          "interactive": { "primary": "#2563eb", "primaryHover": "#1d4ed8" }
        }
      },
      "dark": {
        "colors": {
          "primary": { "500": "#60a5fa" },
          "secondary": { "500": "#94a3b8" }
        },
        "semantic": {
          "text": { "primary": "#f9fafb", "secondary": "#d1d5db" },
          "background": { "primary": "#111827", "secondary": "#1f2937" },
          "border": { "primary": "#374151", "focus": "#60a5fa" },
          "interactive": { "primary": "#3b82f6", "primaryHover": "#60a5fa" }
        }
      }
    }
  },

  "typography": {
    "fontFamily": {
      "sans": ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      "mono": ["JetBrains Mono", "Fira Code", "Consolas", "monospace"]
    },
    "fontSize": {
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem"
    },
    "lineHeight": {
      "tight": "1.25",
      "normal": "1.5",
      "relaxed": "1.75"
    }
  },

  "spacing": {
    "scale": {
      "1": "0.25rem",
      "2": "0.5rem",
      "4": "1rem",
      "6": "1.5rem",
      "8": "2rem"
    }
  },

  "effects": {
    "shadows": {
      "sm": "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
    },
    "borderRadius": {
      "sm": "0.25rem",
      "md": "0.375rem",
      "lg": "0.5rem"
    },
    "transitions": {
      "default": "all 0.2s ease",
      "fast": "all 0.1s ease",
      "slow": "all 0.3s ease"
    }
  },

  "responsive": {
    "autoDetect": true,
    "breakpoints": {
      "sm": { "min": "640px" },
      "md": { "min": "768px" },
      "lg": { "min": "1024px" },
      "xl": { "min": "1280px" }
    }
  },

  "tokens": {
    "prefix": "designers",
    "output": "./src/styles/tokens",
    "formats": ["css", "ts", "json"]
  },

  "components": {
    "output": "./src/components/ui",
    "typescript": true,
    "library": {
      "button": {
        "variants": {
          "primary": {
            "backgroundColor": "semantic.interactive.primary",
            "color": "semantic.text.inverse"
          }
        },
        "sizes": {
          "sm": { "padding": "spacing.1 spacing.3" },
          "md": { "padding": "spacing.2 spacing.4" }
        }
      }
    }
  },

  "animations": {
    "enabled": true,
    "respectReducedMotion": true,
    "library": "framer-motion"
  },

  "integrations": {
    "uiLibrary": "shadcn",
    "styling": "tailwind"
  }
}
```

## �🛠️ Development & Contributing

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-org/designers.git
cd designers

# Install dependencies
npm install

# Build all packages
npm run build

# Run in development mode
npm run dev

# Run tests
npm run test

# Lint code
npm run lint

# Type check
npm run type-check
```

### Package Scripts

```bash
# Build specific package
npm run build --workspace=@designers/core

# Test specific package
npm run test --workspace=@designers/react

# Lint specific package
npm run lint --workspace=@designers/cli
```

### Publishing

```bash
# Version packages
npm run changeset

# Build and publish
npm run release
```

## � Links

- **Documentation**: [https://designers.dev](https://designers.dev)
- **GitHub**: [https://github.com/your-org/designers](https://github.com/your-org/designers)
- **npm**: [https://www.npmjs.com/org/designers](https://www.npmjs.com/org/designers)
- **Discord**: [https://discord.gg/designers](https://discord.gg/designers)

## �📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development setup
- Pull request process
- Issue reporting
- Feature requests

## 🙏 Acknowledgments

- Inspired by [Tailwind CSS](https://tailwindcss.com) for utility-first approach
- Built with [TypeScript](https://typescriptlang.org) for type safety
- Powered by [React](https://reactjs.org) for component integration
- Animation support via [Framer Motion](https://framer.com/motion) and [GSAP](https://greensock.com/gsap)

---

Built with ❤️ by the Designers team
