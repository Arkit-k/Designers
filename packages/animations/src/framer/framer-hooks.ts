/**
 * Framer Motion React hooks
 */

import { useRef, useEffect, useMemo } from 'react';
import { useAnimation, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useAnimation as useDesignersAnimation, useReducedMotion } from '../core/animation-provider';
import type { Variants } from 'framer-motion';

/**
 * Hook for creating animated sequences
 */
export function useAnimationSequence(presets: string[], options: any = {}) {
  const controls = useAnimation();
  const { createAnimation } = useDesignersAnimation();
  const prefersReducedMotion = useReducedMotion();
  
  const sequence = useMemo(() => {
    return presets.map(preset => createAnimation(preset, options));
  }, [presets, createAnimation, options]);
  
  const playSequence = async (delay = 0) => {
    if (prefersReducedMotion) return;
    
    for (let i = 0; i < sequence.length; i++) {
      const animation = sequence[i];
      if (animation?.animate) {
        await controls.start(animation.animate);
        if (delay > 0 && i < sequence.length - 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
  };
  
  return {
    controls,
    sequence,
    playSequence,
    isAnimating: false, // TODO: track animation state
  };
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollAnimation(
  preset: string,
  options: {
    triggerOnce?: boolean;
    threshold?: number;
    margin?: string;
  } = {}
) {
  const ref = useRef(null);
  const { createAnimation } = useDesignersAnimation();
  const prefersReducedMotion = useReducedMotion();
  
  const {
    triggerOnce = true,
    threshold = 0.1,
    margin = '0px',
  } = options;
  
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold,
    margin,
  });
  
  const animation = createAnimation(preset);
  
  const variants: Variants = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        initial: animation?.animate || {},
        animate: animation?.animate || {},
      };
    }
    
    return {
      initial: animation?.initial || {},
      animate: animation?.animate || {},
    };
  }, [animation, prefersReducedMotion]);
  
  return {
    ref,
    variants,
    animate: isInView ? 'animate' : 'initial',
    transition: animation?.transition,
  };
}

/**
 * Hook for stagger animations
 */
export function useStaggerAnimation(
  preset: string,
  itemCount: number,
  staggerDelay = 0.1
) {
  const { createAnimation } = useDesignersAnimation();
  const prefersReducedMotion = useReducedMotion();
  
  const animation = createAnimation(preset);
  
  const containerVariants: Variants = useMemo(() => ({
    initial: {},
    animate: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
      },
    },
  }), [staggerDelay, prefersReducedMotion]);
  
  const itemVariants: Variants = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        initial: animation?.animate || {},
        animate: animation?.animate || {},
      };
    }
    
    return {
      initial: animation?.initial || {},
      animate: animation?.animate || {},
    };
  }, [animation, prefersReducedMotion]);
  
  return {
    containerVariants,
    itemVariants,
    transition: animation?.transition,
  };
}

/**
 * Hook for parallax scroll effects
 */
export function useParallax(speed = 0.5) {
  const ref = useRef(null);
  const { scrollY } = useMotionValue(0);
  
  const y = useTransform(scrollY, [0, 1], [0, speed]);
  
  useEffect(() => {
    const updateScrollY = () => {
      scrollY.set(window.scrollY);
    };
    
    window.addEventListener('scroll', updateScrollY);
    return () => window.removeEventListener('scroll', updateScrollY);
  }, [scrollY]);
  
  return { ref, y };
}

/**
 * Hook for mouse tracking animations
 */
export function useMouseTracking(strength = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-0.5, 0.5], [15 * strength, -15 * strength]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15 * strength, 15 * strength]);
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = (event.clientX - centerX) / (rect.width / 2);
      const mouseY = (event.clientY - centerY) / (rect.height / 2);
      
      x.set(mouseX);
      y.set(mouseY);
    };
    
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };
    
    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [x, y]);
  
  return {
    ref,
    rotateX,
    rotateY,
    style: { rotateX, rotateY },
  };
}

/**
 * Hook for spring animations
 */
export function useSpringAnimation(
  value: number,
  config: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  } = {}
) {
  const {
    stiffness = 300,
    damping = 30,
    mass = 1,
  } = config;
  
  const spring = useSpring(value, { stiffness, damping, mass });
  
  return spring;
}

/**
 * Hook for gesture animations
 */
export function useGestureAnimation(preset: string) {
  const { createAnimation } = useDesignersAnimation();
  const animation = createAnimation(preset);
  
  const gestureVariants: Variants = useMemo(() => ({
    hover: animation?.whileHover || { scale: 1.05 },
    tap: animation?.whileTap || { scale: 0.95 },
    focus: animation?.whileFocus || { scale: 1.02 },
  }), [animation]);
  
  return {
    variants: gestureVariants,
    whileHover: 'hover',
    whileTap: 'tap',
    whileFocus: 'focus',
    transition: animation?.transition || { type: 'spring', stiffness: 300, damping: 20 },
  };
}

/**
 * Hook for loading animations
 */
export function useLoadingAnimation(isLoading: boolean, preset = 'fadeIn') {
  const { createAnimation } = useDesignersAnimation();
  const animation = createAnimation(preset);
  
  const variants: Variants = useMemo(() => ({
    loading: {
      opacity: 0.7,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
    loaded: animation?.animate || { opacity: 1, scale: 1 },
  }), [animation]);
  
  return {
    variants,
    animate: isLoading ? 'loading' : 'loaded',
    transition: animation?.transition,
  };
}

/**
 * Hook for text animations
 */
export function useTextAnimation(preset: string, text: string) {
  const { createAnimation } = useDesignersAnimation();
  const animation = createAnimation(preset);
  
  const letters = text.split('');
  
  const containerVariants: Variants = useMemo(() => ({
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  }), []);
  
  const letterVariants: Variants = useMemo(() => ({
    initial: animation?.initial || { opacity: 0, y: 20 },
    animate: animation?.animate || { opacity: 1, y: 0 },
  }), [animation]);
  
  return {
    letters,
    containerVariants,
    letterVariants,
    transition: animation?.transition,
  };
}

/**
 * Hook for page transitions
 */
export function usePageTransition(preset = 'page') {
  const { createAnimation } = useDesignersAnimation();
  const animation = createAnimation(preset);
  
  return {
    initial: animation?.initial || { opacity: 0, y: 20 },
    animate: animation?.animate || { opacity: 1, y: 0 },
    exit: animation?.exit || { opacity: 0, y: -20 },
    transition: animation?.transition || { duration: 0.3 },
  };
}
