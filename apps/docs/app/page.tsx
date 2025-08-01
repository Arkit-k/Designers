'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Github, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/code-block'

const installCode = `npm install designers`

const usageCode = `import designers from 'designers'
import { useTheme, ThemeProvider } from 'designers/react'
import { fadeIn, slideUp } from 'designers/animations'
import tailwindPlugin from 'designers/tailwind-plugin'

// Use the CLI to initialize
npx designers init`

const features = [
  {
    iconName: 'Package',
    title: 'Complete Package',
    description: 'Everything you need in one install - core tokens, React components, animations, and integrations.',
  },
  {
    iconName: 'Zap',
    title: 'Lightning Fast',
    description: 'Optimized for performance with tree-shaking, minimal bundle size, and efficient rendering.',
  },
  {
    iconName: 'Palette',
    title: 'Design Tokens',
    description: 'Comprehensive design system with colors, typography, spacing, and responsive breakpoints.',
  },
  {
    iconName: 'Code',
    title: 'Developer Experience',
    description: 'Full TypeScript support, excellent IntelliSense, and comprehensive documentation.',
  },
  {
    iconName: 'Sparkles',
    title: 'Animations',
    description: 'Built-in support for Framer Motion and GSAP with pre-configured animation presets.',
  },
  {
    iconName: 'ExternalLink',
    title: 'UI Integrations',
    description: 'Seamless integration with shadcn/ui, Material-UI, Chakra UI, and Mantine.',
  },
]

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient min-h-screen flex items-center">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>

        {/* Floating Orbs */}
        <div className="floating-orb floating-orb-1"></div>
        <div className="floating-orb floating-orb-2"></div>
        <div className="floating-orb floating-orb-3"></div>

        <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium mb-8 glass glow-effect"
            >
              <Sparkles className="mr-2 h-4 w-4 text-blue-400" />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Now available on npm
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6"
            >
              <motion.span
                className="gradient-text block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Designers
              </motion.span>
              <motion.span
                className="text-foreground block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Design System
              </motion.span>
            </motion.h1>
            
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8 leading-relaxed">
              A complete, lightweight, headless design system for React applications. 
              Get started in seconds with automatic Tailwind CSS integration, 
              beautiful animations, and seamless UI library support.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link
                href="/docs/getting-started"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 focus-ring glow-effect"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="https://github.com/Arkit-k/Designers"
                className="inline-flex items-center justify-center rounded-lg glass-card px-8 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 focus-ring"
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mx-auto max-w-2xl"
            >
              <div className="glass-card p-4">
                <pre className="text-sm"><code>{installCode}</code></pre>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Trusted by developers</h2>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Everything you need to build
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              From design tokens to animations, we've got you covered with a complete toolkit
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-24 sm:py-32 gradient-bg relative">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Simple to use, powerful to build with
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Get started with just a few lines of code
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <div className="glass-card p-1">
              <CodeBlock code={usageCode} language="typescript" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to build something amazing?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
              Join thousands of developers who are already building with Designers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/getting-started"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 focus-ring glow-effect"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/docs/examples"
                className="inline-flex items-center justify-center rounded-lg glass-card px-8 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 focus-ring"
              >
                View Examples
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
