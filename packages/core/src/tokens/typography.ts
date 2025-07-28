/**
 * Typography system with fluid type scales and responsive sizing
 */

export interface FontFamily {
  sans: string[];
  serif: string[];
  mono: string[];
}

export interface FontWeight {
  thin: number;
  extralight: number;
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
  black: number;
}

export interface FontSize {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  '7xl': string;
  '8xl': string;
  '9xl': string;
}

export interface LineHeight {
  none: number;
  tight: number;
  snug: number;
  normal: number;
  relaxed: number;
  loose: number;
}

export interface LetterSpacing {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
}

export interface TypographyScale {
  fontSize: string;
  lineHeight: string;
  letterSpacing?: string;
  fontWeight?: number;
}

export interface TypographySystem {
  fontFamily: FontFamily;
  fontWeight: FontWeight;
  fontSize: FontSize;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
  
  // Semantic typography scales
  heading: {
    h1: TypographyScale;
    h2: TypographyScale;
    h3: TypographyScale;
    h4: TypographyScale;
    h5: TypographyScale;
    h6: TypographyScale;
  };
  
  body: {
    large: TypographyScale;
    base: TypographyScale;
    small: TypographyScale;
    xs: TypographyScale;
  };
  
  display: {
    large: TypographyScale;
    medium: TypographyScale;
    small: TypographyScale;
  };
  
  code: {
    large: TypographyScale;
    base: TypographyScale;
    small: TypographyScale;
  };
}

export const typography: TypographySystem = {
  fontFamily: {
    sans: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ],
    serif: [
      'Charter',
      'Bitstream Charter',
      'Sitka Text',
      'Cambria',
      'serif',
    ],
    mono: [
      'JetBrains Mono',
      'Fira Code',
      'Consolas',
      'Liberation Mono',
      'Menlo',
      'Courier',
      'monospace',
    ],
  },
  
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
    '8xl': '6rem',     // 96px
    '9xl': '8rem',     // 128px
  },
  
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  // Semantic typography scales
  heading: {
    h1: {
      fontSize: 'clamp(2.25rem, 4vw, 4.5rem)', // 36px - 72px
      lineHeight: '1.1',
      letterSpacing: '-0.025em',
      fontWeight: 700,
    },
    h2: {
      fontSize: 'clamp(1.875rem, 3.5vw, 3.75rem)', // 30px - 60px
      lineHeight: '1.2',
      letterSpacing: '-0.025em',
      fontWeight: 600,
    },
    h3: {
      fontSize: 'clamp(1.5rem, 3vw, 3rem)', // 24px - 48px
      lineHeight: '1.25',
      letterSpacing: '-0.02em',
      fontWeight: 600,
    },
    h4: {
      fontSize: 'clamp(1.25rem, 2.5vw, 2.25rem)', // 20px - 36px
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
      fontWeight: 600,
    },
    h5: {
      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', // 18px - 24px
      lineHeight: '1.4',
      fontWeight: 500,
    },
    h6: {
      fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', // 16px - 20px
      lineHeight: '1.5',
      fontWeight: 500,
    },
  },
  
  body: {
    large: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.6',
    },
    base: {
      fontSize: '1rem', // 16px
      lineHeight: '1.5',
    },
    small: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.4',
    },
    xs: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1.3',
    },
  },
  
  display: {
    large: {
      fontSize: 'clamp(4.5rem, 8vw, 8rem)', // 72px - 128px
      lineHeight: '1',
      letterSpacing: '-0.05em',
      fontWeight: 800,
    },
    medium: {
      fontSize: 'clamp(3rem, 6vw, 6rem)', // 48px - 96px
      lineHeight: '1.05',
      letterSpacing: '-0.04em',
      fontWeight: 700,
    },
    small: {
      fontSize: 'clamp(2.25rem, 4vw, 4.5rem)', // 36px - 72px
      lineHeight: '1.1',
      letterSpacing: '-0.03em',
      fontWeight: 700,
    },
  },
  
  code: {
    large: {
      fontSize: '1rem', // 16px
      lineHeight: '1.6',
      fontWeight: 400,
    },
    base: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.5',
      fontWeight: 400,
    },
    small: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1.4',
      fontWeight: 400,
    },
  },
};

// Utility function to generate CSS font shorthand
export function getFontCSS(scale: TypographyScale, fontFamily: string[] = typography.fontFamily.sans): string {
  const weight = scale.fontWeight || typography.fontWeight.normal;
  const family = fontFamily.join(', ');
  return `${weight} ${scale.fontSize}/${scale.lineHeight} ${family}`;
}

// Utility function to get responsive font size
export function getResponsiveFontSize(
  minSize: string,
  maxSize: string,
  minViewport: string = '20rem',
  maxViewport: string = '80rem'
): string {
  return `clamp(${minSize}, ${minViewport} + 2vw, ${maxSize})`;
}
