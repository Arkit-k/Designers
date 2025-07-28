/**
 * Chakra UI integration for Designers
 */

import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Button, Box, Input, Badge, Alert, Avatar } from '@chakra-ui/react';
import type { ComponentDefinition, UILibraryAdapter } from '../types';
import { useDesignTokens } from 'designers-react';

// Chakra Theme Generator
export function createChakraTheme(designTokens: any) {
  return extendTheme({
    colors: {
      primary: {
        50: designTokens.colors.primary[50],
        100: designTokens.colors.primary[100],
        200: designTokens.colors.primary[200],
        300: designTokens.colors.primary[300],
        400: designTokens.colors.primary[400],
        500: designTokens.colors.primary[500],
        600: designTokens.colors.primary[600],
        700: designTokens.colors.primary[700],
        800: designTokens.colors.primary[800],
        900: designTokens.colors.primary[900],
      },
      secondary: {
        50: designTokens.colors.secondary[50],
        100: designTokens.colors.secondary[100],
        200: designTokens.colors.secondary[200],
        300: designTokens.colors.secondary[300],
        400: designTokens.colors.secondary[400],
        500: designTokens.colors.secondary[500],
        600: designTokens.colors.secondary[600],
        700: designTokens.colors.secondary[700],
        800: designTokens.colors.secondary[800],
        900: designTokens.colors.secondary[900],
      },
      gray: designTokens.colors.gray,
    },
    fonts: {
      heading: designTokens.typography.fontFamily.sans.join(', '),
      body: designTokens.typography.fontFamily.sans.join(', '),
      mono: designTokens.typography.fontFamily.mono.join(', '),
    },
    fontSizes: {
      xs: designTokens.typography.fontSize.xs,
      sm: designTokens.typography.fontSize.sm,
      md: designTokens.typography.fontSize.base,
      lg: designTokens.typography.fontSize.lg,
      xl: designTokens.typography.fontSize.xl,
      '2xl': designTokens.typography.fontSize['2xl'],
      '3xl': designTokens.typography.fontSize['3xl'],
      '4xl': designTokens.typography.fontSize['4xl'],
    },
    space: {
      1: designTokens.spacing.scale['1'],
      2: designTokens.spacing.scale['2'],
      3: designTokens.spacing.scale['3'],
      4: designTokens.spacing.scale['4'],
      5: designTokens.spacing.scale['5'],
      6: designTokens.spacing.scale['6'],
      8: designTokens.spacing.scale['8'],
      10: designTokens.spacing.scale['10'],
      12: designTokens.spacing.scale['12'],
      16: designTokens.spacing.scale['16'],
      20: designTokens.spacing.scale['20'],
      24: designTokens.spacing.scale['24'],
    },
    radii: {
      none: designTokens.effects.borderRadius.none,
      sm: designTokens.effects.borderRadius.sm,
      md: designTokens.effects.borderRadius.md,
      lg: designTokens.effects.borderRadius.lg,
      xl: designTokens.effects.borderRadius.xl,
      full: designTokens.effects.borderRadius.full,
    },
    shadows: {
      xs: designTokens.effects.shadows.xs,
      sm: designTokens.effects.shadows.sm,
      md: designTokens.effects.shadows.md,
      lg: designTokens.effects.shadows.lg,
      xl: designTokens.effects.shadows.xl,
      '2xl': designTokens.effects.shadows['2xl'],
    },
    components: {
      Button: {
        variants: {
          solid: {
            bg: 'primary.500',
            color: 'white',
            _hover: {
              bg: 'primary.600',
            },
            _active: {
              bg: 'primary.700',
            },
          },
          outline: {
            borderColor: 'primary.500',
            color: 'primary.500',
            _hover: {
              bg: 'primary.50',
            },
          },
          ghost: {
            color: 'primary.500',
            _hover: {
              bg: 'primary.50',
            },
          },
        },
      },
      Input: {
        variants: {
          outline: {
            field: {
              borderColor: 'gray.200',
              _hover: {
                borderColor: 'gray.300',
              },
              _focus: {
                borderColor: 'primary.500',
                boxShadow: `0 0 0 1px ${designTokens.colors.primary[500]}`,
              },
            },
          },
        },
      },
    },
  });
}

// Chakra Provider Component
export function ChakraProvider({ children }: { children: React.ReactNode }) {
  const designTokens = useDesignTokens();
  const theme = createChakraTheme(designTokens);
  
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
}

// Component definitions for the registry
export const chakraComponents: Record<string, ComponentDefinition> = {
  Button: {
    component: Button,
    library: 'chakra',
    category: 'form',
    variants: {
      solid: { variant: 'solid' },
      outline: { variant: 'outline' },
      ghost: { variant: 'ghost' },
      link: { variant: 'link' },
    },
    sizes: {
      xs: { size: 'xs' },
      sm: { size: 'sm' },
      md: { size: 'md' },
      lg: { size: 'lg' },
    },
    tags: ['button', 'interactive', 'form'],
  },
  Box: {
    component: Box,
    library: 'chakra',
    category: 'layout',
    variants: {
      default: {},
    },
    tags: ['box', 'container', 'layout'],
  },
  Input: {
    component: Input,
    library: 'chakra',
    category: 'form',
    variants: {
      outline: { variant: 'outline' },
      filled: { variant: 'filled' },
      flushed: { variant: 'flushed' },
      unstyled: { variant: 'unstyled' },
    },
    sizes: {
      xs: { size: 'xs' },
      sm: { size: 'sm' },
      md: { size: 'md' },
      lg: { size: 'lg' },
    },
    tags: ['input', 'form', 'text'],
  },
  Badge: {
    component: Badge,
    library: 'chakra',
    category: 'display',
    variants: {
      solid: { variant: 'solid' },
      subtle: { variant: 'subtle' },
      outline: { variant: 'outline' },
    },
    sizes: {
      sm: { size: 'sm' },
      md: { size: 'md' },
      lg: { size: 'lg' },
    },
    tags: ['badge', 'status', 'label'],
  },
};

// Chakra adapter
export const chakraAdapter: UILibraryAdapter = {
  name: 'chakra',
  transformProps: (props, definition) => {
    // Chakra uses style props, so we might need to transform
    return props;
  },
  generateTheme: (designTokens) => {
    return createChakraTheme(designTokens);
  },
  setupProvider: (config) => {
    return ChakraProvider;
  },
};

// Export individual components
export {
  Button as ChakraButton,
  Box as ChakraBox,
  Input as ChakraInput,
  Badge as ChakraBadge,
  Alert as ChakraAlert,
  Avatar as ChakraAvatar,
};
