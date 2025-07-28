/**
 * Animation system types
 */

import type { Variants, Transition } from 'framer-motion';
import type { gsap } from 'gsap';

export type AnimationLibrary = 'framer-motion' | 'gsap' | 'both';

export interface AnimationConfig {
  library: AnimationLibrary;
  respectReducedMotion: boolean;
  durations: Record<string, string | number>;
  easings: Record<string, string>;
  presets: Record<string, AnimationPreset>;
  transitions?: Record<string, AnimationPreset>;
}

export interface AnimationPreset {
  library?: AnimationLibrary;
  framer?: FramerAnimationPreset;
  gsap?: GSAPAnimationPreset;
  duration?: string | number;
  easing?: string;
  delay?: number;
  repeat?: number | 'infinite';
  accessibility?: {
    respectReducedMotion?: boolean;
    fallback?: AnimationPreset;
  };
}

export interface FramerAnimationPreset {
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  variants?: Variants;
  transition?: Transition;
  whileHover?: Record<string, any>;
  whileTap?: Record<string, any>;
  whileFocus?: Record<string, any>;
  whileInView?: Record<string, any>;
}

export interface GSAPAnimationPreset {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  timeline?: GSAPTimelineConfig;
  trigger?: ScrollTriggerConfig;
  stagger?: number | gsap.StaggerVars;
}

export interface GSAPTimelineConfig {
  steps: GSAPTimelineStep[];
  defaults?: gsap.TweenVars;
  repeat?: number;
  yoyo?: boolean;
  paused?: boolean;
}

export interface GSAPTimelineStep {
  target: string | Element | Element[];
  vars: gsap.TweenVars;
  position?: string | number;
}

export interface ScrollTriggerConfig {
  trigger: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  snap?: boolean | number | number[];
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export interface AnimationOptions {
  duration?: string | number;
  easing?: string;
  delay?: number;
  repeat?: number | 'infinite';
  yoyo?: boolean;
  stagger?: number;
  respectReducedMotion?: boolean;
}

export interface MotionVariants extends Variants {}

export interface GSAPTimeline {
  timeline: gsap.core.Timeline;
  play: () => void;
  pause: () => void;
  reverse: () => void;
  restart: () => void;
  kill: () => void;
}

export interface AnimationHookReturn {
  animate: (target: string | Element, options?: AnimationOptions) => void;
  timeline: GSAPTimeline | null;
  variants: MotionVariants | null;
  isAnimating: boolean;
  prefersReducedMotion: boolean;
}

export interface AnimationContextValue {
  config: AnimationConfig;
  library: AnimationLibrary;
  prefersReducedMotion: boolean;
  createAnimation: (preset: string, options?: AnimationOptions) => any;
  registerPreset: (name: string, preset: AnimationPreset) => void;
}
