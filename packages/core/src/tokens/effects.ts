/**
 * Visual effects system including shadows, gradients, and other effects
 */

export interface ShadowSystem {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}

export interface GradientSystem {
  // Linear gradients
  linear: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    rainbow: string;
    sunset: string;
    ocean: string;
  };
  
  // Radial gradients
  radial: {
    primary: string;
    secondary: string;
    spotlight: string;
    glow: string;
  };
  
  // Conic gradients
  conic: {
    rainbow: string;
    primary: string;
  };
}

export interface BlurSystem {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

export interface BorderRadiusSystem {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

export interface OpacitySystem {
  0: string;
  5: string;
  10: string;
  20: string;
  25: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  75: string;
  80: string;
  90: string;
  95: string;
  100: string;
}

// Shadow system
export const shadows: ShadowSystem = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
};

// Gradient system
export const gradients: GradientSystem = {
  linear: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    warning: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    error: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    rainbow: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
    sunset: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    ocean: 'linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)',
  },
  
  radial: {
    primary: 'radial-gradient(circle at center, #667eea 0%, #764ba2 100%)',
    secondary: 'radial-gradient(circle at center, #f093fb 0%, #f5576c 100%)',
    spotlight: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
    glow: 'radial-gradient(circle at center, rgba(102, 126, 234, 0.4) 0%, transparent 70%)',
  },
  
  conic: {
    rainbow: 'conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)',
    primary: 'conic-gradient(from 0deg, #667eea, #764ba2, #667eea)',
  },
};

// Blur system
export const blur: BlurSystem = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  '3xl': '40px',
};

// Border radius system
export const borderRadius: BorderRadiusSystem = {
  none: '0',
  xs: '0.125rem',   // 2px
  sm: '0.25rem',    // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

// Opacity system
export const opacity: OpacitySystem = {
  0: '0',
  5: '0.05',
  10: '0.1',
  20: '0.2',
  25: '0.25',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  75: '0.75',
  80: '0.8',
  90: '0.9',
  95: '0.95',
  100: '1',
};

// Backdrop filter effects
export const backdropFilters = {
  none: 'none',
  blur: {
    xs: 'blur(2px)',
    sm: 'blur(4px)',
    md: 'blur(8px)',
    lg: 'blur(12px)',
    xl: 'blur(16px)',
    '2xl': 'blur(24px)',
    '3xl': 'blur(40px)',
  },
  brightness: {
    50: 'brightness(0.5)',
    75: 'brightness(0.75)',
    90: 'brightness(0.9)',
    95: 'brightness(0.95)',
    100: 'brightness(1)',
    105: 'brightness(1.05)',
    110: 'brightness(1.1)',
    125: 'brightness(1.25)',
    150: 'brightness(1.5)',
  },
  contrast: {
    50: 'contrast(0.5)',
    75: 'contrast(0.75)',
    100: 'contrast(1)',
    125: 'contrast(1.25)',
    150: 'contrast(1.5)',
    200: 'contrast(2)',
  },
  saturate: {
    0: 'saturate(0)',
    50: 'saturate(0.5)',
    100: 'saturate(1)',
    150: 'saturate(1.5)',
    200: 'saturate(2)',
  },
} as const;

// Animation easing functions
export const easings = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Custom easing curves
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  back: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  
  // Material Design easing
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
} as const;

// Animation durations
export const durations = {
  instant: '0ms',
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '750ms',
  slowest: '1000ms',
} as const;

<<<<<<< HEAD
// Transitions system (combining durations and easings)
export const transitions = {
  duration: durations,
  easing: easings,
  // Common transition combinations
  default: `${durations.normal} ${easings.easeInOut}`,
  fast: `${durations.fast} ${easings.easeOut}`,
  slow: `${durations.slow} ${easings.easeInOut}`,
  bounce: `${durations.normal} ${easings.bounce}`,
  elastic: `${durations.slow} ${easings.elastic}`,
} as const;

// Export radius as an alias for borderRadius for backward compatibility
export const radius = borderRadius;

=======
>>>>>>> 9bd872856b02538a7e95ab9d5ef18ca582331b2c
// Utility functions
export function getShadow(size: keyof ShadowSystem): string {
  return shadows[size];
}

export function getGradient(type: keyof GradientSystem, name: string): string {
  const gradientType = gradients[type] as Record<string, string>;
  return gradientType[name] || gradients.linear.primary;
}

export function getBlur(size: keyof BlurSystem): string {
  return `blur(${blur[size]})`;
}

export function getBorderRadius(size: keyof BorderRadiusSystem): string {
  return borderRadius[size];
}

export function getOpacity(value: keyof OpacitySystem): string {
  return opacity[value];
}

export type ShadowKey = keyof ShadowSystem;
export type GradientType = keyof GradientSystem;
export type BlurKey = keyof BlurSystem;
export type BorderRadiusKey = keyof BorderRadiusSystem;
export type OpacityKey = keyof OpacitySystem;
