import { CodeBlock } from '@/components/code-block'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'shadcn/ui Integration Example - Designers',
  description: 'How to use Designers tokens and theming with shadcn/ui components.'
}

const exampleShadcnTheme = `import { shadcnTheme } from 'designers/integrations/shadcn'
import { ThemeProvider } from 'shadcn/ui'

export function App({ children }) {
  return (
    <ThemeProvider theme={shadcnTheme}>
      {children}
    </ThemeProvider>
  )
}`

const exampleButton = `<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md shadow hover:bg-primary/80">
  shadcn + Designers
</button>
`

export default function ShadcnExamplePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">shadcn/ui Integration Example</h1>
        <p className="text-lg text-muted-foreground mb-8">
          You can use Designers tokens and theming with <a href="https://ui.shadcn.com/" className="underline">shadcn/ui</a> components for a consistent design system across your app.
        </p>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Theme Integration</h2>
          <CodeBlock code={exampleShadcnTheme} language="tsx" />
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Usage Example</h2>
          <CodeBlock code={exampleButton} language="tsx" />
        </section>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-200 mt-6">
          <strong>Tip:</strong> You can combine shadcn/ui and Designers components, sharing the same theme tokens for a seamless look.
        </div>
      </div>
    </div>
  )
}
