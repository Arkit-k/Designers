/**
 * Theme Mode Provider - Advanced theme management with multiple modes
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'midnight' | 'system';

export interface ThemeModeConfig {
  defaultMode?: ThemeMode;
  storageKey?: string;
  enableSystemDetection?: boolean;
  enableTransitions?: boolean;
  transitionDuration?: number;
}

export interface ThemeModeContextValue {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  resolvedTheme: Exclude<ThemeMode, 'system'>;
  config: Required<ThemeModeConfig>;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

export interface ThemeModeProviderProps {
  children: ReactNode;
  config?: ThemeModeConfig;
}

const defaultConfig: Required<ThemeModeConfig> = {
  defaultMode: 'midnight',
  storageKey: 'designers-theme-mode',
  enableSystemDetection: true,
  enableTransitions: true,
  transitionDuration: 300,
};

export function ThemeModeProvider({ 
  children, 
  config: userConfig = {} 
}: ThemeModeProviderProps) {
  const config = { ...defaultConfig, ...userConfig };
  
  const [themeMode, setThemeModeState] = useState<ThemeMode>(config.defaultMode);
  const [resolvedTheme, setResolvedTheme] = useState<Exclude<ThemeMode, 'system'>>('midnight');

  // Load theme from storage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(config.storageKey) as ThemeMode;
    if (stored && ['light', 'dark', 'midnight', 'system'].includes(stored)) {
      setThemeModeState(stored);
    }
  }, [config.storageKey]);

  // Handle system theme detection
  useEffect(() => {
    if (!config.enableSystemDetection || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateResolvedTheme = () => {
      if (themeMode === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setResolvedTheme(themeMode as Exclude<ThemeMode, 'system'>);
      }
    };

    updateResolvedTheme();
    
    const handleChange = () => {
      if (themeMode === 'system') {
        updateResolvedTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode, config.enableSystemDetection]);

  // Apply theme to document
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'midnight');
    
    // Add current theme class
    root.classList.add(resolvedTheme);
    
    // Add transition class if enabled
    if (config.enableTransitions) {
      root.style.setProperty('--theme-transition-duration', `${config.transitionDuration}ms`);
      root.classList.add('theme-transitioning');
      
      const timer = setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, config.transitionDuration);
      
      return () => clearTimeout(timer);
    }
  }, [resolvedTheme, config.enableTransitions, config.transitionDuration]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    
    // Save to storage
    if (typeof window !== 'undefined') {
      localStorage.setItem(config.storageKey, mode);
    }
    
    // Update resolved theme immediately if not system
    if (mode !== 'system') {
      setResolvedTheme(mode as Exclude<ThemeMode, 'system'>);
    } else if (config.enableSystemDetection && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
    }
  };

  const contextValue: ThemeModeContextValue = {
    themeMode,
    setThemeMode,
    resolvedTheme,
    config,
  };

  return (
    <ThemeModeContext.Provider value={contextValue}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): ThemeModeContextValue {
  const context = useContext(ThemeModeContext);
  
  if (context === undefined) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  
  return context;
}

// CSS injection for theme transitions
export function injectThemeTransitionCSS() {
  if (typeof window === 'undefined') return;

  const styleId = 'designers-theme-transitions';
  let styleElement = document.getElementById(styleId) as HTMLStyleElement;
  
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }
  
  styleElement.textContent = `
    .theme-transitioning,
    .theme-transitioning *,
    .theme-transitioning *:before,
    .theme-transitioning *:after {
      transition: 
        background-color var(--theme-transition-duration, 300ms) ease-in-out,
        border-color var(--theme-transition-duration, 300ms) ease-in-out,
        color var(--theme-transition-duration, 300ms) ease-in-out,
        fill var(--theme-transition-duration, 300ms) ease-in-out,
        stroke var(--theme-transition-duration, 300ms) ease-in-out,
        box-shadow var(--theme-transition-duration, 300ms) ease-in-out !important;
    }
  `;
}

// Auto-inject CSS on module load
if (typeof window !== 'undefined') {
  injectThemeTransitionCSS();
}
