/**
 * useResponsive - Hook for responsive design utilities
 */

import { useState, useEffect, useMemo } from 'react';
import { 
  breakpoints, 
  getCurrentBreakpoint, 
  resolveResponsiveValue,
  type BreakpointKey, 
  type ResponsiveValue 
} from '@designers/core';
import { useDesignSystemContext } from '../providers/DesignSystemProvider';

export interface ResponsiveState {
  breakpoint: BreakpointKey;
  width: number;
  height: number;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  orientation: 'portrait' | 'landscape';
}

export interface ResponsiveUtilities {
  // Current responsive state
  state: ResponsiveState;
  
  // Breakpoint utilities
  breakpoint: BreakpointKey;
  isBreakpoint: (bp: BreakpointKey) => boolean;
  isBreakpointUp: (bp: BreakpointKey) => boolean;
  isBreakpointDown: (bp: BreakpointKey) => boolean;
  isBreakpointBetween: (min: BreakpointKey, max: BreakpointKey) => boolean;
  
  // Value resolution
  resolve: <T>(value: ResponsiveValue<T>) => T;
  
  // Media query matching
  matches: (query: string) => boolean;
  
  // Viewport utilities
  viewport: {
    width: number;
    height: number;
    aspectRatio: number;
  };
}

/**
 * Hook for responsive design utilities and breakpoint detection
 */
export function useResponsive(): ResponsiveUtilities {
  const { breakpoint: contextBreakpoint } = useDesignSystemContext();
  
  const [windowSize, setWindowSize] = useState(() => {
    if (typeof window === 'undefined') {
      return { width: 1024, height: 768 }; // SSR fallback
    }
    return { width: window.innerWidth, height: window.innerHeight };
  });
  
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(() => {
    if (typeof window === 'undefined') return 'landscape';
    return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  });

  // Update window size and orientation on resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const newSize = { width: window.innerWidth, height: window.innerHeight };
      setWindowSize(newSize);
      setOrientation(newSize.width > newSize.height ? 'landscape' : 'portrait');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate current breakpoint
  const currentBreakpoint = useMemo(() => {
    return getCurrentBreakpoint(windowSize.width);
  }, [windowSize.width]);

  // Use context breakpoint if auto-detection is disabled
  const breakpoint = contextBreakpoint || currentBreakpoint;

  // Responsive state
  const state = useMemo((): ResponsiveState => {
    const breakpointOrder: BreakpointKey[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = breakpointOrder.indexOf(breakpoint);

    return {
      breakpoint,
      width: windowSize.width,
      height: windowSize.height,
      isXs: breakpoint === 'xs',
      isSm: breakpoint === 'sm',
      isMd: breakpoint === 'md',
      isLg: breakpoint === 'lg',
      isXl: breakpoint === 'xl',
      is2xl: breakpoint === '2xl',
      isMobile: currentIndex <= 1, // xs, sm
      isTablet: currentIndex === 2, // md
      isDesktop: currentIndex >= 3, // lg, xl, 2xl
      isTouch: typeof window !== 'undefined' && 'ontouchstart' in window,
      orientation,
    };
  }, [breakpoint, windowSize, orientation]);

  // Breakpoint utilities
  const isBreakpoint = (bp: BreakpointKey): boolean => breakpoint === bp;
  
  const isBreakpointUp = (bp: BreakpointKey): boolean => {
    const breakpointOrder: BreakpointKey[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = breakpointOrder.indexOf(breakpoint);
    const targetIndex = breakpointOrder.indexOf(bp);
    return currentIndex >= targetIndex;
  };
  
  const isBreakpointDown = (bp: BreakpointKey): boolean => {
    const breakpointOrder: BreakpointKey[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = breakpointOrder.indexOf(breakpoint);
    const targetIndex = breakpointOrder.indexOf(bp);
    return currentIndex <= targetIndex;
  };
  
  const isBreakpointBetween = (min: BreakpointKey, max: BreakpointKey): boolean => {
    return isBreakpointUp(min) && isBreakpointDown(max);
  };

  // Value resolution
  const resolve = <T>(value: ResponsiveValue<T>): T => {
    return resolveResponsiveValue(value, breakpoint);
  };

  // Media query matching
  const matches = (query: string): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  };

  // Viewport utilities
  const viewport = useMemo(() => ({
    width: windowSize.width,
    height: windowSize.height,
    aspectRatio: windowSize.width / windowSize.height,
  }), [windowSize]);

  return {
    state,
    breakpoint,
    isBreakpoint,
    isBreakpointUp,
    isBreakpointDown,
    isBreakpointBetween,
    resolve,
    matches,
    viewport,
  };
}

/**
 * Hook for simple breakpoint detection
 */
export function useBreakpoint(): BreakpointKey {
  const { breakpoint } = useResponsive();
  return breakpoint;
}

/**
 * Hook for checking if current breakpoint matches
 */
export function useBreakpointMatch(target: BreakpointKey): boolean {
  const { isBreakpoint } = useResponsive();
  return isBreakpoint(target);
}

/**
 * Hook for checking if current breakpoint is at or above target
 */
export function useBreakpointUp(target: BreakpointKey): boolean {
  const { isBreakpointUp } = useResponsive();
  return isBreakpointUp(target);
}

/**
 * Hook for checking if current breakpoint is at or below target
 */
export function useBreakpointDown(target: BreakpointKey): boolean {
  const { isBreakpointDown } = useResponsive();
  return isBreakpointDown(target);
}

/**
 * Hook for resolving responsive values
 */
export function useResponsiveValue<T>(value: ResponsiveValue<T>): T {
  const { resolve } = useResponsive();
  return resolve(value);
}

/**
 * Hook for media query matching
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
