/**
 * GSAP animation presets
 */

export const gsapPresets = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.3 }
  },
  slideIn: {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.3 }
  },
  scaleIn: {
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 0.3 }
  }
};

export const fadeIn = gsapPresets.fadeIn;
export const slideIn = gsapPresets.slideIn;
export const scaleIn = gsapPresets.scaleIn;
