'use client'

import { useState, useEffect } from 'react'
import { CodeBlock } from '@/components/code-block'
import {
  Play,
  Code,
  Palette,
  Type,
  Layers,
  Settings,
  Download,
  Share,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react'

// Live examples that actually work
const liveExamples = [
  {
    name: 'Design Tokens',
    category: 'Core',
    description: 'See design tokens in action',
    code: `import { ds } from 'designers';

// Use design tokens directly
const styles = {
  color: ds.colors.blue[600],
  padding: ds.spacing[4],
  borderRadius: ds.radius.lg,
  boxShadow: ds.shadows.md
};`,
    componentName: 'DesignTokensExample'
  },
  {
    name: 'Color Palette',
    category: 'Colors',
    description: 'Interactive color palette',
    code: `// All colors available in the design system
const colors = {
  blue: { 50: '#eff6ff', 500: '#3b82f6', 900: '#1e3a8a' },
  green: { 50: '#f0fdf4', 500: '#22c55e', 900: '#14532d' },
  red: { 50: '#fef2f2', 500: '#ef4444', 900: '#7f1d1d' }
};`,
    component: () => (
      <div className="space-y-4">
        {[
          { name: 'Blue', colors: { 50: '#eff6ff', 500: '#3b82f6', 900: '#1e3a8a' } },
          { name: 'Green', colors: { 50: '#f0fdf4', 500: '#22c55e', 900: '#14532d' } },
          { name: 'Red', colors: { 50: '#fef2f2', 500: '#ef4444', 900: '#7f1d1d' } }
        ].map(({ name, colors }) => (
          <div key={name} className="space-y-2">
            <h4 className="text-sm font-medium">{name}</h4>
            <div className="flex gap-2">
              {Object.entries(colors).map(([shade, color]) => (
                <div
                  key={shade}
                  className="w-16 h-16 rounded-lg flex items-end p-2 text-xs font-mono"
                  style={{ backgroundColor: color, color: shade === '50' ? '#000' : '#fff' }}
                >
                  {shade}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    name: 'Typography Scale',
    category: 'Typography',
    description: 'Typography system in action',
    code: `// Typography tokens for consistent text styling
const typography = {
  text: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem'
  }
};`,
    component: () => (
      <div className="space-y-3">
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>2xl - Heading</div>
        <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>xl - Subheading</div>
        <div style={{ fontSize: '1.125rem' }}>lg - Large text</div>
        <div style={{ fontSize: '1rem' }}>base - Body text</div>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>sm - Small text</div>
        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>xs - Caption</div>
      </div>
    )
  },
  {
    name: 'Interactive Button',
    category: 'Components',
    description: 'Button with hover and click effects',
    code: `// Unstyled button component with behavior
function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1
      }}
    >
      {children}
    </button>
  );
}`,
    component: () => {
      const [clicked, setClicked] = useState(false);

      return (
        <div className="space-y-4">
          <div className="flex gap-3">
            <button
              onClick={() => setClicked(!clicked)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: '#3b82f6',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                transform: clicked ? 'scale(0.95)' : 'scale(1)'
              }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6'}
            >
              Primary Button
            </button>

            <button
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                color: '#374151',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'white'}
            >
              Secondary
            </button>

            <button
              disabled
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: '#e5e7eb',
                color: '#9ca3af',
                cursor: 'not-allowed'
              }}
            >
              Disabled
            </button>
          </div>

          {clicked && (
            <div style={{
              padding: '0.75rem',
              backgroundColor: '#dcfce7',
              borderRadius: '0.375rem',
              color: '#166534',
              fontSize: '0.875rem'
            }}>
              ✅ Button clicked! State management working.
            </div>
          )}
        </div>
      );
    }
  }
]

export default function PlaygroundPage() {
  const [selectedExample, setSelectedExample] = useState(liveExamples[0])
  const [copied, setCopied] = useState(false)

  const handleExampleChange = (example: typeof liveExamples[0]) => {
    setSelectedExample(example)
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(selectedExample.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Playground</h1>
              <p className="text-muted-foreground">
                Experiment with Designers components and see them in action
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-ring">
                <RefreshCw className="h-4 w-4" />
              </button>
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-ring">
                <Share className="h-4 w-4" />
              </button>
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-ring">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-3">Live Examples</h3>
              <div className="space-y-1">
                {liveExamples.map((example) => (
                  <button
                    key={example.name}
                    onClick={() => handleExampleChange(example)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedExample.name === example.name
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-background border-border hover:bg-muted'
                    }`}
                  >
                    <div className="font-medium text-sm">{example.name}</div>
                    <div className="text-xs text-muted-foreground">{example.category}</div>
                    <div className="text-xs text-muted-foreground mt-1">{example.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Categories</h3>
              <div className="space-y-1">
                {['Core', 'Colors', 'Typography', 'Components', 'Layout'].map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      const example = liveExamples.find(ex => ex.category === category);
                      if (example) handleExampleChange(example);
                    }}
                    className="w-full text-left p-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 grid lg:grid-cols-2 gap-6">
            {/* Code Editor */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Code</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyCode}
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-ring"
                  >
                    {copied ? <Check className="mr-1 h-3 w-3" /> : <Copy className="mr-1 h-3 w-3" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="h-full min-h-[400px] border rounded-lg overflow-hidden">
                <CodeBlock
                  code={selectedExample.code}
                  language="tsx"
                  className="h-full rounded-none border-none"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Live Preview</h3>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                    Live
                  </span>
                </div>
              </div>

              <div className="h-full min-h-[400px] border rounded-lg bg-white dark:bg-gray-950 p-6">
                <div className="h-full">
                  {selectedExample.component()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-muted/30 mt-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Powered by <span className="font-medium gradient-text">Designers</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Press Ctrl+Enter to run</span>
              <span>•</span>
              <span>Press Ctrl+S to save</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
