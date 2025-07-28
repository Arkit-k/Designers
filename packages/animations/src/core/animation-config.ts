/**
 * Default animation configuration with presets for both Framer Motion and GSAP
 */

import type { AnimationConfig } from '../types';

export const defaultAnimationConfig: AnimationConfig = {
  library: 'framer-motion',
  respectReducedMotion: true,
  
  durations: {
    instant: 0,
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 750,
    slowest: 1000,
  },
  
  easings: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    spring: 'spring',
  },
  
  presets: {
    // Fade animations
    fadeIn: {
      framer: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      gsap: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: 0.3, ease: 'power2.out' },
      },
    },
    
    fadeOut: {
      framer: {
        initial: { opacity: 1 },
        animate: { opacity: 0 },
        transition: { duration: 0.3, ease: 'easeIn' },
      },
      gsap: {
        from: { opacity: 1 },
        to: { opacity: 0, duration: 0.3, ease: 'power2.in' },
      },
    },
    
    // Slide animations
    slideUp: {
      framer: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.4, ease: 'easeOut' },
      },
      gsap: {
        from: { y: 20, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      },
    },
    
    slideDown: {
      framer: {
        initial: { y: -20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.4, ease: 'easeOut' },
      },
      gsap: {
        from: { y: -20, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      },
    },
    
    slideLeft: {
      framer: {
        initial: { x: 20, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 0.4, ease: 'easeOut' },
      },
      gsap: {
        from: { x: 20, opacity: 0 },
        to: { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      },
    },
    
    slideRight: {
      framer: {
        initial: { x: -20, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 0.4, ease: 'easeOut' },
      },
      gsap: {
        from: { x: -20, opacity: 0 },
        to: { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      },
    },
    
    // Scale animations
    scale: {
      framer: {
        initial: { scale: 0.95, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.3, ease: 'easeOut' },
      },
      gsap: {
        from: { scale: 0.95, opacity: 0 },
        to: { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' },
      },
    },
    
    scaleIn: {
      framer: {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { duration: 0.4, ease: 'bounce' },
      },
      gsap: {
        from: { scale: 0 },
        to: { scale: 1, duration: 0.4, ease: 'back.out(1.7)' },
      },
    },
    
    // Rotation animations
    rotate: {
      framer: {
        initial: { rotate: -5, opacity: 0 },
        animate: { rotate: 0, opacity: 1 },
        transition: { duration: 0.4, ease: 'easeOut' },
      },
      gsap: {
        from: { rotation: -5, opacity: 0 },
        to: { rotation: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      },
    },
    
    // Bounce animation
    bounce: {
      framer: {
        initial: { y: -10 },
        animate: { y: 0 },
        transition: { duration: 0.6, ease: 'bounce' },
      },
      gsap: {
        from: { y: -10 },
        to: { y: 0, duration: 0.6, ease: 'bounce.out' },
      },
    },
    
    // Pulse animation
    pulse: {
      framer: {
        animate: { scale: [1, 1.05, 1] },
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      },
      gsap: {
        to: { scale: 1.05, duration: 1, yoyo: true, repeat: -1, ease: 'power2.inOut' },
      },
    },
    
    // Shake animation
    shake: {
      framer: {
        animate: { x: [-2, 2, -2, 2, 0] },
        transition: { duration: 0.4, ease: 'easeInOut' },
      },
      gsap: {
        to: { x: 2, duration: 0.1, yoyo: true, repeat: 3, ease: 'power2.inOut' },
      },
    },
    
    // Hover effects
    hoverScale: {
      framer: {
        whileHover: { scale: 1.05 },
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      },
      gsap: {
        to: { scale: 1.05, duration: 0.2, ease: 'power2.out' },
      },
    },
    
    hoverLift: {
      framer: {
        whileHover: { y: -2, scale: 1.02 },
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      },
      gsap: {
        to: { y: -2, scale: 1.02, duration: 0.2, ease: 'power2.out' },
      },
    },
    
    // Tap effects
    tap: {
      framer: {
        whileTap: { scale: 0.95 },
        transition: { type: 'spring', stiffness: 400, damping: 17 },
      },
      gsap: {
        to: { scale: 0.95, duration: 0.1, ease: 'power2.out' },
      },
    },
  },
  
  transitions: {
    // Page transitions
    page: {
      framer: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3, ease: 'easeInOut' },
      },
      gsap: {
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0, duration: 0.3, ease: 'power2.inOut' },
      },
    },
    
    // Modal transitions
    modal: {
      framer: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.2, ease: 'easeOut' },
      },
      gsap: {
        from: { opacity: 0, scale: 0.95 },
        to: { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' },
      },
    },
    
    // Drawer transitions
    drawer: {
      framer: {
        initial: { x: '-100%' },
        animate: { x: 0 },
        exit: { x: '-100%' },
        transition: { duration: 0.3, ease: 'easeInOut' },
      },
      gsap: {
        from: { x: '-100%' },
        to: { x: 0, duration: 0.3, ease: 'power2.inOut' },
      },
    },
    
    // Toast transitions
    toast: {
      framer: {
        initial: { opacity: 0, y: -50, scale: 0.3 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      },
      gsap: {
        from: { opacity: 0, y: -50, scale: 0.3 },
        to: { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' },
      },
    },
  },
};
