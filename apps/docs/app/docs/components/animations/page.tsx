import { CodeBlock } from '@/components/code-block'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Animations - Designers',
  description: 'How to use built-in animation components and utilities in the Designers design system.'
}

const exampleFade = `import { Fade } from 'designers/animations'

export function DemoFade({ show, children }) {
  return (
    <Fade in={show} duration={300}>
      {children}
    </Fade>
  )
}`

const exampleSlide = `import { Slide } from 'designers/animations'

export function DemoSlide({ open, children }) {
  return (
    <Slide in={open} direction="up" duration={400}>
      {children}
    </Slide>
  )
}`

const exampleCustom = `import { motion } from 'framer-motion'

export function CustomAnimation({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  )
}`

export default function AnimationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Animations</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Designers provides pre-built animation components and utilities to help you add motion and transitions to your UI with ease. All animations are theme-aware and accessible by default.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Fade Animation</h2>
          <p className="mb-4 text-muted-foreground">
            Use <code>Fade</code> to animate the appearance and disappearance of elements:
          </p>
          <CodeBlock code={exampleFade} language="tsx" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Slide Animation</h2>
          <p className="mb-4 text-muted-foreground">
            Use <code>Slide</code> for sliding transitions in any direction:
          </p>
          <CodeBlock code={exampleSlide} language="tsx" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Custom Animations</h2>
          <p className="mb-4 text-muted-foreground">
            You can also use <code>framer-motion</code> directly for custom animations:
          </p>
          <CodeBlock code={exampleCustom} language="tsx" />
        </section>

        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-700 text-green-900 dark:text-green-200 mt-6">
          <strong>Tip:</strong> All animation components support custom durations, delays, and can be composed for complex effects.
        </div>
      </div>
    </div>
  )
}
