/**
 * 🔧 VS Code Integration
 * 
 * Provides IntelliSense, autocomplete, and validation for design tokens.
 */

import { ds } from 'designers-core';

/**
 * Generate VS Code settings for design system autocomplete
 * 
 * @example
 * ```json
 * // .vscode/settings.json
 * {
 *   "typescript.suggest.includeCompletionsForModuleExports": true,
 *   "typescript.preferences.includePackageJsonAutoImports": "auto"
 * }
 * ```
 */
export const vscodeSettings = {
  "typescript.suggest.includeCompletionsForModuleExports": true,
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "css.customData": [".vscode/designers-css-data.json"],
  "scss.customData": [".vscode/designers-css-data.json"],
  "less.customData": [".vscode/designers-css-data.json"],
  "emmet.extensionsPath": [".vscode/"],
  "files.associations": {
    "designers.config.json": "jsonc"
  }
};

/**
 * Generate CSS custom data for VS Code IntelliSense
 */
export function generateCSSCustomData() {
  const properties: any[] = [];
  const pseudoClasses: any[] = [];
  const pseudoElements: any[] = [];
  
  // Add design system CSS custom properties
  Object.entries(ds.colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'string') {
      properties.push({
        name: `--ds-color-${colorName}`,
        description: `Design system color: ${colorName}`,
        syntax: "<color>",
        values: [{ name: colorValue, description: `${colorName} color` }]
      });
    } else {
      Object.entries(colorValue).forEach(([shade, value]) => {
        properties.push({
          name: `--ds-color-${colorName}-${shade}`,
          description: `Design system color: ${colorName}.${shade}`,
          syntax: "<color>",
          values: [{ name: value, description: `${colorName} ${shade}` }]
        });
      });
    }
  });
  
  // Add spacing properties
  Object.entries(ds.spacing).forEach(([key, value]) => {
    properties.push({
      name: `--ds-spacing-${key}`,
      description: `Design system spacing: ${key}`,
      syntax: "<length>",
      values: [{ name: value, description: `Spacing ${key}` }]
    });
  });
  
  return {
    version: 1.1,
    properties,
    atDirectives: [],
    pseudoClasses,
    pseudoElements
  };
}

/**
 * Generate TypeScript declaration file for design tokens
 */
export function generateTypeDeclarations(): string {
  return `
declare module 'designers' {
  export interface DesignTokens {
    colors: {
      ${Object.entries(ds.colors).map(([name, value]) => {
        if (typeof value === 'string') {
          return `${name}: '${value}';`;
        } else {
          return `${name}: {
            ${Object.entries(value).map(([shade, color]) => 
              `${shade}: '${color}';`
            ).join('\n        ')}
          };`;
        }
      }).join('\n      ')}
    };
    spacing: {
      ${Object.entries(ds.spacing).map(([key, value]) => 
        `'${key}': '${value}';`
      ).join('\n      ')}
    };
    typography: {
      font: {
        ${Object.entries(ds.typography.font).map(([key, value]) => 
          `${key}: string[];`
        ).join('\n        ')}
      };
      text: {
        ${Object.entries(ds.typography.text).map(([key, value]) => 
          `${key}: '${value}';`
        ).join('\n        ')}
      };
      weight: {
        ${Object.entries(ds.typography.weight).map(([key, value]) => 
          `${key}: '${value}';`
        ).join('\n        ')}
      };
      leading: {
        ${Object.entries(ds.typography.leading).map(([key, value]) => 
          `${key}: '${value}';`
        ).join('\n        ')}
      };
    };
    breakpoints: {
      ${Object.entries(ds.breakpoints).map(([key, value]) => 
        `${key}: '${value}';`
      ).join('\n      ')}
    };
    shadows: {
      ${Object.entries(ds.shadows).map(([key, value]) => 
        `${key}: '${value}';`
      ).join('\n      ')}
    };
    radius: {
      ${Object.entries(ds.radius).map(([key, value]) => 
        `${key}: '${value}';`
      ).join('\n      ')}
    };
    transitions: {
      ${Object.entries(ds.transitions).map(([key, value]) => 
        `${key}: '${value}';`
      ).join('\n      ')}
    };
  }
  
  export const ds: DesignTokens;
}

declare module 'designers/components' {
  import { ComponentType } from 'react';
  
  export const Box: ComponentType<any>;
  export const Stack: ComponentType<any>;
  export const Cluster: ComponentType<any>;
  export const Button: ComponentType<any>;
  export const Input: ComponentType<any>;
  // Add more component types as needed
}
`;
}

/**
 * Generate JSON schema for designers.config.json
 */
export function generateConfigSchema() {
  return {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Designers Configuration",
    "description": "Configuration file for the Designers design system",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Name of your design system"
      },
      "version": {
        "type": "string",
        "description": "Version of your design system"
      },
      "framework": {
        "type": "string",
        "enum": ["react", "next", "vite", "auto"],
        "description": "Framework being used"
      },
      "typescript": {
        "type": "boolean",
        "description": "Whether TypeScript is enabled"
      },
      "css": {
        "type": "object",
        "properties": {
          "framework": {
            "type": "string",
            "enum": ["css", "tailwind", "styled-components", "emotion"],
            "description": "CSS framework being used"
          },
          "output": {
            "type": "string",
            "description": "Output directory for generated CSS"
          }
        }
      },
      "theme": {
        "type": "object",
        "properties": {
          "colors": {
            "type": "object",
            "description": "Custom color overrides",
            "patternProperties": {
              "^[a-zA-Z][a-zA-Z0-9]*$": {
                "type": "string",
                "pattern": "^#[0-9a-fA-F]{6}$"
              }
            }
          }
        }
      },
      "build": {
        "type": "object",
        "properties": {
          "watch": {
            "type": "boolean",
            "description": "Enable watch mode for development"
          },
          "minify": {
            "type": "boolean",
            "description": "Minify generated output"
          }
        }
      }
    },
    "required": ["name", "version"]
  };
}

/**
 * Setup VS Code workspace for optimal design system development
 */
export async function setupVSCodeWorkspace() {
  const fs = await import('fs-extra');
  const path = await import('path');
  
  // Create .vscode directory
  await fs.ensureDir('.vscode');
  
  // Write settings.json
  await fs.writeJson('.vscode/settings.json', vscodeSettings, { spaces: 2 });
  
  // Write CSS custom data
  await fs.writeJson('.vscode/designers-css-data.json', generateCSSCustomData(), { spaces: 2 });
  
  // Write TypeScript declarations
  await fs.writeFile('.vscode/designers.d.ts', generateTypeDeclarations());
  
  // Write JSON schema
  await fs.writeJson('.vscode/designers-schema.json', generateConfigSchema(), { spaces: 2 });
  
  console.log('✅ VS Code workspace configured for Designers!');
  console.log('🔥 You now have:');
  console.log('  • IntelliSense for design tokens');
  console.log('  • Autocomplete for CSS custom properties');
  console.log('  • JSON schema validation for config files');
  console.log('  • TypeScript declarations for components');
}
