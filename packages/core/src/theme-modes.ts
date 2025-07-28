/**
 * Theme Modes - CSS utilities and configurations for different theme modes
 */

export type ThemeMode = 'light' | 'dark' | 'midnight' | 'system';

export interface ThemeModeConfig {
  name: string;
  description: string;
  cssClass: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    border: string;
  };
  effects: {
    glass: boolean;
    glow: boolean;
    floatingOrbs: boolean;
    gridPattern: boolean;
  };
}

export const themeModeConfigs: Record<Exclude<ThemeMode, 'system'>, ThemeModeConfig> = {
  light: {
    name: 'Light Mode',
    description: 'Clean and bright interface perfect for daytime use',
    cssClass: 'light',
    colors: {
      background: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(222.2, 84%, 4.9%)',
      primary: 'hsl(221.2, 83.2%, 53.3%)',
      secondary: 'hsl(210, 40%, 96%)',
      accent: 'hsl(210, 40%, 96%)',
      muted: 'hsl(215.4, 16.3%, 46.9%)',
      border: 'hsl(214.3, 31.8%, 91.4%)',
    },
    effects: {
      glass: false,
      glow: false,
      floatingOrbs: false,
      gridPattern: true,
    },
  },
  dark: {
    name: 'Dark Mode',
    description: 'Easy on the eyes with reduced blue light',
    cssClass: 'dark',
    colors: {
      background: 'hsl(222.2, 84%, 4.9%)',
      foreground: 'hsl(210, 40%, 98%)',
      primary: 'hsl(217.2, 91.2%, 59.8%)',
      secondary: 'hsl(217.2, 32.6%, 17.5%)',
      accent: 'hsl(217.2, 32.6%, 17.5%)',
      muted: 'hsl(215, 20.2%, 65.1%)',
      border: 'hsl(217.2, 32.6%, 17.5%)',
    },
    effects: {
      glass: true,
      glow: false,
      floatingOrbs: false,
      gridPattern: true,
    },
  },
  midnight: {
    name: 'Midnight Mode',
    description: 'Deep black with vibrant blue accents for a premium feel',
    cssClass: 'midnight',
    colors: {
      background: 'hsl(0, 0%, 3%)',
      foreground: 'hsl(210, 40%, 98%)',
      primary: 'hsl(217.2, 91.2%, 59.8%)',
      secondary: 'hsl(217.2, 32.6%, 17.5%)',
      accent: 'hsl(217.2, 32.6%, 17.5%)',
      muted: 'hsl(215, 20.2%, 65.1%)',
      border: 'hsl(217.2, 32.6%, 17.5%)',
    },
    effects: {
      glass: true,
      glow: true,
      floatingOrbs: true,
      gridPattern: true,
    },
  },
};

/**
 * Generate CSS custom properties for a theme mode
 */
export function generateThemeModeCSS(mode: Exclude<ThemeMode, 'system'>): string {
  const config = themeModeConfigs[mode];
  
  const cssVars = Object.entries(config.colors)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');

  return `.${config.cssClass} {\n${cssVars}\n}`;
}

/**
 * Generate complete CSS for all theme modes
 */
export function generateAllThemeModesCSS(): string {
  const modes = Object.keys(themeModeConfigs) as Array<Exclude<ThemeMode, 'system'>>;
  
  return modes
    .map(mode => generateThemeModeCSS(mode))
    .join('\n\n');
}

/**
 * Get theme mode configuration
 */
export function getThemeModeConfig(mode: Exclude<ThemeMode, 'system'>): ThemeModeConfig {
  return themeModeConfigs[mode];
}

/**
 * Check if theme mode supports specific effects
 */
export function supportsEffect(mode: Exclude<ThemeMode, 'system'>, effect: keyof ThemeModeConfig['effects']): boolean {
  return themeModeConfigs[mode].effects[effect];
}

/**
 * Generate CSS classes for theme-aware components
 */
export function generateThemeAwareCSS(): string {
  return `
/* Theme Mode Base Styles */
.theme-transitioning,
.theme-transitioning *,
.theme-transitioning *:before,
.theme-transitioning *:after {
  transition: 
    background-color 300ms ease-in-out,
    border-color 300ms ease-in-out,
    color 300ms ease-in-out,
    fill 300ms ease-in-out,
    stroke 300ms ease-in-out,
    box-shadow 300ms ease-in-out !important;
}

/* Glass Effects */
.glass {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.light .glass {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 0 20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.dark .glass {
  background: rgba(26, 26, 26, 0.8);
  border: 1px solid rgba(128, 128, 128, 0.2);
  box-shadow: 
    0 0 20px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.midnight .glass {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 
    0 0 20px rgba(59, 130, 246, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Glow Effects */
.glow-effect {
  transition: box-shadow 300ms ease-in-out;
}

.midnight .glow-effect {
  box-shadow: 
    0 0 20px rgba(59, 130, 246, 0.3),
    0 0 40px rgba(59, 130, 246, 0.1),
    0 0 80px rgba(59, 130, 246, 0.05);
}

/* Floating Orbs */
.floating-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  animation: float 6s ease-in-out infinite;
  opacity: 0;
  pointer-events: none;
}

.midnight .floating-orb {
  opacity: 1;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
}

/* Grid Pattern */
.grid-pattern {
  background-size: 50px 50px;
}

.light .grid-pattern {
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
}

.dark .grid-pattern {
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px);
}

.midnight .grid-pattern {
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
}
`;
}

/**
 * Inject theme mode CSS into the document
 */
export function injectThemeModeCSS(): void {
  if (typeof window === 'undefined') return;

  const styleId = 'designers-theme-modes';
  let styleElement = document.getElementById(styleId) as HTMLStyleElement;
  
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }
  
  const css = generateAllThemeModesCSS() + '\n\n' + generateThemeAwareCSS();
  styleElement.textContent = css;
}
