"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { Code, Zap, ExternalLink } from "lucide-react";
import { Palette } from "lucide-react";

const tokensCode = `import { ds } from 'designers';

const styles = {
  color: ds.colors.blue[600],
  background: ds.colors.gray[50],
  padding: ds.spacing[4],
  borderRadius: ds.radius.lg,
  boxShadow: ds.shadows.md,
};`;

export default function DocsDesignTokensPage() {
  return (
    <div className="prose-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Design Tokens</h1>
        <p className="text-xl text-muted-foreground mb-4">
          <strong>Design tokens</strong> are named values for colors, spacing, radii, shadows, typography, and more. They enable a consistent, scalable, and themeable design system across your app. Designers provides a comprehensive, type-safe set of tokens out of the box.
        </p>
        <h2 className="mt-6">Why Use Design Tokens?</h2>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>Centralize your design decisions (colors, spacing, etc.)</li>
          <li>Enable easy theming (light/dark/custom themes)</li>
          <li>Ensure consistency and scalability in large codebases</li>
          <li>Type-safe and autocompleted in your editor</li>
        </ul>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-200 mb-6">
          <strong>Tip:</strong> You can extend or override tokens in your <code>designers.config.json</code> file for full customization.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="my-8"
      >
        <h2>Token Types & Examples</h2>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li><strong>Colors:</strong> <code>ds.colors.blue[600]</code>, <code>ds.colors.gray[50]</code></li>
          <li><strong>Spacing:</strong> <code>ds.spacing[4]</code> (e.g. <code>1rem</code>)</li>
          <li><strong>Radius:</strong> <code>ds.radius.lg</code> (e.g. <code>0.75rem</code>)</li>
          <li><strong>Shadows:</strong> <code>ds.shadows.md</code></li>
          <li><strong>Typography:</strong> <code>ds.typography.fontSize.lg</code>, <code>ds.typography.fontWeight.bold</code></li>
        </ul>
        <h3 className="mt-6">Usage Example</h3>
        <CodeBlock code={tokensCode} language="typescript" />
        <h3 className="mt-8">Real-World Component Example</h3>
        <CodeBlock
          code={`import { ds } from 'designers';\n\nexport function Card() {\n  return (\n    <div\n      style={{\n        background: ds.colors.gray[50],\n        color: ds.colors.gray[900],\n        padding: ds.spacing[6],\n        borderRadius: ds.radius.xl,\n        boxShadow: ds.shadows.lg,\n        fontSize: ds.typography.fontSize.lg,\n        fontWeight: ds.typography.fontWeight.bold,\n      }}\n    >\n      <h2>Design Tokens in Action</h2>\n      <p>Consistent, themeable, and type-safe UI!</p>\n    </div>\n  );\n}`}
          language="typescript"
        />
        <h3 className="mt-8">Available Tokens</h3>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li><strong>ds.colors</strong>: All color tokens, e.g. <code>ds.colors.blue[600]</code></li>
          <li><strong>ds.spacing</strong>: Spacing scale, e.g. <code>ds.spacing[4]</code></li>
          <li><strong>ds.radius</strong>: Border radius scale, e.g. <code>ds.radius.lg</code></li>
          <li><strong>ds.shadows</strong>: Shadow presets, e.g. <code>ds.shadows.md</code></li>
          <li><strong>ds.typography</strong>: Font sizes, weights, and more</li>
        </ul>
        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-700 text-green-900 dark:text-green-200 mt-6">
          <strong>Pro Tip:</strong> All tokens are theme-aware and update automatically when the theme changes.
        </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="my-8"
      >
        <h2>Customizing & Extending Tokens</h2>
        <p className="mb-2">You can override or add tokens in <code>designers.config.json</code> at the root of your project. Example:</p>
        <CodeBlock
          code={`// designers.config.json\n{\n  "colors": {\n    "brand": {\n      "primary": "#1e40af",\n      "secondary": "#f59e42"\n    }\n  },\n  "spacing": {\n    "xxl": "4rem"\n  }\n}`} language="json"
        />
        <div className="text-muted-foreground text-sm mb-4">After editing, restart your dev server. Your new tokens will be available as <code>ds.colors.brand.primary</code> and <code>ds.spacing.xxl</code>.</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18 }}
        className="my-8"
      >
        <h2>Best Practices</h2>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>Use tokens everywhere for consistency—avoid hardcoded values.</li>
          <li>Organize custom tokens by brand, theme, or component as needed.</li>
          <li>Leverage TypeScript for autocomplete and type safety.</li>
          <li>Document your token usage for your team.</li>
        </ul>
      </motion.div>
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
            href="/docs/theming"
            className="flex items-center space-x-2 text-primary hover:underline"
          >
            <Palette className="h-4 w-4" />
            <span>Theming</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
