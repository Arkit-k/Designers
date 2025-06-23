/**
 * GSAP animation utilities and helpers
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { useAnimation as useDesignersAnimation, useReducedMotion } from '../core/animation-provider';
import type { GSAPAnimationPreset, GSAPTimelineConfig, ScrollTriggerConfig } from '../types';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  
  // Register premium plugins if available
  try {
    gsap.registerPlugin(MorphSVGPlugin);
  } catch (e) {
    // Premium plugin not available
  }
}

/**
 * GSAP Animation Manager
 */
export class GSAPAnimationManager {
  private timelines = new Map<string, gsap.core.Timeline>();
  private prefersReducedMotion: boolean;
  
  constructor(prefersReducedMotion = false) {
    this.prefersReducedMotion = prefersReducedMotion;
  }
  
  /**
   * Create animation from preset
   */
  createAnimation(
    target: string | Element | Element[],
    preset: GSAPAnimationPreset,
    options: any = {}
  ) {
    if (this.prefersReducedMotion) {
      return this.createReducedMotionAnimation(target, preset);
    }
    
    const { from, to, timeline, trigger } = preset;
    
    if (timeline) {
      return this.createTimeline(timeline, options);
    }
    
    if (trigger) {
      return this.createScrollTriggerAnimation(target, { from, to }, trigger, options);
    }
    
    if (from && to) {
      return gsap.fromTo(target, from, { ...to, ...options });
    }
    
    if (to) {
      return gsap.to(target, { ...to, ...options });
    }
    
    if (from) {
      return gsap.from(target, { ...from, ...options });
    }
    
    return null;
  }
  
  /**
   * Create timeline animation
   */
  createTimeline(config: GSAPTimelineConfig, options: any = {}) {
    const tl = gsap.timeline({
      ...config.defaults,
      ...options,
      repeat: options.repeat ?? config.repeat,
      yoyo: options.yoyo ?? config.yoyo,
      paused: options.paused ?? config.paused,
    });
    
    config.steps.forEach(step => {
      tl.to(step.target, step.vars, step.position);
    });
    
    return tl;
  }
  
  /**
   * Create scroll-triggered animation
   */
  createScrollTriggerAnimation(
    target: string | Element | Element[],
    animation: { from?: gsap.TweenVars; to?: gsap.TweenVars },
    trigger: ScrollTriggerConfig,
    options: any = {}
  ) {
    const { from, to } = animation;
    
    let tween;
    if (from && to) {
      tween = gsap.fromTo(target, from, { ...to, ...options });
    } else if (to) {
      tween = gsap.to(target, { ...to, ...options });
    } else if (from) {
      tween = gsap.from(target, { ...from, ...options });
    }
    
    if (tween) {
      ScrollTrigger.create({
        trigger: trigger.trigger,
        start: trigger.start || 'top 80%',
        end: trigger.end || 'bottom 20%',
        scrub: trigger.scrub,
        pin: trigger.pin,
        snap: trigger.snap,
        animation: tween,
        onEnter: trigger.onEnter,
        onLeave: trigger.onLeave,
        onEnterBack: trigger.onEnterBack,
        onLeaveBack: trigger.onLeaveBack,
      });
    }
    
    return tween;
  }
  
  /**
   * Create reduced motion animation (instant or very fast)
   */
  private createReducedMotionAnimation(
    target: string | Element | Element[],
    preset: GSAPAnimationPreset
  ) {
    const { to } = preset;
    
    if (to) {
      return gsap.set(target, to);
    }
    
    return null;
  }
  
  /**
   * Register timeline for later use
   */
  registerTimeline(name: string, timeline: gsap.core.Timeline) {
    this.timelines.set(name, timeline);
  }
  
  /**
   * Get registered timeline
   */
  getTimeline(name: string): gsap.core.Timeline | undefined {
    return this.timelines.get(name);
  }
  
  /**
   * Kill all animations
   */
  killAll() {
    gsap.killTweensOf('*');
    this.timelines.clear();
  }
  
