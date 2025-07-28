"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Package, Code, Zap, ExternalLink } from "lucide-react";
import FileText from "lucide-react/dist/esm/icons/file-text";
import { CodeBlock } from "@/components/code-block";
import Palette from "lucide-react/dist/esm/icons/palette";

const quickStartCode = `# Get started in 30 seconds\nnpm install designers\n\n# Initialize your project\nnpx designers init\n\n# Start using design tokens immediately\nimport { ds } from 'designers';`;

export default function DocsQuickStartPage() {
  return (
    <div className="prose-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Quick Start</h1>
        <p className="text-xl text-muted-foreground mb-4">
          <strong>Designers</strong> is a toolkit for managing and using design tokens in React projects. It helps you keep your UI consistent, type-safe, and easy to theme. This quick start will guide you through setup, usage, and customization.
        </p>
        <h2 className="mt-6">Prerequisites</h2>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>Node.js 16 or newer</li>
          <li>A React project (Next.js, Vite, CRA, etc.)</li>
        </ul>
        <h2 className="mt-6">Overview</h2>
        <ol className="list-decimal pl-6 text-muted-foreground mb-4">
          <li>Install the <code>designers</code> package</li>
          <li>Initialize your project for instant configuration</li>
          <li>Use design tokens in your codebase</li>
          <li>Customize tokens and integrate with Tailwind CSS (optional)</li>
        </ol>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-200 mb-6">
          <strong>Tip:</strong> Designers works with any React project and integrates seamlessly with Tailwind CSS. You can also extend or override tokens as needed.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="my-8"
      >
        <h2>1. Install Designers</h2>
        <p className="mb-2">Add the package to your project using your preferred package manager. This gives you access to all core tokens and utilities:</p>
        <CodeBlock code={`npm install designers\n# or\nyarn add designers\n# or\npnpm add designers`} language="bash" />

        <h2 className="mt-8">2. Initialize Your Project</h2>
        <p className="mb-2">Run the CLI to generate a <code>designers.config.json</code> and example files. This step is optional but recommended for best experience:</p>
        <CodeBlock code={`npx designers init`} language="bash" />
        <div className="text-muted-foreground text-sm mb-4">This will create a <code>designers.config.json</code> file and example usage in your project root. You can edit this file to customize your tokens.</div>

        <h2 className="mt-8">3. Use Design Tokens in Your Components</h2>
        <p className="mb-2">Import <code>ds</code> and use tokens for consistent, type-safe styling. Here’s a real-world example:</p>
        <CodeBlock
          code={`import { ds } from 'designers';\n\nexport function ExampleButton() {\n  return (\n    <button\n      style={{\n        background: ds.colors.blue[600],\n        color: ds.colors.white,\n        padding: ds.spacing[3],\n        borderRadius: ds.radius.md,\n        boxShadow: ds.shadows.sm,\n        border: 'none',\n        fontWeight: 600,\n        cursor: 'pointer',\n      }}\n    >\n      Click Me\n    </button>\n  );\n}`}
          language="typescript"
        />
        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-700 text-green-900 dark:text-green-200 mt-6">
          <strong>Pro Tip:</strong> Designers tokens are fully type-safe and work with any CSS-in-JS, utility framework, or even plain CSS variables.
        </div>

        <h2 className="mt-8">4. Customizing Tokens</h2>
        <p className="mb-2">Edit <code>designers.config.json</code> to add or override colors, spacing, radii, and more. After editing, restart your dev server to apply changes.</p>
        <CodeBlock code={`// designers.config.json\n{\n  "colors": {\n    "brand": {\n      "primary": "#1e40af",\n      "secondary": "#f59e42"\n    }\n  },\n  "spacing": {\n    "xs": "0.25rem",\n    "sm": "0.5rem"\n  }\n}`} language="json" />
        <div className="text-muted-foreground text-sm mb-4">You can now use <code>ds.colors.brand.primary</code> and <code>ds.spacing.xs</code> in your components.</div>

        <h2 className="mt-8">5. Using with Tailwind CSS</h2>
        <p className="mb-2">Designers can generate Tailwind-compatible tokens. See the <Link href="/docs/theming" className="underline">theming docs</Link> for setup instructions. Example integration:</p>
        <CodeBlock code={`// tailwind.config.js\nconst { designersTailwind } = require('designers/tailwind');\n\nmodule.exports = {\n  theme: {\n    extend: designersTailwind(),\n  },\n};`} language="js" />

        <h2 className="mt-8">Troubleshooting & Resources</h2>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>If you see TypeScript errors, ensure your <code>designers</code> package and config are up to date.</li>
          <li>For more examples, see the <Link href="/docs/examples" className="underline">Examples</Link> page.</li>
          <li>For Tailwind CSS integration, see <Link href="/docs/theming" className="underline">theming docs</Link>.</li>
          <li>Need help? <a href="https://github.com/arkits/designer-package/issues" target="_blank" rel="noopener noreferrer" className="underline">Open an issue on GitHub</a>.</li>
        </ul>
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
            href="/docs/configuration"
            className="flex items-center space-x-2 text-primary hover:underline"
          >
            <Package className="h-4 w-4" />
            <span>Configuration</span>
          </Link>
          <Link
            href="/docs/design-tokens"
            className="flex items-center space-x-2 text-primary hover:underline"
          >
            <Code className="h-4 w-4" />
            <span>Design Tokens</span>
          </Link>
          <Link
            href="/docs/theming"
            className="flex items-center space-x-2 text-primary hover:underline"
          >
            <Palette className="h-4 w-4" />
            <span>Theming & Tailwind</span>
          </Link>
          <Link
            href="/docs/typescript"
            className="flex items-center space-x-2 text-primary hover:underline"
          >
            <FileText className="h-4 w-4" />
            <span>TypeScript Support</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

declare module "lucide-react/dist/esm/icons/palette" {
  import * as React from "react";
  const Palette: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & { color?: string; size?: string | number }>;
  export default Palette;
}
