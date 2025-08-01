"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Package, Code, Zap, ExternalLink } from "lucide-react";
import { CodeBlock } from "../../components/code-block";

const quickStartCode = `# Get started in 30 seconds
npm install designers

# Initialize your project
npx designers init

# Start using design tokens immediately
import { ds } from 'designers';`;

export default function QuickStartPage() {
  return (
    <div className="prose-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Quick Start</h1>
        <p className="text-xl text-muted-foreground">
          Get up and running in minutes with our simple installation guide. Zero-config, blazing fast, and works with any CSS framework.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="my-8"
      >
        <h2>Install Designers</h2>
        <CodeBlock code={quickStartCode} language="bash" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
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
  );
}
