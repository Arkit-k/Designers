'use client'

import { motion } from 'framer-motion'
import { Terminal, CheckCircle, AlertCircle } from 'lucide-react'
import { CodeBlock } from '../../../components/code-block'

const installCommands = {
  npm: 'npm install designers',
  yarn: 'yarn add designers',
  pnpm: 'pnpm add designers',
}

const quickStart = `# 1. Install
npm install designers

# 2. Initialize (optional)
npx designers init

# 3. Start using
import { ds } from 'designers';`

const cliSetup = `# Zero-config setup
npx designers init

✅ Detected: React + TypeScript + Tailwind
📦 Installing designers...
📁 Creating starter files...
🎨 Design system ready!

Quick start:
import { ds } from 'designers';
const styles = { color: ds.colors.blue[500] };`

const nextSteps = `// Start using design tokens immediately
import { ds } from 'designers';

// Use anywhere in your app
const styles = {
  color: ds.colors.blue[600],
  padding: ds.spacing[4],
  borderRadius: ds.radius.lg,
  boxShadow: ds.shadows.md
};

// Works with any CSS framework
<div style={styles}>
  Beautiful, consistent styling!
</div>

// Or with Tailwind (auto-synced)
<div className="text-blue-600 p-4 rounded-lg shadow-md">
  Tailwind with design tokens!
</div>`

export default function InstallationPage() {
  return (
    <div className="prose-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Installation</h1>
        <p className="text-xl text-muted-foreground">
          Get productive in 30 seconds. Zero configuration required.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2>Install & Go</h2>
        <p>
          One package, zero configuration. Works with any CSS framework:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {Object.entries(installCommands).map(([manager, command]) => (
            <div key={manager} className="border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm uppercase tracking-wider text-muted-foreground">
                  {manager}
                </span>
              </div>
              <CodeBlock code={command} language="bash" />
            </div>
          ))}
        </div>

        <CodeBlock code={quickStart} language="bash" />

        <div className="flex items-start space-x-3 p-4 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 rounded-lg my-6">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">
              That's it!
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300">
              No complex configuration. No overwhelming options. Just install and start using design tokens.
            </p>
          </div>
        </div>
      </motion.div>



      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2>Smart Setup (Optional)</h2>
        <p>
          Our CLI detects your project and sets up everything automatically:
        </p>
        <CodeBlock code={cliSetup} language="bash" />

        <div className="flex items-start space-x-3 p-4 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 rounded-lg my-6">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
              Zero Configuration
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              The CLI automatically detects your framework, TypeScript setup, and CSS solution.
              No questions, no decisions, just works.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2>Next Steps</h2>
        <p>
          After installation, you can start using Designers in your project:
        </p>
        <CodeBlock code={nextSteps} language="typescript" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 p-6 border border-border rounded-lg bg-muted/30"
      >
        <h3 className="text-lg font-semibold mb-3">Requirements</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>React 18.0.0 or higher</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>TypeScript 5.0.0 or higher (recommended)</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Tailwind CSS 3.0.0 or higher (optional but recommended)</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
