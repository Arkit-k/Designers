/**
 * Theme adapters for different UI libraries
 */

export interface ThemeAdapter {
  name: string;
  transform: (tokens: any) => any;
}

export const shadcnAdapter: ThemeAdapter = {
  name: 'shadcn',
  transform: (tokens) => {
    return {
      colors: tokens.colors,
      spacing: tokens.spacing,
      typography: tokens.typography
    };
  }
};

export const muiAdapter: ThemeAdapter = {
  name: 'mui',
  transform: (tokens) => {
    return {
      palette: tokens.colors,
      spacing: tokens.spacing,
      typography: tokens.typography
    };
  }
};

export const chakraAdapter: ThemeAdapter = {
  name: 'chakra',
  transform: (tokens) => {
    return {
      colors: tokens.colors,
      space: tokens.spacing,
      fonts: tokens.typography
    };
  }
};

export const mantineAdapter: ThemeAdapter = {
  name: 'mantine',
  transform: (tokens) => {
    return {
      colors: tokens.colors,
      spacing: tokens.spacing,
      fontFamily: tokens.typography
    };
  }
};

export const themeAdapters = {
  shadcn: shadcnAdapter,
  mui: muiAdapter,
  chakra: chakraAdapter,
  mantine: mantineAdapter
};
