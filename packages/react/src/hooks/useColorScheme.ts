/**
 * useColorScheme - Hook for color scheme detection and management
 */

import { useState, useEffect, useCallback } from 'react';
import type { ColorTheme } from '@designers/core';
import { useDesignSystemContext } from '../providers/DesignSystemProvider';

export interface ColorSchemeState {
  theme: ColorTheme;
  systemTheme: ColorTheme;
  isDark: boolean;
  isLight: boolean;
  isSystemDark: boolean;
  isSystemLight: boolean;
  isAuto: boolean;
}

export interface ColorSchemeUtilities {
  // Current state
  state: ColorSchemeState;
  
  // Theme management
  theme: ColorTheme;
  setTheme: (theme: ColorTheme | 'auto') => void;
  toggleTheme: () => void;
  
  // System detection
  systemTheme: ColorTheme;
  prefersColorScheme: ColorTheme;
  
  // Utilities
  isDark: boolean;
  isLight: boolean;
  
  // Storage
  saveToStorage: boolean;
  setSaveToStorage: (save: boolean) => void;
}

const STORAGE_KEY = 'designers-color-scheme';

/**
 * Hook for color scheme detection and management
 */
export function useColorScheme(): ColorSchemeUtilities {
  const { theme: contextTheme, setTheme: setContextTheme } = useDesignSystemContext();
  
  const [systemTheme, setSystemTheme] = useState<ColorTheme>(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  
  const [isAuto, setIsAuto] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'auto' || stored === null;
  });
  
  const [saveToStorage, setSaveToStorageState] = useState(true);

  // Detect system color scheme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme: ColorTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
      
      // If in auto mode, update the context theme
      if (isAuto) {
        setContextTheme(newSystemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isAuto, setContextTheme]);

  // Load theme from storage on mount
  useEffect(() => {
    if (typeof window === 'undefined' || !saveToStorage) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (stored === 'auto' || stored === null) {
      setIsAuto(true);
      setContextTheme(systemTheme);
    } else if (stored === 'light' || stored === 'dark') {
      setIsAuto(false);
      setContextTheme(stored as ColorTheme);
    }
  }, [saveToStorage, systemTheme, setContextTheme]);

  // Save theme to storage when it changes
  useEffect(() => {
    if (typeof window === 'undefined' || !saveToStorage) return;

    if (isAuto) {
      localStorage.setItem(STORAGE_KEY, 'auto');
    } else {
      localStorage.setItem(STORAGE_KEY, contextTheme);
    }
  }, [contextTheme, isAuto, saveToStorage]);

  const setTheme = useCallback((theme: ColorTheme | 'auto') => {
    if (theme === 'auto') {
      setIsAuto(true);
      setContextTheme(systemTheme);
    } else {
      setIsAuto(false);
      setContextTheme(theme);
    }
  }, [systemTheme, setContextTheme]);

  const toggleTheme = useCallback(() => {
    if (isAuto) {
      // If auto, switch to opposite of current system theme
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      // If manual, toggle between light and dark
      setTheme(contextTheme === 'dark' ? 'light' : 'dark');
    }
  }, [isAuto, systemTheme, contextTheme, setTheme]);

  const setSaveToStorage = useCallback((save: boolean) => {
    setSaveToStorageState(save);
    
    if (!save && typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Computed state
  const state: ColorSchemeState = {
    theme: contextTheme,
    systemTheme,
    isDark: contextTheme === 'dark',
    isLight: contextTheme === 'light',
    isSystemDark: systemTheme === 'dark',
    isSystemLight: systemTheme === 'light',
    isAuto,
  };

  return {
    state,
    theme: contextTheme,
    setTheme,
    toggleTheme,
    systemTheme,
    prefersColorScheme: systemTheme,
    isDark: contextTheme === 'dark',
    isLight: contextTheme === 'light',
    saveToStorage,
    setSaveToStorage,
  };
}

/**
 * Hook for simple theme detection
 */
export function useTheme(): ColorTheme {
  const { theme } = useColorScheme();
  return theme;
}

/**
 * Hook for checking if current theme is dark
 */
export function useIsDark(): boolean {
  const { isDark } = useColorScheme();
  return isDark;
}

/**
 * Hook for checking if current theme is light
 */
export function useIsLight(): boolean {
  const { isLight } = useColorScheme();
  return isLight;
}

/**
 * Hook for theme toggle functionality
 */
export function useThemeToggle(): {
  theme: ColorTheme;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
} {
  const { theme, toggleTheme, isDark, isLight } = useColorScheme();
  
  return {
    theme,
    toggleTheme,
    isDark,
    isLight,
  };
}

/**
 * Hook for system color scheme detection
 */
export function useSystemColorScheme(): ColorTheme {
  const { systemTheme } = useColorScheme();
  return systemTheme;
}

/**
 * Hook for checking if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for checking if user prefers high contrast
 */
export function usePrefersHighContrast(): boolean {
  const [prefersHighContrast, setPrefersHighContrast] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-contrast: high)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    const handleChange = (e: MediaQueryListEvent) => setPrefersHighContrast(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersHighContrast;
}
