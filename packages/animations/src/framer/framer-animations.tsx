/**
 * Framer Motion animation utilities and components
 */

import React, { forwardRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import type { HTMLMotionProps, Variants } from 'framer-motion';
import { useAnimation as useDesignersAnimation, useReducedMotion } from '../core/animation-provider';

// Enhanced motion components with design system integration
export const MotionDiv = motion.div;
export const MotionSpan = motion.span;
export const MotionButton = motion.button;
export const MotionSection = motion.section;
export const MotionArticle = motion.article;
export const MotionHeader = motion.header;
export const MotionFooter = motion.footer;
export const MotionNav = motion.nav;
export const MotionMain = motion.main;
export const MotionAside = motion.aside;

// Animated component wrapper
export interface AnimatedProps extends HTMLMotionProps<'div'> {
  preset?: string;
  duration?: number | string;
  delay?: number;
  stagger?: number;
  triggerOnce?: boolean;
  threshold?: number;
  children: React.ReactNode;
}

export const Animated = forwardRef<HTMLDivElement, AnimatedProps>(({
  preset = 'fadeIn',
  duration,
  delay,
  stagger,
  triggerOnce = true,
  threshold = 0.1,
  children,
  ...props
}, ref) => {
  const { createAnimation } = useDesignersAnimation();
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();
  const inViewRef = React.useRef(null);
  const isInView = useInView(inViewRef, { once: triggerOnce, amount: threshold });
  
  const animation = createAnimation(preset, { duration, delay, stagger });
  
  React.useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      controls.start('animate');
    }
  }, [isInView, controls, prefersReducedMotion]);
  
  if (prefersReducedMotion) {
    return <div ref={ref} {...props}>{children}</div>;
  }
  
  return (
    <motion.div
      ref={inViewRef}
      initial="initial"
      animate={controls}
      variants={animation?.variants}
      transition={animation?.transition}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Animated.displayName = 'Animated';

// Stagger container for animating lists
export interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  staggerDelay?: number;
  children: React.ReactNode;
}

export const StaggerContainer = forwardRef<HTMLDivElement, StaggerContainerProps>(({
  staggerDelay = 0.1,
  children,
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion();
  
  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
      },
    },
  };
  
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      {...props}
    >
      {children}
    </motion.div>
  );
});

StaggerContainer.displayName = 'StaggerContainer';

// Stagger item for use within StaggerContainer
export interface StaggerItemProps extends HTMLMotionProps<'div'> {
  preset?: string;
  children: React.ReactNode;
}

export const StaggerItem = forwardRef<HTMLDivElement, StaggerItemProps>(({
  preset = 'fadeInUp',
  children,
  ...props
}, ref) => {
  const { createAnimation } = useDesignersAnimation();
  const animation = createAnimation(preset);
  
  return (
    <motion.div
      ref={ref}
      variants={animation?.variants}
      {...props}
    >
      {children}
    </motion.div>
  );
});

StaggerItem.displayName = 'StaggerItem';

// Page transition wrapper
export interface PageTransitionProps {
  children: React.ReactNode;
  preset?: string;
  mode?: 'wait' | 'sync' | 'popLayout';
}

export function PageTransition({ 
  children, 
  preset = 'page',
  mode = 'wait' 
}: PageTransitionProps) {
  const { createAnimation } = useDesignersAnimation();
  const animation = createAnimation(preset);
  
  return (
    <AnimatePresence mode={mode}>
      <motion.div
        initial={animation?.initial}
        animate={animation?.animate}
        exit={animation?.exit}
        transition={animation?.transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Modal/Dialog transition wrapper
export interface ModalTransitionProps {
  isOpen: boolean;
  children: React.ReactNode;
  preset?: string;
  onExitComplete?: () => void;
}

export function ModalTransition({ 
  isOpen, 
  children, 
  preset = 'modal',
  onExitComplete 
}: ModalTransitionProps) {
  const { createAnimation } = useDesignersAnimation();
  const animation = createAnimation(preset);
  
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isOpen && (
        <motion.div
          initial={animation?.initial}
          animate={animation?.animate}
          exit={animation?.exit}
          transition={animation?.transition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hover animation wrapper
export interface HoverAnimationProps extends HTMLMotionProps<'div'> {
  hoverPreset?: string;
  tapPreset?: string;
  children: React.ReactNode;
}

export const HoverAnimation = forwardRef<HTMLDivElement, HoverAnimationProps>(({
  hoverPreset = 'scale',
  tapPreset = 'tap',
  children,
  ...props
}, ref) => {
  const { createAnimation } = useDesignersAnimation();
  const hoverAnimation = createAnimation(hoverPreset);
  const tapAnimation = createAnimation(tapPreset);
  
  return (
    <motion.div
      ref={ref}
      whileHover={hoverAnimation?.whileHover}
      whileTap={tapAnimation?.whileTap}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

HoverAnimation.displayName = 'HoverAnimation';

// Scroll-triggered animation
export interface ScrollAnimationProps extends HTMLMotionProps<'div'> {
  preset?: string;
  triggerOnce?: boolean;
  threshold?: number;
  children: React.ReactNode;
}

export const ScrollAnimation = forwardRef<HTMLDivElement, ScrollAnimationProps>(({
  preset = 'fadeInUp',
  triggerOnce = true,
  threshold = 0.1,
  children,
  ...props
}, ref) => {
  const { createAnimation } = useDesignersAnimation();
  const animation = createAnimation(preset);
  
  return (
    <motion.div
      ref={ref}
      initial={animation?.initial}
      whileInView={animation?.animate}
      viewport={{ once: triggerOnce, amount: threshold }}
      transition={animation?.transition}
      {...props}
    >
      {children}
    </motion.div>
  );
});

ScrollAnimation.displayName = 'ScrollAnimation';

// Loading animation wrapper
export interface LoadingAnimationProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  preset?: string;
}

export function LoadingAnimation({ 
  isLoading, 
  children, 
  loadingComponent,
  preset = 'fadeIn' 
}: LoadingAnimationProps) {
  const { createAnimation } = useDesignersAnimation();
  const animation = createAnimation(preset);
  
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={animation?.initial}
          animate={animation?.animate}
          exit={animation?.exit}
          transition={animation?.transition}
        >
          {loadingComponent || <div>Loading...</div>}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={animation?.initial}
          animate={animation?.animate}
          exit={animation?.exit}
          transition={animation?.transition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
