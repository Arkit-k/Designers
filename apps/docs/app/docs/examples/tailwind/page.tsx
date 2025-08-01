import { CodeBlock } from '../../../../components/code-block'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tailwind Integration Example - Designers',
  description: 'How to use Designers with Tailwind CSS for utility-first styling and design tokens.'
}

const exampleTailwindConfig = `// tailwind.config.js
module.exports = {
  presets: [require('designers/tailwind')],
  // ...your config
}`

const exampleUsage = `<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md shadow hover:bg-primary/80">
  Tailwind + Designers
</button>
`

export default function TailwindExamplePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Tailwind Integration Example</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Designers can be used as a Tailwind CSS preset, giving you access to all design tokens as utility classes. This makes it easy to build consistent UIs with utility-first styling.
        </p>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Configure Tailwind</h2>
          <CodeBlock code={exampleTailwindConfig} language="js" />
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Usage Example</h2>
          <CodeBlock code={exampleUsage} language="tsx" />
        </section>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-200 mt-6">
          <strong>Tip:</strong> You can combine Designers React components and Tailwind utility classes for maximum flexibility.
        </div>
      </div>
    </div>
  )
}
