import { CodeBlock } from '@/components/code-block'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Basic Example - Designers',
  description: 'A simple example showing how to use Designers components in your app.'
}

const exampleBasic = `import { Button, Card, Stack } from 'designers'

export default function Example() {
  return (
    <Card padding="lg" radius="md" shadow="sm">
      <Stack spacing="md">
        <h2>Hello Designers</h2>
        <p>This is a basic example using Card, Stack, and Button.</p>
        <Button variant="primary">Click Me</Button>
      </Stack>
    </Card>
  )
}`

export default function BasicExamplePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Basic Example</h1>
        <p className="text-lg text-muted-foreground mb-8">
          This page demonstrates a simple usage of Designers core components in a React app.
        </p>
        <CodeBlock code={exampleBasic} language="tsx" />
        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-700 text-green-900 dark:text-green-200 mt-6">
          <strong>Tip:</strong> You can compose Designers components to quickly build beautiful, consistent UIs.
        </div>
      </div>
    </div>
  )
}