  /**
   * Refresh ScrollTrigger (useful after layout changes)
   */
  refreshScrollTrigger() {
    ScrollTrigger.refresh();
  }
}

/**
 * GSAP utility functions
 */
export const gsapUtils = {
  /**
   * Animate text typing effect
   */
  typeText(target: string | Element, text: string, duration = 2) {
    return gsap.to(target, {
      duration,
      text: {
        value: text,
        delimiter: '',
      },
      ease: 'none',
    });
  },
  
  /**
   * Animate counter/number
   */
  animateNumber(
    target: string | Element,
    from: number,
    to: number,
    duration = 2,
    formatter?: (value: number) => string
  ) {
    const obj = { value: from };
    
    return gsap.to(obj, {
      duration,
      value: to,
      ease: 'power2.out',
      onUpdate() {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (element) {
          const formattedValue = formatter ? formatter(obj.value) : Math.round(obj.value).toString();
          (element as HTMLElement).textContent = formattedValue;
        }
      },
    });
  },
  
  /**
   * Stagger animation for multiple elements
   */
  staggerAnimation(
    targets: string | Element[],
    animation: gsap.TweenVars,
    stagger = 0.1
  ) {
    return gsap.to(targets, {
      ...animation,
      stagger,
    });
  },
  
  /**
   * Parallax scroll effect
   */
  parallax(target: string | Element, speed = 0.5) {
    return gsap.to(target, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: target,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  },
  
  /**
   * Reveal animation with mask
   */
  revealWithMask(target: string | Element, direction = 'left') {
    const directions = {
      left: { x: '-100%' },
      right: { x: '100%' },
      top: { y: '-100%' },
      bottom: { y: '100%' },
    };
    
    return gsap.fromTo(
      target,
      {
        clipPath: 'inset(0 100% 0 0)',
      },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1,
        ease: 'power2.out',
      }
    );
  },
  
  /**
   * Morphing animation (requires MorphSVG plugin)
   */
  morphSVG(target: string | Element, path: string, duration = 1) {
    try {
      return gsap.to(target, {
        duration,
        morphSVG: path,
        ease: 'power2.inOut',
      });
    } catch (e) {
      console.warn('MorphSVG plugin not available');
      return null;
    }
  },
  
  /**
   * Flip animation helper
   */
  flip(
    targets: string | Element[],
    callback: () => void,
    options: any = {}
  ) {
    // Get initial state
    const state = gsap.getProperty(targets, 'x,y,rotation,scaleX,scaleY');
    
    // Make changes
    callback();
    
    // Animate to new state
    return gsap.from(targets, {
      ...state,
      duration: options.duration || 0.5,
      ease: options.ease || 'power2.inOut',
    });
  },
};

/**
 * GSAP React integration helpers
 */
export const gsapReact = {
  /**
   * Use GSAP animation with React ref
   */
  useGSAP(
    callback: (context: { timeline: gsap.core.Timeline; gsap: typeof gsap }) => void,
    dependencies: any[] = []
  ) {
    const timelineRef = React.useRef<gsap.core.Timeline>();
    
    React.useEffect(() => {
      const timeline = gsap.timeline();
      timelineRef.current = timeline;
      
      callback({ timeline, gsap });
      
      return () => {
        timeline.kill();
      };
    }, dependencies);
    
    return timelineRef.current;
  },
  
  /**
   * Use GSAP with scroll trigger
   */
  useScrollTrigger(
    target: React.RefObject<Element>,
    animation: gsap.TweenVars,
    trigger: Partial<ScrollTriggerConfig> = {}
  ) {
    React.useEffect(() => {
      if (!target.current) return;
      
      const tween = gsap.to(target.current, animation);
      
      ScrollTrigger.create({
        trigger: target.current,
        start: 'top 80%',
        end: 'bottom 20%',
        ...trigger,
        animation: tween,
      });
      
      return () => {
        tween.kill();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }, [target, animation, trigger]);
  },
};
