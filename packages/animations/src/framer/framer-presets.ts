/**
 * Framer Motion animation presets
 */

import { Variants } from 'framer-motion';

export const fadeInOut: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const slideInOut: Variants = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 }
};

export const scaleInOut: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 }
};

export const framerPresets = {
  fadeInOut,
  slideInOut,
  scaleInOut
};
