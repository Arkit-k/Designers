/**
 * Spacing system with consistent spatial rhythm
 */

export interface SpacingScale {
  0: string;
  px: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
  36: string;
  40: string;
  44: string;
  48: string;
  52: string;
  56: string;
  60: string;
  64: string;
  72: string;
  80: string;
  96: string;
}

export interface SemanticSpacing {
  // Component spacing
  component: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  
  // Layout spacing
  layout: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  
  // Container spacing
  container: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  
  // Inset spacing (padding)
  inset: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  
  // Stack spacing (gap between elements)
  stack: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Base spacing scale (4px base unit)
export const spacing: SpacingScale = {
  0: '0px',
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
};

// Semantic spacing values
export const semanticSpacing: SemanticSpacing = {
  component: {
    xs: spacing[1],    // 4px
    sm: spacing[2],    // 8px
    md: spacing[4],    // 16px
    lg: spacing[6],    // 24px
    xl: spacing[8],    // 32px
  },
  
  layout: {
    xs: spacing[4],    // 16px
    sm: spacing[6],    // 24px
    md: spacing[8],    // 32px
    lg: spacing[12],   // 48px
    xl: spacing[16],   // 64px
    '2xl': spacing[24], // 96px
    '3xl': spacing[32], // 128px
  },
  
  container: {
    xs: spacing[4],    // 16px
    sm: spacing[6],    // 24px
    md: spacing[8],    // 32px
    lg: spacing[12],   // 48px
    xl: spacing[16],   // 64px
    '2xl': spacing[20], // 80px
  },
  
  inset: {
    xs: spacing[2],    // 8px
    sm: spacing[3],    // 12px
    md: spacing[4],    // 16px
    lg: spacing[6],    // 24px
    xl: spacing[8],    // 32px
  },
  
  stack: {
    xs: spacing[1],    // 4px
    sm: spacing[2],    // 8px
    md: spacing[4],    // 16px
    lg: spacing[6],    // 24px
    xl: spacing[8],    // 32px
  },
};

// Utility functions for spacing calculations
export function getSpacing(value: keyof SpacingScale): string {
  return spacing[value];
}

export function getSemanticSpacing(
  category: keyof SemanticSpacing,
  size: string
): string {
  const spacingCategory = semanticSpacing[category] as Record<string, string>;
  return spacingCategory[size] || spacing[4]; // fallback to 16px
}

// Generate spacing multiplier
export function multiplySpacing(
  baseValue: keyof SpacingScale,
  multiplier: number
): string {
  const basePixels = parseFloat(spacing[baseValue]) * 16; // Convert rem to px
  const newPixels = basePixels * multiplier;
  return `${newPixels / 16}rem`; // Convert back to rem
}

// Responsive spacing utility
export function getResponsiveSpacing(
  minSpacing: keyof SpacingScale,
  maxSpacing: keyof SpacingScale,
  minViewport: string = '20rem',
  maxViewport: string = '80rem'
): string {
  return `clamp(${spacing[minSpacing]}, 2vw, ${spacing[maxSpacing]})`;
}

// Grid spacing utilities
export const gridSpacing = {
  gap: {
    xs: spacing[2],    // 8px
    sm: spacing[4],    // 16px
    md: spacing[6],    // 24px
    lg: spacing[8],    // 32px
    xl: spacing[12],   // 48px
  },
  
  gutter: {
    xs: spacing[4],    // 16px
    sm: spacing[6],    // 24px
    md: spacing[8],    // 32px
    lg: spacing[12],   // 48px
    xl: spacing[16],   // 64px
  },
} as const;

export type SpacingKey = keyof SpacingScale;
export type SemanticSpacingCategory = keyof SemanticSpacing;
