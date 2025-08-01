import { CodeBlock } from '../../../../components/code-block'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Animations Example - Designers',
  description: 'A practical example showing how to use Designers animation components in your app.'
}

const exampleFade = `import { Fade, Button } from 'designers/animations'
import { useState } from 'react'

export default function Example() {
  const [show, setShow] = useState(true)
  return (
    <div>
      <Button onClick={() => setShow(s => !s)}>
        Toggle
      </Button>
      <Fade in={show} duration={300}>
        <div style={{ marginTop: 16, padding: 16, background: '#f0f4ff', borderRadius: 8 }}>
          This content fades in and out
        </div>
      </Fade>
    </div>
  )
}`

const exampleSlide = `import { Slide, Button } from 'designers/animations'
import { useState } from 'react'

export default function Example() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button onClick={() => setOpen(o => !o)}>
        Toggle
      </Button>
      <Slide in={open} direction="up" duration={400}>
        <div style={{ marginTop: 16, padding: 16, background: '#e0ffe0', borderRadius: 8 }}>
          This content slides up and down
        </div>
      </Slide>
    </div>
  )
}`

export default function AnimationsExamplePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Animations Example</h1>
        <p className="text-lg text-muted-foreground mb-8">
          This page demonstrates how to use Designers animation components like <code>Fade</code> and <code>Slide</code> in a React app.
        </p>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Fade Example</h2>
          <CodeBlock code={exampleFade} language="tsx" />
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Slide Example</h2>
          <CodeBlock code={exampleSlide} language="tsx" />
        </section>
        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-700 text-green-900 dark:text-green-200 mt-6">
          <strong>Tip:</strong> You can combine multiple animation components for more complex effects.
        </div>
      </div>
    </div>
  )
}
