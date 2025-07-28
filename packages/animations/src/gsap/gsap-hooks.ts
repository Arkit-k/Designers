/**
 * GSAP React hooks
 */

import { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAnimation as useDesignersAnimation, useReducedMotion } from '../core/animation-provider';
import { GSAPAnimationManager } from './gsap-animations';
import type { GSAPTimeline } from '../types';

/**
 * Main GSAP hook for creating animations
 */
export function useGSAP(
  callback: (context: { timeline: gsap.core.Timeline; gsap: typeof gsap; targets: any }) => void,
  dependencies: any[] = []
) {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>();
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const timeline = gsap.timeline({ paused: prefersReducedMotion });
    timelineRef.current = timeline;
    
    const context = gsap.context(() => {
      const targets = (selector: string) => 
        containerRef.current?.querySelectorAll(selector) || [];
      
      callback({ timeline, gsap, targets });
    }, containerRef.current);
    
    if (!prefersReducedMotion) {
      timeline.play();
    }
    
    return () => {
      context.revert();
      timeline.kill();
    };
  }, dependencies);
  
  return {
    ref: containerRef,
    timeline: timelineRef.current,
  };
}

/**
 * Hook for GSAP scroll-triggered animations
 */
export function useGSAPScrollTrigger(
  preset: string,
  options: {
    trigger?: string;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    snap?: boolean | number | number[];
  } = {}
) {
  const ref = useRef<HTMLElement>(null);
  const { createAnimation } = useDesignersAnimation();
  const prefersReducedMotion = useReducedMotion();
  
  const {
    trigger,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    pin = false,
    snap = false,
  } = options;
  
  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;
    
    const animation = createAnimation(preset);
    if (!animation?.gsap) return;
    
    const element = ref.current;
    const triggerElement = trigger ? element.querySelector(trigger) : element;
    
    let tween;
    const { from, to } = animation.gsap;
    
    if (from && to) {
      tween = gsap.fromTo(element, from, to);
    } else if (to) {
      tween = gsap.to(element, to);
    } else if (from) {
      tween = gsap.from(element, from);
    }
    
    if (tween) {
      ScrollTrigger.create({
        trigger: triggerElement,
        start,
        end,
        scrub,
        pin,
        snap,
        animation: tween,
      });
    }
    
    return () => {
      tween?.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === triggerElement) {
          st.kill();
        }
      });
    };
  }, [preset, createAnimation, trigger, start, end, scrub, pin, snap, prefersReducedMotion]);
  
  return ref;
}

/**
 * Hook for GSAP timeline animations
 */
export function useGSAPTimeline(
  steps: Array<{
    target: string;
    animation: any;
    position?: string | number;
  }>,
  options: {
    repeat?: number;
    yoyo?: boolean;
    paused?: boolean;
  } = {}
) {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>();
  const prefersReducedMotion = useReducedMotion();
  
  const { repeat = 0, yoyo = false, paused = false } = options;
  
  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;
    
    const timeline = gsap.timeline({ repeat, yoyo, paused });
    timelineRef.current = timeline;
    
    const context = gsap.context(() => {
      steps.forEach(step => {
        const targets = containerRef.current?.querySelectorAll(step.target);
        if (targets && targets.length > 0) {
          timeline.to(targets, step.animation, step.position);
        }
      });
    }, containerRef.current);
    
    return () => {
      context.revert();
      timeline.kill();
    };
  }, [steps, repeat, yoyo, paused, prefersReducedMotion]);
  
  const controls = useMemo<GSAPTimeline>(() => ({
    timeline: timelineRef.current!,
    play: () => timelineRef.current?.play(),
    pause: () => timelineRef.current?.pause(),
    reverse: () => timelineRef.current?.reverse(),
    restart: () => timelineRef.current?.restart(),
    kill: () => timelineRef.current?.kill(),
  }), []);
  
  return {
    ref: containerRef,
    timeline: timelineRef.current,
    controls,
  };
}

/**
 * Hook for GSAP stagger animations
 */
