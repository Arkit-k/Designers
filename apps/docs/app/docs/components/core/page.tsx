import { CodeBlock } from '@/components/code-block'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Core Components - Designers',
  description: 'Detailed documentation and examples for the core components in the Designers design system.'
}

const exampleProfileCard = `import { Card, Stack, Button } from 'designers'

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
}`

const exampleLayout = `import { Grid, Stack, Card } from 'designers'

export function TeamGrid({ members }) {
  return (
    <Grid columns={3} gap="lg">
      {members.map(member => (
        <Card key={member.id} padding="md">
          <Stack spacing="sm">
            <img src={member.avatar} alt={member.name} style={{ borderRadius: '50%', width: 48, height: 48 }} />
            <h4>{member.name}</h4>
            <p>{member.role}</p>
          </Stack>
        </Card>
      ))}
    </Grid>
  )
}`

export default function CoreComponentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Core Components</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Core components are the foundation of the Designers system. They provide flexible, theme-aware building blocks for layout, UI, and interactivity. Use them to compose your own custom components and interfaces with full type safety and theming support.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Button</strong>: For actions and forms, supports variants, sizes, and icons.</li>
            <li><strong>Card</strong>: For grouping content, with padding, radius, and shadow options.</li>
            <li><strong>Stack</strong>: For vertical spacing and layout, replaces manual margins.</li>
            <li><strong>Grid</strong>: For responsive layouts, columns, and gaps.</li>
            <li><strong>ThemeProvider</strong>: For enabling dark/light mode and custom themes.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3">Example: Profile Card</h2>
          <p className="mb-4 text-muted-foreground">
            This example shows how to compose a user profile card using <code>Card</code>, <code>Stack</code>, and <code>Button</code>:
          </p>
          <CodeBlock code={exampleProfileCard} language="tsx" />
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3">Example: Team Grid Layout</h2>
          <p className="mb-4 text-muted-foreground">
            Use <code>Grid</code> and <code>Stack</code> to build responsive layouts for lists or teams:
          </p>
          <CodeBlock code={exampleLayout} language="tsx" />
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3">Best Practices</h2>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li>Use <code>Stack</code> and <code>Grid</code> for all layouts—avoid manual margins and CSS grid unless needed.</li>
            <li>Customize <code>Button</code> and <code>Card</code> with props for variant, size, radius, and shadow.</li>
            <li>Wrap your app in <code>ThemeProvider</code> to enable theme switching and token awareness.</li>
            <li>All core components are fully type-safe and support custom theming via config.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3">Theming & Customization</h2>
          <p className="mb-4 text-muted-foreground">
            All core components are theme-aware. You can customize colors, spacing, and typography via the Designers config or by wrapping your app in <code>ThemeProvider</code>.
          </p>
        </section>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-200 mt-6">
          <strong>Tip:</strong> Core components are composable—use them together to build complex UIs with minimal custom CSS.
        </div>
      </div>
    </div>
  )
}
