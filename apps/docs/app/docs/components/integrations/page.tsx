import { CodeBlock } from '../../../../components/code-block'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Integrations - Designers',
  description: 'How to integrate Designers with popular UI libraries and frameworks.'
}

const exampleTailwind = `// tailwind.config.js
module.exports = {
  presets: [require('designers/tailwind')],
  // ...your config
}`

const exampleChakra = `import { chakraTheme } from 'designers/integrations/chakra'
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme(chakraTheme)
`

const exampleMantine = `import { mantineTheme } from 'designers/integrations/mantine'
import { MantineProvider } from '@mantine/core'

export function App({ children }) {
  return (
    <MantineProvider theme={mantineTheme}>
      {children}
    </MantineProvider>
  )
}`

const exampleMUI = `import { muiTheme } from 'designers/integrations/mui'
import { ThemeProvider } from '@mui/material/styles'

export function App({ children }) {
  return (
    <ThemeProvider theme={muiTheme}>
      {children}
    </ThemeProvider>
  )
}`

export default function IntegrationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Integrations</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Designers can be integrated with popular UI libraries and frameworks to provide a consistent design language and theme tokens across your stack.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Tailwind CSS</h2>
          <p className="mb-4 text-muted-foreground">
            Use Designers as a Tailwind preset for instant design token integration:
          </p>
          <CodeBlock code={exampleTailwind} language="js" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Chakra UI</h2>
          <p className="mb-4 text-muted-foreground">
            Use Designers tokens with Chakra UI by extending its theme:
          </p>
          <CodeBlock code={exampleChakra} language="tsx" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Mantine</h2>
          <p className="mb-4 text-muted-foreground">
            Integrate Designers with Mantine for a unified theme:
          </p>
          <CodeBlock code={exampleMantine} language="tsx" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Material UI (MUI)</h2>
          <p className="mb-4 text-muted-foreground">
            Use Designers tokens in your MUI theme:
          </p>
          <CodeBlock code={exampleMUI} language="tsx" />
        </section>

        <div className="rounded-lg bg-orange-50 dark:bg-orange-900/20 p-4 border border-orange-200 dark:border-orange-700 text-orange-900 dark:text-orange-200 mt-6">
          <strong>Tip:</strong> You can extend Designers integrations or create your own for any UI library using the exported tokens and utilities.
        </div>
      </div>
    </div>
  )
}
