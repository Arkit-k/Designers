/**
 * Design System Provider - Main context provider for the design system
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { ColorTheme, BreakpointKey } from '@designers/core';
import { getCurrentBreakpoint, generateCSSCustomProperties } from '@designers/core';

export interface DesignSystemConfig {
  theme: ColorTheme;
  breakpoint?: BreakpointKey;
  autoDetectBreakpoint?: boolean;
  autoDetectColorScheme?: boolean;
  prefix?: string;
  injectGlobalStyles?: boolean;
}

export interface DesignSystemContextValue {
  theme: ColorTheme;
  breakpoint: BreakpointKey;
  setTheme: (theme: ColorTheme) => void;
  setBreakpoint: (breakpoint: BreakpointKey) => void;
  config: DesignSystemConfig;
}

const DesignSystemContext = createContext<DesignSystemContextValue | null>(null);

export interface DesignSystemProviderProps {
  children: ReactNode;
  config?: Partial<DesignSystemConfig>;
}

const defaultConfig: DesignSystemConfig = {
  theme: 'light',
  breakpoint: 'md',
  autoDetectBreakpoint: true,
  autoDetectColorScheme: true,
  prefix: 'designers',
  injectGlobalStyles: true,
};

export function DesignSystemProvider({ 
  children, 
  config: userConfig = {} 
}: DesignSystemProviderProps) {
  const config = { ...defaultConfig, ...userConfig };
  
  const [theme, setThemeState] = useState<ColorTheme>(config.theme);
  const [breakpoint, setBreakpointState] = useState<BreakpointKey>(
    config.breakpoint || 'md'
  );

  // Auto-detect color scheme
  useEffect(() => {
    if (!config.autoDetectColorScheme) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setThemeState(e.matches ? 'dark' : 'light');
    };

    // Set initial theme
    setThemeState(mediaQuery.matches ? 'dark' : 'light');
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [config.autoDetectColorScheme]);

  // Auto-detect breakpoint
  useEffect(() => {
    if (!config.autoDetectBreakpoint) return;

    const handleResize = () => {
      const newBreakpoint = getCurrentBreakpoint(window.innerWidth);
      setBreakpointState(newBreakpoint);
    };

    // Set initial breakpoint
    handleResize();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [config.autoDetectBreakpoint]);

  // Inject global CSS custom properties
  useEffect(() => {
    if (!config.injectGlobalStyles) return;

    const styleId = `${config.prefix}-css-vars`;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = generateCSSCustomProperties(theme);
    
    return () => {
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [theme, config.injectGlobalStyles, config.prefix]);

  const setTheme = (newTheme: ColorTheme) => {
    setThemeState(newTheme);
  };

  const setBreakpoint = (newBreakpoint: BreakpointKey) => {
    setBreakpointState(newBreakpoint);
  };

  const contextValue: DesignSystemContextValue = {
    theme,
    breakpoint,
    setTheme,
    setBreakpoint,
    config,
  };

  return (
    <DesignSystemContext.Provider value={contextValue}>
      {children}
    </DesignSystemContext.Provider>
  );
}

export function useDesignSystemContext(): DesignSystemContextValue {
  const context = useContext(DesignSystemContext);
  
  if (!context) {
    throw new Error(
      'useDesignSystemContext must be used within a DesignSystemProvider'
    );
  }
  
  return context;
}
