/**
 * Responsive breakpoint system with mobile-first approach
 */

export interface Breakpoint {
  min: string;
  max?: string;
  cols?: number;
  gutter?: string;
}

export interface BreakpointSystem {
  xs: Breakpoint;
  sm: Breakpoint;
  md: Breakpoint;
  lg: Breakpoint;
  xl: Breakpoint;
  '2xl': Breakpoint;
}

export interface ContainerSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// Mobile-first breakpoints
export const breakpoints: BreakpointSystem = {
  xs: {
    min: '0px',
    max: '639px',
    cols: 4,
    gutter: '1rem',
  },
  sm: {
    min: '640px',
    max: '767px',
    cols: 8,
    gutter: '1.5rem',
  },
  md: {
    min: '768px',
    max: '1023px',
    cols: 8,
    gutter: '2rem',
  },
  lg: {
    min: '1024px',
    max: '1279px',
    cols: 12,
    gutter: '2rem',
  },
  xl: {
    min: '1280px',
    max: '1535px',
    cols: 12,
    gutter: '2.5rem',
  },
  '2xl': {
    min: '1536px',
    cols: 12,
    gutter: '3rem',
  },
};

// Container max-widths
export const containerSizes: ContainerSizes = {
  xs: '100%',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Media query utilities
export function getMediaQuery(breakpoint: keyof BreakpointSystem): string {
  return `@media (min-width: ${breakpoints[breakpoint].min})`;
}

export function getMediaQueryMax(breakpoint: keyof BreakpointSystem): string {
  const bp = breakpoints[breakpoint];
  if (!bp.max) {
    throw new Error(`Breakpoint ${breakpoint} does not have a max value`);
  }
  return `@media (max-width: ${bp.max})`;
}

export function getMediaQueryBetween(
  minBreakpoint: keyof BreakpointSystem,
  maxBreakpoint: keyof BreakpointSystem
): string {
  const minBp = breakpoints[minBreakpoint];
  const maxBp = breakpoints[maxBreakpoint];
  
  if (!maxBp.max) {
    throw new Error(`Breakpoint ${maxBreakpoint} does not have a max value`);
  }
  
  return `@media (min-width: ${minBp.min}) and (max-width: ${maxBp.max})`;
}

// Container query utilities
export function getContainerQuery(size: string): string {
  return `@container (min-width: ${size})`;
}

// Responsive value utilities
export type ResponsiveValue<T> = T | Partial<Record<keyof BreakpointSystem, T>>;

export function getResponsiveValue<T>(
  value: ResponsiveValue<T>,
  breakpoint: keyof BreakpointSystem
): T | undefined {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return (value as Partial<Record<keyof BreakpointSystem, T>>)[breakpoint];
  }
  return value as T;
}

// Grid system utilities
export interface GridConfig {
  columns: number;
  gutter: string;
  margin: string;
}

export function getGridConfig(breakpoint: keyof BreakpointSystem): GridConfig {
  const bp = breakpoints[breakpoint];
  return {
    columns: bp.cols || 12,
    gutter: bp.gutter || '1rem',
    margin: bp.gutter || '1rem',
  };
}

// Fluid typography and spacing utilities
export function getFluidValue(
  minValue: number,
  maxValue: number,
  minViewport: keyof BreakpointSystem = 'sm',
  maxViewport: keyof BreakpointSystem = 'xl',
  unit: string = 'rem'
): string {
  const minVw = parseFloat(breakpoints[minViewport].min);
  const maxVw = parseFloat(breakpoints[maxViewport].min);
  
  const slope = (maxValue - minValue) / (maxVw - minVw);
  const yAxisIntersection = -minVw * slope + minValue;
  
  return `clamp(${minValue}${unit}, ${yAxisIntersection.toFixed(4)}${unit} + ${(slope * 100).toFixed(4)}vw, ${maxValue}${unit})`;
}

// Aspect ratio utilities for responsive design
export const aspectRatios = {
  square: '1 / 1',
  video: '16 / 9',
  cinema: '21 / 9',
  portrait: '3 / 4',
  landscape: '4 / 3',
  ultrawide: '32 / 9',
} as const;

export type AspectRatio = keyof typeof aspectRatios;

// Device detection utilities (for use with CSS)
export const deviceQueries = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  touch: '(hover: none) and (pointer: coarse)',
  mouse: '(hover: hover) and (pointer: fine)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  darkMode: '(prefers-color-scheme: dark)',
  lightMode: '(prefers-color-scheme: light)',
  highContrast: '(prefers-contrast: high)',
} as const;

export type DeviceQuery = keyof typeof deviceQueries;

export function getDeviceQuery(query: DeviceQuery): string {
  return `@media ${deviceQueries[query]}`;
}

export type BreakpointKey = keyof BreakpointSystem;
