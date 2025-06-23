/**
 * Basic usage example of Designers design system
 */

import React from 'react';
import { 
  DesignSystemProvider, 
  useDesignTokens, 
  useResponsive, 
  useColorScheme 
} from '@designers/react';

// Example component using design tokens
function Card({ children }: { children: React.ReactNode }) {
  const { colors, spacing, shadows, borderRadius } = useDesignTokens();
  
  return (
    <div
      style={{
        backgroundColor: colors.semantic.background.primary,
        color: colors.semantic.text.primary,
        padding: spacing[6],
        borderRadius: borderRadius.lg,
        boxShadow: shadows.md,
        border: `1px solid ${colors.semantic.border.primary}`,
      }}
    >
      {children}
    </div>
  );
}

// Responsive component example
function ResponsiveGrid({ children }: { children: React.ReactNode }) {
  const { resolve } = useResponsive();
  const { spacing } = useDesignTokens();
  
  const columns = resolve({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
  });
  
  const gap = resolve({
    xs: spacing[4],
    md: spacing[6],
  });
  
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {children}
    </div>
  );
}

// Theme toggle component
function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useColorScheme();
  const { colors, spacing, borderRadius } = useDesignTokens();
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: colors.semantic.interactive.primary,
        color: colors.semantic.text.inverse,
        border: 'none',
        padding: `${spacing[2]} ${spacing[4]}`,
        borderRadius: borderRadius.md,
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: 500,
      }}
    >
      {isDark ? '☀️' : '🌙'} Switch to {isDark ? 'light' : 'dark'} mode
    </button>
  );
}

// Typography showcase
function TypographyShowcase() {
  const { typography, colors } = useDesignTokens();
  
  return (
    <div>
      <h1 
        style={{
          ...typography.heading.h1,
          color: colors.semantic.text.primary,
          margin: 0,
          marginBottom: '1rem',
        }}
      >
        Display Heading
      </h1>
      
      <h2 
        style={{
          ...typography.heading.h2,
          color: colors.semantic.text.primary,
          margin: 0,
          marginBottom: '0.75rem',
        }}
      >
        Section Heading
      </h2>
      
      <p 
        style={{
          ...typography.body.base,
          color: colors.semantic.text.secondary,
          margin: 0,
          marginBottom: '1rem',
        }}
      >
        This is body text that demonstrates the typography system. 
        It scales fluidly across different screen sizes and maintains 
        optimal readability.
      </p>
      
      <code 
        style={{
          ...typography.code.base,
          fontFamily: typography.fontFamily.mono.join(', '),
          backgroundColor: colors.semantic.background.secondary,
          color: colors.semantic.text.primary,
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
        }}
      >
        const example = 'code snippet';
      </code>
    </div>
  );
}

// Color palette showcase
function ColorPalette() {
  const { colors } = useDesignTokens();
  const { spacing, borderRadius } = useDesignTokens();
  
  const colorScales = [
    { name: 'Primary', scale: colors.primary },
    { name: 'Gray', scale: colors.gray },
    { name: 'Success', scale: colors.success },
    { name: 'Warning', scale: colors.warning },
    { name: 'Error', scale: colors.error },
  ];
  
  return (
    <div>
      <h3 style={{ marginBottom: spacing[4] }}>Color Scales</h3>
      {colorScales.map(({ name, scale }) => (
        <div key={name} style={{ marginBottom: spacing[4] }}>
          <h4 style={{ marginBottom: spacing[2] }}>{name}</h4>
          <div style={{ display: 'flex', gap: spacing[1] }}>
            {Object.entries(scale).map(([key, value]) => (
              <div
                key={key}
                style={{
                  width: '2rem',
                  height: '2rem',
                  backgroundColor: value,
                  borderRadius: borderRadius.sm,
                  border: '1px solid rgba(0,0,0,0.1)',
                }}
                title={`${name} ${key}: ${value}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Responsive info component
function ResponsiveInfo() {
  const { state } = useResponsive();
  const { colors, spacing, borderRadius } = useDesignTokens();
  
  return (
    <div
      style={{
        backgroundColor: colors.semantic.background.secondary,
        padding: spacing[4],
        borderRadius: borderRadius.md,
        fontFamily: 'monospace',
        fontSize: '0.875rem',
      }}
    >
      <div>Breakpoint: <strong>{state.breakpoint}</strong></div>
      <div>Viewport: <strong>{state.width}×{state.height}</strong></div>
      <div>Device: <strong>
        {state.isMobile && 'Mobile'}
        {state.isTablet && 'Tablet'}
        {state.isDesktop && 'Desktop'}
      </strong></div>
      <div>Orientation: <strong>{state.orientation}</strong></div>
    </div>
  );
}

// Main example app
function ExampleApp() {
  const { spacing } = useDesignTokens();
  
  return (
    <div style={{ padding: spacing[6], maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: spacing[8] 
      }}>
        <h1>Designers Design System</h1>
        <ThemeToggle />
      </div>
      
      <ResponsiveGrid>
        <Card>
          <TypographyShowcase />
        </Card>
        
        <Card>
          <ColorPalette />
        </Card>
        
        <Card>
          <h3>Responsive Info</h3>
          <ResponsiveInfo />
        </Card>
        
        <Card>
          <h3>Interactive Elements</h3>
          <div style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap' }}>
            <button style={{ padding: spacing[2] }}>Primary</button>
            <button style={{ padding: spacing[2] }}>Secondary</button>
            <button style={{ padding: spacing[2] }}>Tertiary</button>
          </div>
        </Card>
      </ResponsiveGrid>
    </div>
  );
}

// Root app with provider
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
      <ExampleApp />
    </DesignSystemProvider>
  );
}
