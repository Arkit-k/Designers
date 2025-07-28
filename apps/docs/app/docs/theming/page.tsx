"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { Code, Zap, ExternalLink } from "lucide-react";
import { Palette } from "lucide-react";

const themingCode = `import { ThemeProvider, useTheme } from 'designers/react';

export default function App({ children }) {
  return (
    <ThemeProvider defaultMode="system">
      {children}
    </ThemeProvider>
  );
}

// In a component
const { mode, setMode } = useTheme();
setMode('dark'); // Switch to dark mode`;

export default function DocsThemingPage() {
  return (
    <div className="prose-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Theming</h1>
        <p className="text-xl text-muted-foreground mb-4">
          Designers supports light, dark, and system themes out of the box. Use the <code>ThemeProvider</code> and <code>useTheme</code> hook to control and customize your app's appearance. Theme switching is instant and works with all tokens and components.
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>Supports <strong>light</strong>, <strong>dark</strong>, and <strong>system</strong> color modes</li>
          <li>Theme-aware tokens update automatically</li>
          <li>Custom themes and color overrides supported</li>
        </ul>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-200 mb-6">
          <strong>Tip:</strong> Use the <code>ThemeProvider</code> at the root of your app for global theming.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="my-8"
      >
        <h2>Usage Example</h2>
        <CodeBlock code={themingCode} language="typescript" />
        <h2 className="mt-8">How Theme Switching Works</h2>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>Default mode is <code>system</code> (follows OS preference)</li>
          <li>Call <code>setMode('light' | 'dark')</code> to switch manually</li>
          <li>All tokens and components update instantly on mode change</li>
        </ul>
        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-700 text-green-900 dark:text-green-200 mt-6">
          <strong>Pro Tip:</strong> You can create your own color schemes and pass them to <code>ThemeProvider</code> for full customization.
        </div>
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
            href="/docs/quick-start"
            className="flex items-center space-x-2 text-primary hover:underline"
          >
            <Zap className="h-4 w-4" />
            <span>Quick Start</span>
          </Link>
          <Link
            href="/docs/configuration"
            className="flex items-center space-x-2 text-primary hover:underline"
          >
            <Code className="h-4 w-4" />
            <span>Configuration</span>
          </Link>
          <Link
            href="/docs/design-tokens"
            className="flex items-center space-x-2 text-primary hover:underline"
          >
            <Palette className="h-4 w-4" />
            <span>Design Tokens</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
