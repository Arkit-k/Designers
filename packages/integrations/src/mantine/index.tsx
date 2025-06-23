/**
 * Mantine integration for Designers
 */

import React from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import { Button, Card, TextInput, Badge, Alert, Avatar } from '@mantine/core';
import type { ComponentDefinition, UILibraryAdapter } from '../types';
import { useDesignTokens } from '@designers/react';

// Mantine Theme Generator
export function createMantineTheme(designTokens: any) {
  return createTheme({
    colorScheme: 'light',
    colors: {
      primary: [
        designTokens.colors.primary[50],
        designTokens.colors.primary[100],
        designTokens.colors.primary[200],
        designTokens.colors.primary[300],
        designTokens.colors.primary[400],
        designTokens.colors.primary[500],
        designTokens.colors.primary[600],
        designTokens.colors.primary[700],
        designTokens.colors.primary[800],
        designTokens.colors.primary[900],
      ],
      secondary: [
        designTokens.colors.secondary[50],
        designTokens.colors.secondary[100],
        designTokens.colors.secondary[200],
        designTokens.colors.secondary[300],
        designTokens.colors.secondary[400],
        designTokens.colors.secondary[500],
        designTokens.colors.secondary[600],
        designTokens.colors.secondary[700],
        designTokens.colors.secondary[800],
        designTokens.colors.secondary[900],
      ],
      gray: [
        designTokens.colors.gray[50],
        designTokens.colors.gray[100],
        designTokens.colors.gray[200],
        designTokens.colors.gray[300],
        designTokens.colors.gray[400],
        designTokens.colors.gray[500],
        designTokens.colors.gray[600],
        designTokens.colors.gray[700],
        designTokens.colors.gray[800],
        designTokens.colors.gray[900],
      ],
    },
    primaryColor: 'primary',
    fontFamily: designTokens.typography.fontFamily.sans.join(', '),
    fontFamilyMonospace: designTokens.typography.fontFamily.mono.join(', '),
    headings: {
      fontFamily: designTokens.typography.fontFamily.sans.join(', '),
      sizes: {
        h1: {
          fontSize: designTokens.typography.fontSize['4xl'],
          fontWeight: designTokens.typography.fontWeight.bold,
        },
        h2: {
          fontSize: designTokens.typography.fontSize['3xl'],
          fontWeight: designTokens.typography.fontWeight.semibold,
        },
        h3: {
          fontSize: designTokens.typography.fontSize['2xl'],
          fontWeight: designTokens.typography.fontWeight.semibold,
        },
      },
    },
    fontSizes: {
      xs: designTokens.typography.fontSize.xs,
      sm: designTokens.typography.fontSize.sm,
      md: designTokens.typography.fontSize.base,
      lg: designTokens.typography.fontSize.lg,
      xl: designTokens.typography.fontSize.xl,
    },
    spacing: {
      xs: designTokens.spacing.scale['1'],
      sm: designTokens.spacing.scale['2'],
      md: designTokens.spacing.scale['4'],
      lg: designTokens.spacing.scale['6'],
      xl: designTokens.spacing.scale['8'],
    },
    radius: {
      xs: designTokens.effects.borderRadius.xs,
      sm: designTokens.effects.borderRadius.sm,
      md: designTokens.effects.borderRadius.md,
      lg: designTokens.effects.borderRadius.lg,
      xl: designTokens.effects.borderRadius.xl,
    },
    shadows: {
      xs: designTokens.effects.shadows.xs,
      sm: designTokens.effects.shadows.sm,
      md: designTokens.effects.shadows.md,
      lg: designTokens.effects.shadows.lg,
      xl: designTokens.effects.shadows.xl,
    },
    components: {
      Button: {
        styles: {
          root: {
            fontWeight: designTokens.typography.fontWeight.medium,
          },
        },
        variants: {
          filled: (theme: any) => ({
            root: {
              backgroundColor: theme.colors.primary[6],
              color: theme.white,
              '&:hover': {
                backgroundColor: theme.colors.primary[7],
              },
            },
          }),
          outline: (theme: any) => ({
            root: {
              borderColor: theme.colors.primary[6],
              color: theme.colors.primary[6],
              '&:hover': {
                backgroundColor: theme.colors.primary[0],
              },
            },
          }),
        },
      },
      TextInput: {
        styles: {
          input: {
            borderColor: designTokens.semantic.border.primary,
            '&:focus': {
              borderColor: designTokens.colors.primary[500],
            },
          },
        },
      },
    },
  });
}

// Mantine Provider Component
export function MantineProviderWrapper({ children }: { children: React.ReactNode }) {
  const designTokens = useDesignTokens();
  const theme = createMantineTheme(designTokens);
  
  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );
}

// Component definitions for the registry
export const mantineComponents: Record<string, ComponentDefinition> = {
  Button: {
    component: Button,
    library: 'mantine',
    category: 'form',
    variants: {
      filled: { variant: 'filled' },
      outline: { variant: 'outline' },
      light: { variant: 'light' },
      subtle: { variant: 'subtle' },
      transparent: { variant: 'transparent' },
    },
    sizes: {
      xs: { size: 'xs' },
      sm: { size: 'sm' },
      md: { size: 'md' },
      lg: { size: 'lg' },
      xl: { size: 'xl' },
    },
    tags: ['button', 'interactive', 'form'],
  },
  Card: {
    component: Card,
    library: 'mantine',
    category: 'layout',
    variants: {
      default: {},
      filled: { variant: 'filled' },
      outline: { variant: 'outline' },
    },
    tags: ['card', 'container', 'layout'],
  },
  TextInput: {
    component: TextInput,
    library: 'mantine',
    category: 'form',
    variants: {
      default: { variant: 'default' },
      filled: { variant: 'filled' },
      unstyled: { variant: 'unstyled' },
    },
    sizes: {
      xs: { size: 'xs' },
      sm: { size: 'sm' },
      md: { size: 'md' },
      lg: { size: 'lg' },
      xl: { size: 'xl' },
    },
    tags: ['input', 'form', 'text'],
  },
  Badge: {
    component: Badge,
    library: 'mantine',
    category: 'display',
    variants: {
      filled: { variant: 'filled' },
      light: { variant: 'light' },
      outline: { variant: 'outline' },
      dot: { variant: 'dot' },
    },
    sizes: {
      xs: { size: 'xs' },
      sm: { size: 'sm' },
      md: { size: 'md' },
      lg: { size: 'lg' },
      xl: { size: 'xl' },
    },
    tags: ['badge', 'status', 'label'],
  },
};

// Mantine adapter
export const mantineAdapter: UILibraryAdapter = {
  name: 'mantine',
  transformProps: (props, definition) => {
    // Mantine uses specific prop names, so we might need to transform
    return props;
  },
  generateTheme: (designTokens) => {
    return createMantineTheme(designTokens);
  },
  setupProvider: (config) => {
    return MantineProviderWrapper;
  },
};

// Export individual components
export {
  Button as MantineButton,
  Card as MantineCard,
  TextInput as MantineTextInput,
  Badge as MantineBadge,
  Alert as MantineAlert,
  Avatar as MantineAvatar,
};
