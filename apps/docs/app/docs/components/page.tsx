import { Metadata } from 'next'
import { CodeBlock } from '@/components/code-block'
import { FeatureCard } from '@/components/feature-card'


export const metadata: Metadata = {
  title: 'Components - Designers',
  description: 'Explore the comprehensive component library and design tokens available in the Designers design system.',
}

const componentCategories = [
  {
    title: 'Design Tokens',
    description: 'Core design tokens including colors, typography, spacing, and more.',
    iconName: 'Palette',
    items: ['Colors', 'Typography', 'Spacing', 'Shadows', 'Border Radius', 'Breakpoints']
  },
  {
    title: 'Typography',
    description: 'Text styles, font families, and typographic scales.',
    iconName: 'Type',
    items: ['Headings', 'Body Text', 'Captions', 'Code Text', 'Font Weights', 'Line Heights']
  },
  {
    title: 'Layout Components',
    description: 'Flexible layout components for building responsive interfaces.',
    iconName: 'Layers',
    items: ['Container', 'Grid', 'Flex', 'Stack', 'Spacer', 'Divider']
  },
  {
    title: 'UI Components',
    description: 'Ready-to-use UI components with consistent styling.',
    iconName: 'Package',
    items: ['Button', 'Input', 'Card', 'Modal', 'Dropdown', 'Navigation']
  },
  {
    title: 'Animations',
    description: 'Pre-built animations and motion components.',
    iconName: 'Sparkles',
    items: ['Fade', 'Slide', 'Scale', 'Rotate', 'Bounce', 'Custom Transitions']
  },
  {
    title: 'Utilities',
    description: 'Utility functions and helper components.',
    iconName: 'Settings',
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
                iconName={category.iconName}
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

        {/* Core Components Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Core Components</h2>
          <div className="prose-custom mb-4">
            <p>
              <strong>Core components</strong> are the building blocks of the Designers system. They provide flexible, theme-aware primitives for layout, UI, and interactivity. Use them to compose your own custom components and interfaces.
            </p>
          </div>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Button</strong>: For actions and forms, supports variants, sizes, and icons.</li>
            <li><strong>Card</strong>: For grouping content, with padding, radius, and shadow options.</li>
            <li><strong>Stack</strong>: For vertical spacing and layout, replaces manual margins.</li>
            <li><strong>Grid</strong>: For responsive layouts, columns, and gaps.</li>
            <li><strong>ThemeProvider</strong>: For enabling dark/light mode and custom themes.</li>
          </ul>
          <h3 className="mt-6 mb-2">Example: Composing Core Components</h3>
          <CodeBlock
            code={`import { Button, Card, Stack, Grid, ThemeProvider } from 'designers'

export function ProfileCard({ user }) {
  return (
    <Card padding="lg" radius="xl" shadow="md">
      <Stack spacing="md">
        <img src={user.avatar} alt="Avatar" style={{ borderRadius: '50%', width: 64, height: 64 }} />
        <h3>{user.name}</h3>
        <p style={{ color: '#666' }}>{user.bio}</p>
        <Button variant="primary">Follow</Button>
      </Stack>
    </Card>
  )
}

// Using ThemeProvider at the root
export function App() {
  return (
    <ThemeProvider>
      <Grid columns={2} gap="lg">
        <ProfileCard user={{ name: 'Jane', avatar: '/avatar.jpg', bio: 'Designer' }} />
        <ProfileCard user={{ name: 'John', avatar: '/avatar2.jpg', bio: 'Developer' }} />
      </Grid>
    </ThemeProvider>
  )
}`}
            language="tsx"
          />
          <h3 className="mt-8 mb-2">Tips & Best Practices</h3>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li>Use <code>Stack</code> and <code>Grid</code> for all layouts—avoid manual margins and CSS grid unless needed.</li>
            <li>Customize <code>Button</code> and <code>Card</code> with props for variant, size, radius, and shadow.</li>
            <li>Wrap your app in <code>ThemeProvider</code> to enable theme switching and token awareness.</li>
            <li>All core components are fully type-safe and support custom theming via config.</li>
          </ul>
          <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-700 text-green-900 dark:text-green-200 mt-6">
            <strong>Pro Tip:</strong> You can extend core components or create your own by composing them together. See the <a href="/docs/examples" className="underline">Examples</a> page for inspiration.
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
              <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16.53 7.5c.47-1.1.47-2.4-.53-3.4-1.2-1.2-3.1-1.2-4.2 0l-7.1 7.1c-1.2 1.2-1.2 3.1 0 4.2 1.2 1.2 3.1 1.2 4.2 0l.7-.7" />
                <path d="M6.5 17.5c.47 1.1 1.77 1.5 2.77.5l7.1-7.1c1.2-1.2 1.2-3.1 0-4.2-1.2-1.2-3.1-1.2-4.2 0l-.7.7" />
              </svg>
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
