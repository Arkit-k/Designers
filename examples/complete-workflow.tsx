/**
 * Complete Designers Workflow Example
 * 
 * This example shows the complete workflow from:
 * 1. designers.config.json configuration
 * 2. Tailwind CSS integration
 * 3. UI library import (shadcn/ui)
 * 4. Component usage with design system
 */

import React from 'react';
import { 
  DesignSystemProvider, 
  useDesignTokens, 
  useResponsive, 
  useColorScheme 
} from '@designers/react';
import { IntegrationProvider } from '@designers/integrations';
import { shadcnComponents } from '@designers/integrations/shadcn';

// Step 1: Import UI components (auto-generated from CLI)
import { Button, Card, Input, Badge } from './components/ui';

// Step 2: Create your app components using design system + UI library
function Dashboard() {
  const { colors, spacing, typography } = useDesignTokens();
  const { state, resolve } = useResponsive();
  const { toggleTheme, isDark } = useColorScheme();
  
  // Responsive values using design system
  const cardPadding = resolve({
    xs: spacing[4],
    md: spacing[6],
    lg: spacing[8],
  });
  
  const gridCols = resolve({
    xs: 1,
    md: 2,
    lg: 3,
  });
  
  return (
    <div 
      className="min-h-screen bg-semantic-primary text-semantic-primary"
      style={{ padding: cardPadding }}
    >
      {/* Header with theme toggle */}
      <header className="flex justify-between items-center mb-8">
        <h1 
          className="text-semantic-primary font-bold"
          style={typography.heading.h1}
        >
          Designers + shadcn/ui
        </h1>
        
        <div className="flex items-center gap-4">
          <Badge variant="secondary">
            {state.breakpoint.toUpperCase()}
          </Badge>
          
          <Button 
            variant="outline" 
            size="md"
            onClick={toggleTheme}
          >
            {isDark ? '☀️' : '🌙'} {isDark ? 'Light' : 'Dark'} Mode
          </Button>
        </div>
      </header>
      
      {/* Main content grid */}
      <div 
        className="grid gap-6"
        style={{ 
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        }}
      >
        {/* Feature Card 1 */}
        <Card variant="elevated" size="lg">
          <div className="space-y-4">
            <h3 className="text-semantic-primary text-xl font-semibold">
              Design Tokens
            </h3>
            <p className="text-semantic-secondary">
              Centralized design tokens from designers.config.json
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: colors.primary[500] }}
                />
                <span className="text-sm">Primary: {colors.primary[500]}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: colors.semantic.interactive.primary }}
                />
                <span className="text-sm">Interactive Primary</span>
              </div>
            </div>
            
            <Button variant="primary" size="sm">
              View Tokens
            </Button>
          </div>
        </Card>
        
        {/* Feature Card 2 */}
        <Card variant="outlined" size="lg">
          <div className="space-y-4">
            <h3 className="text-semantic-primary text-xl font-semibold">
              Responsive Design
            </h3>
            <p className="text-semantic-secondary">
              Auto-responsive values and breakpoint detection
            </p>
            
            <div className="space-y-2 text-sm">
              <div>Current: <Badge variant="default">{state.breakpoint}</Badge></div>
              <div>Width: {state.width}px</div>
              <div>Device: {state.isMobile ? 'Mobile' : state.isTablet ? 'Tablet' : 'Desktop'}</div>
            </div>
            
            <Button variant="secondary" size="sm">
              Learn More
            </Button>
          </div>
        </Card>
        
        {/* Feature Card 3 */}
        <Card variant="default" size="lg">
          <div className="space-y-4">
            <h3 className="text-semantic-primary text-xl font-semibold">
              UI Integration
            </h3>
            <p className="text-semantic-secondary">
              shadcn/ui components with automatic theming
            </p>
            
            <div className="space-y-3">
              <Input 
                placeholder="Try typing here..."
                className="w-full"
              />
              
              <div className="flex gap-2 flex-wrap">
                <Button variant="primary" size="sm">Primary</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
              </div>
              
              <div className="flex gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Error</Badge>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Stats Card */}
        <Card variant="elevated" size="lg" className="md:col-span-2 lg:col-span-3">
          <div className="space-y-6">
            <h3 className="text-semantic-primary text-xl font-semibold">
              Design System Stats
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-semantic-primary">
                  {Object.keys(colors.primary).length}
                </div>
                <div className="text-sm text-semantic-secondary">Color Shades</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-semantic-primary">
                  {Object.keys(spacing).length}
                </div>
                <div className="text-sm text-semantic-secondary">Spacing Values</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-semantic-primary">
                  {Object.keys(typography.fontSize).length}
                </div>
                <div className="text-sm text-semantic-secondary">Font Sizes</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-semantic-primary">
                  {state.breakpoint}
                </div>
                <div className="text-sm text-semantic-secondary">Current Breakpoint</div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button variant="primary" size="lg">
                Explore Design System
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-semantic-tertiary text-sm">
          Built with Designers + shadcn/ui + Tailwind CSS
        </p>
        <p className="text-semantic-tertiary text-xs mt-2">
          All styling automatically generated from designers.config.json
        </p>
      </footer>
    </div>
  );
}

// Step 3: Setup providers (auto-generated from CLI)
function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <IntegrationProvider
      library="shadcn"
      components={shadcnComponents}
      config={{
        name: 'shadcn',
        theme: 'inherit',
      }}
    >
      {children}
    </IntegrationProvider>
  );
}

// Step 4: Main App with all providers
export default function App() {
  return (
    <DesignSystemProvider
      config={{
        theme: 'light',
        autoDetectColorScheme: true,
        autoDetectBreakpoint: true,
        injectGlobalStyles: true,
      }}
    >
      <UIProvider>
        <Dashboard />
      </UIProvider>
    </DesignSystemProvider>
  );
}

/**
 * Complete Setup Commands:
 * 
 * 1. Initialize Designers:
 *    npx designers init
 * 
 * 2. Setup Tailwind integration:
 *    npx designers tailwind --watch
 * 
 * 3. Import shadcn/ui components:
 *    npx designers import --library shadcn --components button card input badge
 * 
 * 4. Export design tokens:
 *    npx designers export css --output public/tokens.css
 * 
 * 5. Use components as shown above!
 * 
 * The entire design system is controlled from designers.config.json:
 * - Colors, typography, spacing, effects
 * - Component variants and sizes  
 * - UI library integrations
 * - Tailwind CSS generation
 * - Theme switching
 * - Responsive breakpoints
 * 
 * Zero manual configuration needed! 🎉
 */