export function useGSAPStagger(
  preset: string,
  stagger = 0.1,
  options: any = {}
) {
  const ref = useRef<HTMLElement>(null);
  const { createAnimation } = useDesignersAnimation();
  const prefersReducedMotion = useReducedMotion();
  
  const animate = useCallback((trigger = true) => {
    if (!ref.current || prefersReducedMotion) return;
    
    const animation = createAnimation(preset, options);
    if (!animation?.gsap) return;
    
    const children = ref.current.children;
    if (children.length === 0) return;
    
    const { from, to } = animation.gsap;
    
    if (trigger) {
      if (from && to) {
        gsap.fromTo(children, from, { ...to, stagger });
      } else if (to) {
        gsap.to(children, { ...to, stagger });
      } else if (from) {
        gsap.from(children, { ...from, stagger });
      }
    }
  }, [preset, createAnimation, stagger, options, prefersReducedMotion]);
  
  return {
    ref,
    animate,
  };
}

/**
 * Hook for GSAP hover animations
 */
export function useGSAPHover(
  hoverAnimation: any,
  leaveAnimation?: any
) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;
    
    const element = ref.current;
    
    const handleMouseEnter = () => {
      gsap.to(element, hoverAnimation);
    };
    
    const handleMouseLeave = () => {
      if (leaveAnimation) {
        gsap.to(element, leaveAnimation);
      } else {
        gsap.to(element, { ...hoverAnimation, scale: 1, rotation: 0 });
      }
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hoverAnimation, leaveAnimation, prefersReducedMotion]);
  
  return ref;
}

/**
 * Hook for GSAP text animations
 */
export function useGSAPTextAnimation(
  text: string,
  preset: string,
  options: {
    splitBy?: 'chars' | 'words' | 'lines';
    stagger?: number;
  } = {}
) {
  const ref = useRef<HTMLElement>(null);
  const { createAnimation } = useDesignersAnimation();
  const prefersReducedMotion = useReducedMotion();
  
  const { splitBy = 'chars', stagger = 0.05 } = options;
  
  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;
    
    const element = ref.current;
    const animation = createAnimation(preset);
    if (!animation?.gsap) return;
    
    // Split text
    let splitText: string[];
    if (splitBy === 'chars') {
      splitText = text.split('');
    } else if (splitBy === 'words') {
      splitText = text.split(' ');
    } else {
      splitText = text.split('\n');
    }
    
    // Create spans for each part
    element.innerHTML = splitText
      .map(part => `<span style="display: inline-block;">${part}</span>`)
      .join(splitBy === 'words' ? ' ' : '');
    
    const spans = element.querySelectorAll('span');
    
    const { from, to } = animation.gsap;
    
    if (from && to) {
      gsap.fromTo(spans, from, { ...to, stagger });
    } else if (to) {
      gsap.to(spans, { ...to, stagger });
    } else if (from) {
      gsap.from(spans, { ...from, stagger });
    }
    
    return () => {
      element.innerHTML = text;
    };
  }, [text, preset, createAnimation, splitBy, stagger, prefersReducedMotion]);
  
  return ref;
}

/**
 * Hook for GSAP morphing animations (requires MorphSVG plugin)
 */
export function useGSAPMorph(
  paths: string[],
  duration = 1,
  options: {
    repeat?: number;
    yoyo?: boolean;
    ease?: string;
  } = {}
) {
  const ref = useRef<SVGPathElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { repeat = 0, yoyo = false, ease = 'power2.inOut' } = options;
  
  const morphTo = useCallback((pathIndex: number) => {
    if (!ref.current || prefersReducedMotion || !paths[pathIndex]) return;
    
    try {
      gsap.to(ref.current, {
        morphSVG: paths[pathIndex],
        duration,
        ease,
      });
    } catch (e) {
      console.warn('MorphSVG plugin not available');
    }
  }, [paths, duration, ease, prefersReducedMotion]);
  
  const morphSequence = useCallback(() => {
    if (!ref.current || prefersReducedMotion) return;
    
    const timeline = gsap.timeline({ repeat, yoyo });
    
    paths.forEach((path, index) => {
      if (index > 0) {
        try {
          timeline.to(ref.current, {
            morphSVG: path,
            duration,
            ease,
          });
        } catch (e) {
          console.warn('MorphSVG plugin not available');
        }
      }
    });
    
    return timeline;
  }, [paths, duration, ease, repeat, yoyo, prefersReducedMotion]);
  
  return {
    ref,
    morphTo,
    morphSequence,
  };
}

/**
 * Hook for GSAP parallax effects
 */
export function useGSAPParallax(speed = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;
    
    const element = ref.current;
    
    gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) {
          st.kill();
        }
      });
    };
  }, [speed, prefersReducedMotion]);
  
  return ref;
}
