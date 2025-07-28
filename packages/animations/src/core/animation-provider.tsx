/**
 * Animation Provider - Main provider for animation system
 */

import React, { createContext, useContext, ReactNode, useMemo, useEffect, useState } from 'react';
import { useDesignTokens } from '@designers/react';
import type { AnimationConfig, AnimationLibrary, AnimationPreset, AnimationContextValue } from '../types';
import { AnimationRegistry } from './animation-registry';
import { defaultAnimationConfig } from './animation-config';
import { checkReducedMotionPreference } from '../utils/accessibility';

const AnimationContext = createContext<AnimationContextValue | null>(null);

export interface AnimationProviderProps {
  children: ReactNode;
  config?: Partial<AnimationConfig>;
  library?: AnimationLibrary;
}

export function AnimationProvider({
  children,
  config = {},
  library = 'framer-motion',
}: AnimationProviderProps) {
  const designTokens = useDesignTokens();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Merge config with defaults
  const animationConfig = useMemo(() => ({
    ...defaultAnimationConfig,
    ...config,
    library,
  }), [config, library]);
  
  // Animation registry
  const registry = useMemo(() => new AnimationRegistry(), []);
  
  // Check for reduced motion preference
  useEffect(() => {
    const checkPreference = () => {
      setPrefersReducedMotion(checkReducedMotionPreference());
    };
    
    checkPreference();
    
    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkPreference);
    
    return () => mediaQuery.removeEventListener('change', checkPreference);
  }, []);
  
  // Register default presets
  useEffect(() => {
    Object.entries(animationConfig.presets).forEach(([name, preset]) => {
      registry.register(name, preset);
    });
  }, [animationConfig.presets, registry]);
  
  const contextValue = useMemo<AnimationContextValue>(() => ({
    config: animationConfig,
    library,
    prefersReducedMotion: prefersReducedMotion && animationConfig.respectReducedMotion,
    
    createAnimation: (presetName: string, options = {}) => {
      const preset = registry.get(presetName);
      if (!preset) {
        console.warn(`Animation preset "${presetName}" not found`);
        return null;
      }
      
      // Return appropriate animation based on library
      if (library === 'framer-motion' || (library === 'both' && preset.framer)) {
        return createFramerAnimation(preset, options, prefersReducedMotion);
      } else if (library === 'gsap' || (library === 'both' && preset.gsap)) {
        return createGSAPAnimation(preset, options, prefersReducedMotion);
      }
      
      return null;
    },
    
    registerPreset: (name: string, preset: AnimationPreset) => {
      registry.register(name, preset);
    },
  }), [animationConfig, library, prefersReducedMotion, registry]);
  
  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation(): AnimationContextValue {
  const context = useContext(AnimationContext);
  
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  
  return context;
}

/**
 * Create Framer Motion animation from preset
 */
function createFramerAnimation(
  preset: AnimationPreset,
  options: any,
  prefersReducedMotion: boolean
) {
  if (!preset.framer) return null;
  
  const { framer } = preset;
  
  // Apply reduced motion fallback
  if (prefersReducedMotion && preset.accessibility?.fallback) {
    return createFramerAnimation(preset.accessibility.fallback, options, false);
  }
  
  // Disable animations if reduced motion is preferred and no fallback
  if (prefersReducedMotion && preset.accessibility?.respectReducedMotion !== false) {
    return {
      initial: framer.animate || {},
      animate: framer.animate || {},
      transition: { duration: 0 },
    };
  }
  
  return {
    initial: framer.initial,
    animate: framer.animate,
    exit: framer.exit,
    variants: framer.variants,
    transition: {
      ...framer.transition,
      duration: options.duration || preset.duration || framer.transition?.duration,
      ease: options.easing || preset.easing || framer.transition?.ease,
      delay: options.delay || framer.transition?.delay,
    },
    whileHover: framer.whileHover,
    whileTap: framer.whileTap,
    whileFocus: framer.whileFocus,
    whileInView: framer.whileInView,
  };
}

/**
 * Create GSAP animation from preset
 */
function createGSAPAnimation(
  preset: AnimationPreset,
  options: any,
  prefersReducedMotion: boolean
) {
  if (!preset.gsap) return null;
  
  const { gsap: gsapPreset } = preset;
  
  // Apply reduced motion fallback
  if (prefersReducedMotion && preset.accessibility?.fallback) {
    return createGSAPAnimation(preset.accessibility.fallback, options, false);
  }
  
  // Disable animations if reduced motion is preferred
  if (prefersReducedMotion && preset.accessibility?.respectReducedMotion !== false) {
    return {
      ...gsapPreset,
      to: { ...gsapPreset.to, duration: 0 },
    };
  }
  
  return {
    from: gsapPreset.from,
    to: {
      ...gsapPreset.to,
      duration: options.duration || preset.duration || gsapPreset.to?.duration,
      ease: options.easing || preset.easing || gsapPreset.to?.ease,
      delay: options.delay || gsapPreset.to?.delay,
      repeat: options.repeat || gsapPreset.to?.repeat,
      yoyo: options.yoyo || gsapPreset.to?.yoyo,
      stagger: options.stagger || gsapPreset.stagger,
    },
    timeline: gsapPreset.timeline,
    trigger: gsapPreset.trigger,
  };
}

/**
 * Hook to get animation presets
 */
export function useAnimationPreset(name: string, options = {}) {
  const { createAnimation } = useAnimation();
  return useMemo(() => createAnimation(name, options), [createAnimation, name, options]);
}

/**
 * Hook to check if animations should be disabled
 */
export function useReducedMotion(): boolean {
  const { prefersReducedMotion } = useAnimation();
  return prefersReducedMotion;
}
