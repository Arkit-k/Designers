/**
 * Animation accessibility utilities
 */

/**
 * Check if user prefers reduced motion
 */
export function checkReducedMotionPreference(): boolean {
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}

/**
 * Create a media query listener for reduced motion changes
 */
export function createReducedMotionListener(
  callback: (prefersReduced: boolean) => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  const handleChange = (event: MediaQueryListEvent) => {
    callback(event.matches);
  };
  
  mediaQuery.addEventListener('change', handleChange);
  
  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}

/**
 * Get safe animation duration based on user preferences
 */
export function getSafeAnimationDuration(
  duration: number | string,
  prefersReduced = false
): number | string {
  if (prefersReduced) {
    return 0;
  }
  
  return duration;
}

/**
 * Get safe animation easing based on user preferences
 */
export function getSafeAnimationEasing(
  easing: string,
  prefersReduced = false
): string {
  if (prefersReduced) {
    return 'linear';
  }
  
  return easing;
}

/**
 * Create accessible animation options
 */
export function createAccessibleAnimationOptions(
  options: any,
  prefersReduced = false
): any {
  if (prefersReduced) {
    return {
      ...options,
      duration: 0,
      delay: 0,
      transition: { duration: 0 },
    };
  }
  
  return options;
}

/**
 * Wrap animation with accessibility check
 */
export function withAccessibility<T extends (...args: any[]) => any>(
  animationFunction: T,
  fallback?: () => any
): T {
  return ((...args: any[]) => {
    const prefersReduced = checkReducedMotionPreference();
    
    if (prefersReduced && fallback) {
      return fallback();
    }
    
    if (prefersReduced) {
      return null;
    }
    
    return animationFunction(...args);
  }) as T;
}

/**
 * Animation accessibility guidelines
 */
export const accessibilityGuidelines = {
  /**
   * Maximum safe animation duration (in ms)
   */
  maxDuration: 500,
  
  /**
   * Recommended animation duration for different types
   */
  durations: {
    micro: 150,      // Small UI changes
    short: 300,      // Standard transitions
    medium: 500,     // Complex animations
    long: 1000,      // Special effects only
  },
  
  /**
   * Safe easing functions that don't cause vestibular issues
   */
  safeEasings: [
    'ease-out',
    'ease-in-out',
    'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    'cubic-bezier(0.165, 0.84, 0.44, 1)',
  ],
  
  /**
   * Animations to avoid for accessibility
   */
  avoid: [
    'rapid flashing',
    'strobing effects',
    'parallax scrolling (excessive)',
    'auto-playing videos',
    'infinite loops without pause',
  ],
  
  /**
   * Best practices
   */
  bestPractices: [
    'Provide pause/stop controls for auto-playing animations',
    'Use CSS prefers-reduced-motion media query',
    'Offer animation toggle in settings',
    'Keep essential animations under 500ms',
    'Avoid animations that flash more than 3 times per second',
    'Provide static alternatives for animated content',
  ],
};

/**
 * Validate animation for accessibility compliance
 */
export function validateAnimationAccessibility(animation: {
  duration?: number;
  flashes?: number;
  hasControls?: boolean;
  isEssential?: boolean;
}): {
  isValid: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];
  
  // Check duration
  if (animation.duration && animation.duration > accessibilityGuidelines.maxDuration) {
    if (animation.isEssential) {
      warnings.push(`Animation duration (${animation.duration}ms) exceeds recommended maximum (${accessibilityGuidelines.maxDuration}ms)`);
    } else {
      errors.push(`Non-essential animation duration (${animation.duration}ms) exceeds maximum allowed (${accessibilityGuidelines.maxDuration}ms)`);
    }
  }
  
  // Check flashing
  if (animation.flashes && animation.flashes > 3) {
    errors.push(`Animation flashes ${animation.flashes} times per second, exceeding safe limit of 3`);
  }
  
  // Check controls for long animations
  if (animation.duration && animation.duration > 1000 && !animation.hasControls) {
    warnings.push('Long animations should provide pause/stop controls');
  }
  
  return {
    isValid: errors.length === 0,
    warnings,
    errors,
  };
}

/**
 * Create reduced motion fallback
 */
export function createReducedMotionFallback(
  originalAnimation: any,
  fallbackType: 'instant' | 'fade' | 'none' = 'instant'
): any {
  switch (fallbackType) {
    case 'instant':
      return {
        ...originalAnimation,
        duration: 0,
        transition: { duration: 0 },
      };
      
    case 'fade':
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.15 },
      };
      
    case 'none':
      return null;
      
    default:
      return originalAnimation;
  }
}

/**
 * Animation accessibility context for React
 */
export interface AnimationAccessibilityContext {
  prefersReducedMotion: boolean;
  animationsEnabled: boolean;
  toggleAnimations: () => void;
  setAnimationPreference: (enabled: boolean) => void;
}

/**
 * Local storage key for animation preferences
 */
export const ANIMATION_PREFERENCE_KEY = 'designers-animation-preference';

/**
 * Get stored animation preference
 */
export function getStoredAnimationPreference(): boolean | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(ANIMATION_PREFERENCE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

/**
 * Store animation preference
 */
export function storeAnimationPreference(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(ANIMATION_PREFERENCE_KEY, JSON.stringify(enabled));
  } catch {
    // Ignore storage errors
  }
}
