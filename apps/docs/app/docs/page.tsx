'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Package, Zap, Code, ExternalLink } from 'lucide-react'
import { CodeBlock } from '@/components/code-block'

const quickStartCode = `# Get started in 30 seconds
npm install designers

# Initialize your project
npx designers init

# Start using design tokens immediately
import { ds } from 'designers';`

const usageCode = `import { ds } from 'designers';

// Use design tokens anywhere
const styles = {
  color: ds.colors.blue[600],
  padding: ds.spacing[4],
  borderRadius: ds.radius.lg,
  boxShadow: ds.shadows.md
};

// Works with any CSS framework
<div style={styles}>
  Beautiful, consistent styling!
</div>`

const cliCode = `# Zero-config setup
npx designers init

✅ Detected: React + TypeScript + Tailwind
📦 Installing designers...
📁 Creating starter files...
🎨 Design system ready!

Quick start:
import { ds } from 'designers';
const styles = { color: ds.colors.blue[500] };`

export default function DocsPage() {
  return (
    <div className="prose-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>The design system developers love</h1>
        <p className="text-xl text-muted-foreground">
          Zero-config design tokens, unstyled components, and powerful integrations.
          Get productive in 30 seconds, not 30 minutes. Works with any CSS framework.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Link
          href="/docs/installation"
          className="group block p-6 glass-card hover:glow-effect transition-all duration-300 no-underline hover:scale-105"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Package className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              Quick Start
            </h3>
          </div>
          <p className="text-muted-foreground mb-3">
            Get up and running in minutes with our simple installation guide.
          </p>
          <div className="flex items-center text-primary text-sm font-medium">
            Get started <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </Link>

        <Link
          href="/docs/components"
          className="group block p-6 glass-card hover:glow-effect transition-all duration-300 no-underline hover:scale-105"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Code className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              Components
            </h3>
          </div>
          <p className="text-muted-foreground mb-3">
            Explore our comprehensive component library and APIs.
          </p>
          <div className="flex items-center text-primary text-sm font-medium">
            Browse components <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2>Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 midnight:bg-blue-500/20 midnight:border midnight:border-blue-500/30 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-green-600 midnight:bg-blue-400 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Zero Configuration</h4>
                <p className="text-sm text-muted-foreground">Works out of the box with smart defaults. No complex setup required.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 midnight:bg-blue-500/20 midnight:border midnight:border-blue-500/30 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-green-600 midnight:bg-blue-400 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-medium text-foreground">TypeScript Native</h4>
                <p className="text-sm text-muted-foreground">Full TypeScript support with amazing autocomplete and type safety.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 midnight:bg-blue-500/20 midnight:border midnight:border-blue-500/30 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-green-600 midnight:bg-blue-400 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Framework Agnostic</h4>
                <p className="text-sm text-muted-foreground">Works with Tailwind, CSS-in-JS, styled-components, or plain CSS.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 midnight:bg-blue-500/20 midnight:border midnight:border-blue-500/30 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-green-600 midnight:bg-blue-400 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Powerful Integrations</h4>
                <p className="text-sm text-muted-foreground">Auto-sync with Tailwind, VS Code IntelliSense, and Figma tokens.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 midnight:bg-blue-500/20 midnight:border midnight:border-blue-500/30 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-green-600 midnight:bg-blue-400 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Unstyled Components</h4>
                <p className="text-sm text-muted-foreground">Accessible components with behavior, you provide the styling.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 midnight:bg-blue-500/20 midnight:border midnight:border-blue-500/30 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-green-600 midnight:bg-blue-400 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Developer Experience</h4>
                <p className="text-sm text-muted-foreground">Built by developers, for developers. Saves time, not adds complexity.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2>Get Started in 30 Seconds</h2>
        <p>No complex configuration. No overwhelming options. Just install and go:</p>
        <CodeBlock code={quickStartCode} language="bash" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2>Use Anywhere</h2>
        <p>Design tokens that work with any CSS solution:</p>
        <CodeBlock code={usageCode} language="typescript" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2>Smart Setup</h2>
        <p>Our CLI detects your project and sets up everything automatically:</p>
        <CodeBlock code={cliCode} language="bash" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 p-6 glass-card"
      >
        <h3 className="text-lg font-semibold mb-3">What's Next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/docs/installation"
            className="flex items-center space-x-2 text-primary hover:underline"
          >
            <Package className="h-4 w-4" />
            <span>Installation Guide</span>
          </Link>
          <Link
            href="/docs/components"
            className="flex items-center space-x-2 text-primary hover:underline"
          >
            <Code className="h-4 w-4" />
            <span>Component Library</span>
          </Link>
          <Link
            href="/docs/examples"
            className="flex items-center space-x-2 text-primary hover:underline"
          >
            <Zap className="h-4 w-4" />
            <span>Examples</span>
          </Link>
          <Link
            href="https://github.com/arkitkarmokar/designers"
            className="flex items-center space-x-2 text-primary hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            <span>GitHub Repository</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
