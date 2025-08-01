import { Metadata } from 'next'
import { CodeBlock } from '../../../components/code-block'
import { FeatureCard } from '../../../components/feature-card'
import { 
  Code, 
  Palette, 
  Zap, 
  Layers, 
  Sparkles,
  ExternalLink,
  Copy,
  Play
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Examples - Designers',
  description: 'Practical examples and code snippets showing how to use the Designers design system in real-world applications.',
}

const examples = [
  {
    title: 'Basic Setup',
    description: 'Get started with Designers in a new React project',
    category: 'Getting Started',
    icon: Code,
    code: `// Install designers
npm install designers

// Initialize configuration
npx designers init

// Use in your React app
import { Button, Card } from 'designers'
import { DesignersProvider } from 'designers/react'

function App() {
  return (
    <DesignersProvider>
      <Card>
        <Button variant="primary">Hello World</Button>
      </Card>
    </DesignersProvider>
  )
}`
  },
  {
    title: 'Tailwind Integration',
    description: 'Automatically sync design tokens with Tailwind CSS',
    category: 'Integration',
    icon: Palette,
    code: `// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    require('designers/tailwind-plugin')
  ]
}

// Your component
function MyComponent() {
  return (
    <div className="bg-primary-500 text-primary-50 p-spacing-md rounded-radius-lg">
      <h1 className="text-heading-h1 font-weight-bold">
        Styled with design tokens!
      </h1>
    </div>
  )
}`
  },
  {
    title: 'Custom Theme',
    description: 'Create and apply custom themes to your application',
    category: 'Theming',
    icon: Sparkles,
    code: `// designers.config.json
{
  "themes": {
    "brand": {
      "colors": {
        "primary": {
          "50": "#f0f9ff",
          "500": "#3b82f6",
          "900": "#1e3a8a"
        }
      },
      "typography": {
        "fontFamily": {
          "sans": ["Inter", "sans-serif"]
        }
      }
    }
  }
}

// Apply theme
import { useTheme } from 'designers/react'

function App() {
  const { setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme('brand')}>
      Apply Brand Theme
    </button>
  )
}`
  },
  {
    title: 'Animation System',
    description: 'Add smooth animations with Framer Motion integration',
    category: 'Animation',
    icon: Zap,
    code: `import { motion } from 'designers/animations'
import { Button } from 'designers'

function AnimatedButton() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button variant="primary">
        Animated Button
      </Button>
    </motion.div>
  )
}

// Or use pre-built animations
import { FadeIn, SlideUp } from 'designers/animations'

function AnimatedCard() {
  return (
    <FadeIn delay={0.2}>
      <SlideUp>
        <Card>Content with smooth animations</Card>
      </SlideUp>
    </FadeIn>
  )
}`
  },
  {
    title: 'Responsive Design',
    description: 'Build responsive layouts with design system utilities',
    category: 'Layout',
    icon: Layers,
    code: `import { Container, Grid, Stack } from 'designers'
import { useBreakpoint } from 'designers/react'

function ResponsiveLayout() {
  const { isMobile, isTablet } = useBreakpoint()
  
  return (
    <Container maxWidth="xl">
      <Grid 
        columns={{ mobile: 1, tablet: 2, desktop: 3 }}
        gap="lg"
      >
        <Stack spacing={isMobile ? "sm" : "lg"}>
          <h2>Responsive Content</h2>
          <p>Adapts to screen size automatically</p>
        </Stack>
      </Grid>
    </Container>
  )
}

// CSS-in-JS with responsive values
const styles = {
  padding: { mobile: "sm", desktop: "xl" },
  fontSize: { mobile: "sm", tablet: "md", desktop: "lg" }
}`
  },
  {
    title: 'Component Library Integration',
    description: 'Integrate with popular UI libraries like shadcn/ui',
    category: 'Integration',
    icon: ExternalLink,
    code: `// Install shadcn integration
npm install designers-integrations

// Configure in designers.config.json
{
  "integrations": {
    "shadcn": {
      "enabled": true,
      "components": ["button", "card", "input"]
    }
  }
}

// Use shadcn components with design tokens
import { Button } from "@/components/ui/button"
import { useDesigners } from 'designers/react'

function IntegratedComponent() {
  const { colors } = useDesigners()
  
  return (
    <Button 
      style={{ 
        backgroundColor: colors.primary[500],
        color: colors.primary[50]
      }}
    >
      Shadcn Button with Design Tokens
    </Button>
  )
}`
  }
]

export default function ExamplesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Examples</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Practical examples and code snippets to help you get the most out of the Designers design system.
          </p>
          
          <div className="flex flex-wrap gap-2">
            {['Getting Started', 'Integration', 'Theming', 'Animation', 'Layout'].map((category) => (
              <span
                key={category}
                className="inline-block px-3 py-1 text-sm bg-muted rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Examples Grid */}
        <div className="space-y-12">
          {examples.map((example, index) => (
            <div key={example.title} className="border rounded-lg overflow-hidden">
              {/* Example Header */}
              <div className="p-6 border-b bg-muted/30">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <example.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold">{example.title}</h3>
                        <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                          {example.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{example.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-ring">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-ring">
                      <Play className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Code Block */}
              <div className="p-0">
                <CodeBlock 
                  code={example.code} 
                  language="tsx"
                  className="rounded-none border-none"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Need More Examples?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Check out our interactive playground to experiment with components and see more advanced examples in action.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/playground"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-ring"
              >
                <Play className="mr-2 h-4 w-4" />
                Try Playground
              </a>
              <a
                href="https://github.com/arkitkarmokar/designers/tree/main/examples"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-ring"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                GitHub Examples
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
