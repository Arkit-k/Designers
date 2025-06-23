import { Metadata } from 'next'
import { CodeBlock } from '@/components/code-block'
import { FeatureCard } from '@/components/feature-card'
import { 
  Palette, 
  Type, 
  Layers, 
  Zap, 
  Sparkles, 
  Package,
  Settings,
  Code
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Components - Designers',
  description: 'Explore the comprehensive component library and design tokens available in the Designers design system.',
}

const componentCategories = [
  {
    title: 'Design Tokens',
    description: 'Core design tokens including colors, typography, spacing, and more.',
    icon: Palette,
    items: ['Colors', 'Typography', 'Spacing', 'Shadows', 'Border Radius', 'Breakpoints']
  },
  {
    title: 'Typography',
    description: 'Text styles, font families, and typographic scales.',
    icon: Type,
    items: ['Headings', 'Body Text', 'Captions', 'Code Text', 'Font Weights', 'Line Heights']
  },
  {
    title: 'Layout Components',
    description: 'Flexible layout components for building responsive interfaces.',
    icon: Layers,
    items: ['Container', 'Grid', 'Flex', 'Stack', 'Spacer', 'Divider']
  },
  {
    title: 'UI Components',
    description: 'Ready-to-use UI components with consistent styling.',
    icon: Package,
    items: ['Button', 'Input', 'Card', 'Modal', 'Dropdown', 'Navigation']
  },
  {
    title: 'Animations',
    description: 'Pre-built animations and motion components.',
    icon: Sparkles,
    items: ['Fade', 'Slide', 'Scale', 'Rotate', 'Bounce', 'Custom Transitions']
  },
  {
    title: 'Utilities',
    description: 'Utility functions and helper components.',
    icon: Settings,
    items: ['Theme Provider', 'Responsive Utilities', 'Color Utilities', 'Type Guards']
  }
]

const exampleCode = `import { Button, Card, Stack } from 'designers'
import { useDesigners } from 'designers/react'

export function MyComponent() {
  const { colors, typography } = useDesigners()
  
  return (
    <Card padding="lg" radius="md">
      <Stack spacing="md">
        <h2 style={{ ...typography.heading.h2 }}>
          Welcome to Designers
        </h2>
        <p style={{ color: colors.text.secondary }}>
          Build beautiful interfaces with our design system.
        </p>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </Stack>
    </Card>
  )
}`

export default function ComponentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Components</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Explore our comprehensive component library and design tokens. 
            Everything you need to build consistent, beautiful interfaces.
          </p>
          
          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50+</div>
              <div className="text-sm text-muted-foreground">Components</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">100+</div>
              <div className="text-sm text-muted-foreground">Design Tokens</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">20+</div>
              <div className="text-sm text-muted-foreground">Animations</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">5+</div>
              <div className="text-sm text-muted-foreground">Integrations</div>
            </div>
          </div>
        </div>

        {/* Component Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Component Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {componentCategories.map((category) => (
              <FeatureCard
                key={category.title}
                title={category.title}
                description={category.description}
                icon={category.icon}
                className="h-full"
              >
                <div className="mt-4">
                  <div className="text-sm font-medium mb-2">Includes:</div>
                  <div className="flex flex-wrap gap-1">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="inline-block px-2 py-1 text-xs bg-muted rounded-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FeatureCard>
            ))}
          </div>
        </div>

        {/* Usage Example */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Usage Example</h2>
          <div className="prose-custom">
            <p>
              Here's a quick example of how to use Designers components in your React application:
            </p>
          </div>
          <CodeBlock code={exampleCode} language="tsx" />
        </div>

        {/* Getting Started */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Ready to get started?</h3>
              <p className="text-muted-foreground mb-4">
                Install Designers and start building with our component library today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/docs/installation"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-ring"
                >
                  Installation Guide
                </a>
                <a
                  href="/docs/examples"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-ring"
                >
                  View Examples
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
