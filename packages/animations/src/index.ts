/**
 * @designers/animations - Animation primitives and utilities
 * 
 * Provides unified animation system supporting both Framer Motion and GSAP
 * with design system integration and accessibility features.
 */

// Core animation system
export * from './core/animation-provider';
export * from './core/animation-registry';
export * from './core/animation-config';

// Framer Motion integration
export * from './framer/framer-animations';
export * from './framer/framer-presets';
export * from './framer/framer-hooks';

// GSAP integration  
export * from './gsap/gsap-animations';
export * from './gsap/gsap-presets';
export * from './gsap/gsap-hooks';

// Shared utilities
export * from './utils/animation-utils';
export * from './utils/accessibility';
export * from './utils/performance';

// Types
export type {
  AnimationConfig,
  AnimationPreset,
  AnimationLibrary,
  MotionVariants,
  GSAPTimeline,
  AnimationOptions,
} from './types';

// Version
export const version = '0.1.0';
