"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { Code, Zap, ExternalLink } from "lucide-react";
import FileText from "lucide-react/dist/esm/icons/file-text";
import Palette from "lucide-react/dist/esm/icons/palette";

const typescriptCode = `import { ds, type DsTokens } from 'designers';

// Type-safe usage
const color: DsTokens['colors']['blue'][600] = ds.colors.blue[600];

// Autocomplete for tokens
const padding = ds.spacing[4];`;

export default function DocsTypescriptPage() {
  return (
    <div className="prose-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>TypeScript Support</h1>
        <p className="text-xl text-muted-foreground mb-4">
          Designers is built with TypeScript at its core. All tokens, components, and hooks are fully typed, providing autocomplete, IntelliSense, and compile-time safety. TypeScript unlocks the best experience, including type-safe token access, prop types, and custom token extension.
        </p>
        <h2 className="mt-6">Why TypeScript?</h2>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>All tokens and APIs are strongly typed</li>
          <li>Instant autocomplete and IntelliSense in your editor</li>
          <li>Type errors help you catch mistakes early</li>
          <li>Works with strict TypeScript settings (<code>strict: true</code>)</li>
          <li>Supports monorepos and custom token types</li>
        </ul>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-200 mb-6">
          <strong>Tip:</strong> You can import types like <code>DsTokens</code> for advanced type-safe usage and custom token extension.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="my-8"
      >
        <h2>Basic Usage Example</h2>
        <CodeBlock code={typescriptCode} language="typescript" />
        <h2 className="mt-8">Advanced TypeScript Usage</h2>
        <p className="mb-2">You can extend token types for custom tokens, or use <code>DsTokens</code> for type-safe access throughout your app:</p>
        <CodeBlock
          code={`import { ds, type DsTokens } from 'designers';\n\n// Custom function using token types\nfunction getPrimaryColor(tokens: DsTokens) {\n  return tokens.colors.blue[600];\n}\n\n// Extending tokens (in designers.config.json)\n// {\n//   "colors": {\n//     "brand": { "main": "#123456" }\n//   }\n// }\n// Usage:\nconst brand: DsTokens['colors']['brand']['main'] = ds.colors.brand.main;`}
          language="typescript"
        />
        <h2 className="mt-8">TypeScript Tips</h2>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>Use <code>type DsTokens</code> for type-safe token access and custom helpers</li>
          <li>All components have full prop types and JSDoc documentation</li>
          <li>Works with <code>strict: true</code> and in monorepos</li>
          <li>Hover over any token or component in your editor to see its type and docs</li>
        </ul>
        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-700 text-green-900 dark:text-green-200 mt-6">
          <strong>Pro Tip:</strong> Use TypeScript generics and utility types to build type-safe design utilities and helpers.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="my-8"
      >
        <h2>Real-World Example</h2>
        <CodeBlock
          code={`import { ds, type DsTokens } from 'designers';\n\nexport function Banner({ message }: { message: string }) {\n  return (\n    <div\n      style={{\n        background: ds.colors.yellow[100],\n        color: ds.colors.yellow[900],\n        padding: ds.spacing[5],\n        borderRadius: ds.radius.lg,\n        fontWeight: ds.typography.fontWeight.semibold,\n        fontSize: ds.typography.fontSize.lg,\n      }}\n    >\n      {message}\n    </div>\n  );\n}`} language="typescript"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18 }}
        className="my-8"
      >
        <h2>Troubleshooting TypeScript</h2>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>If you see type errors, ensure your <code>designers</code> package and config are up to date.</li>
          <li>Check your <code>tsconfig.json</code> for correct <code>types</code> and <code>paths</code> if using a monorepo.</li>
          <li>Restart your TypeScript server after adding or changing tokens.</li>
          <li>For custom tokens, update your types as needed for full type safety.</li>
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
