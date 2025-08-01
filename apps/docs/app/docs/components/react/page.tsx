import { CodeBlock } from '../../../../components/code-block'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'React Integration - Designers',
  description: 'How to use Designers core components and hooks in your React applications.'
}

const exampleUseDesigners = `import { useDesigners } from 'designers/react'

export function MyComponent() {
  const { colors, typography } = useDesigners()
  return (
    <div style={{ color: colors.text.primary, fontFamily: typography.fontFamily }}>
      Hello from Designers!
    </div>
  )
}`

const exampleThemeProvider = `import { ThemeProvider } from 'designers/react'

export function App({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}`

const exampleButton = `import { Button } from 'designers/react'

export function DemoButton() {
  return <Button variant="primary">Click me</Button>
}`

export default function ReactIntegrationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">React Integration</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Designers provides first-class support for React. Use our hooks, providers, and components to build fully theme-aware, type-safe UIs in your React apps.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Using the <code>useDesigners</code> Hook</h2>
          <p className="mb-4 text-muted-foreground">
            Access design tokens and theme values directly in your React components:
          </p>
          <CodeBlock code={exampleUseDesigners} language="tsx" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">ThemeProvider</h2>
          <p className="mb-4 text-muted-foreground">
            Wrap your app with <code>ThemeProvider</code> to enable dark/light mode and custom themes:
          </p>
          <CodeBlock code={exampleThemeProvider} language="tsx" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">React Components</h2>
          <p className="mb-4 text-muted-foreground">
            Use Designers components as regular React components:
          </p>
          <CodeBlock code={exampleButton} language="tsx" />
        </section>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-200 mt-6">
          <strong>Tip:</strong> All Designers components are fully type-safe and support custom theming out of the box.
        </div>
      </div>
    </div>
  )
}
