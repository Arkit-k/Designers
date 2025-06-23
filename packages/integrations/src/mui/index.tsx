/**
 * Material-UI integration for Designers
 */

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Card, TextField, Chip, Alert, Avatar } from '@mui/material';
import type { ComponentDefinition, UILibraryAdapter } from '../types';
import { useDesignTokens } from '@designers/react';

// MUI Theme Generator
export function createMUITheme(designTokens: any) {
  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: designTokens.colors.primary[500],
        light: designTokens.colors.primary[300],
        dark: designTokens.colors.primary[700],
      },
      secondary: {
        main: designTokens.colors.secondary[500],
        light: designTokens.colors.secondary[300],
        dark: designTokens.colors.secondary[700],
      },
      error: {
        main: designTokens.colors.error[500],
        light: designTokens.colors.error[300],
        dark: designTokens.colors.error[700],
      },
      warning: {
        main: designTokens.colors.warning[500],
        light: designTokens.colors.warning[300],
        dark: designTokens.colors.warning[700],
      },
      success: {
        main: designTokens.colors.success[500],
        light: designTokens.colors.success[300],
        dark: designTokens.colors.success[700],
      },
      background: {
        default: designTokens.semantic.background.primary,
        paper: designTokens.semantic.background.secondary,
      },
      text: {
        primary: designTokens.semantic.text.primary,
        secondary: designTokens.semantic.text.secondary,
      },
    },
    typography: {
      fontFamily: designTokens.typography.fontFamily.sans.join(', '),
      h1: {
        fontSize: designTokens.typography.fontSize['4xl'],
        fontWeight: designTokens.typography.fontWeight.bold,
      },
      h2: {
        fontSize: designTokens.typography.fontSize['3xl'],
        fontWeight: designTokens.typography.fontWeight.semibold,
      },
      body1: {
        fontSize: designTokens.typography.fontSize.base,
        lineHeight: designTokens.typography.lineHeight.normal,
      },
    },
    spacing: 8, // Base spacing unit
    shape: {
      borderRadius: parseInt(designTokens.effects.borderRadius.md),
    },
  });
}

// MUI Provider Component
export function MUIProvider({ children }: { children: React.ReactNode }) {
  const designTokens = useDesignTokens();
  const theme = createMUITheme(designTokens);
  
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

// Component definitions for the registry
export const muiComponents: Record<string, ComponentDefinition> = {
  Button: {
    component: Button,
    library: 'mui',
    category: 'form',
    variants: {
      contained: { variant: 'contained' },
      outlined: { variant: 'outlined' },
      text: { variant: 'text' },
    },
    sizes: {
      small: { size: 'small' },
      medium: { size: 'medium' },
      large: { size: 'large' },
    },
    tags: ['button', 'interactive', 'form'],
  },
  Card: {
    component: Card,
    library: 'mui',
    category: 'layout',
    variants: {
      elevation: { elevation: 2 },
      outlined: { variant: 'outlined' },
    },
    tags: ['card', 'container', 'layout'],
  },
  TextField: {
    component: TextField,
    library: 'mui',
    category: 'form',
    variants: {
      outlined: { variant: 'outlined' },
      filled: { variant: 'filled' },
      standard: { variant: 'standard' },
    },
    sizes: {
      small: { size: 'small' },
      medium: { size: 'medium' },
    },
    tags: ['input', 'form', 'text'],
  },
  Chip: {
    component: Chip,
    library: 'mui',
    category: 'display',
    variants: {
      filled: { variant: 'filled' },
      outlined: { variant: 'outlined' },
    },
    sizes: {
      small: { size: 'small' },
      medium: { size: 'medium' },
    },
    tags: ['chip', 'tag', 'label'],
  },
};

// MUI adapter
export const muiAdapter: UILibraryAdapter = {
  name: 'mui',
  transformProps: (props, definition) => {
    // MUI uses specific prop names, so we might need to transform
    return props;
  },
  generateTheme: (designTokens) => {
    return createMUITheme(designTokens);
  },
  setupProvider: (config) => {
    return MUIProvider;
  },
};

// Export individual components
export {
  Button as MUIButton,
  Card as MUICard,
  TextField as MUITextField,
  Chip as MUIChip,
  Alert as MUIAlert,
  Avatar as MUIAvatar,
};
