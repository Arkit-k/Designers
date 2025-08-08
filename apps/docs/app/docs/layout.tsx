'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ChevronRight, 
  Menu, 
  X, 
  BookOpen, 
  Package, 
  Zap, 
  Palette, 
  Code,
  Settings,
  Sparkles,
  ExternalLink
} from 'lucide-react'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs', icon: BookOpen },
      { title: 'Installation', href: '/docs/installation', icon: Package },
      { title: 'Quick Start', href: '/docs/quick-start', icon: Zap },
      { title: 'Configuration', href: '/docs/configuration', icon: Settings },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Design Tokens', href: '/docs/design-tokens', icon: Palette },
      { title: 'Theming', href: '/docs/theming', icon: Sparkles },
      { title: 'TypeScript', href: '/docs/typescript', icon: Code },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Core', href: '/docs/components/core', icon: Package },
      { title: 'React', href: '/docs/components/react', icon: Code },
      { title: 'Animations', href: '/docs/components/animations', icon: Sparkles },
      { title: 'Integrations', href: '/docs/components/integrations', icon: ExternalLink },
    ],
  },
  {
    title: 'Examples',
    items: [
      { title: 'Basic Usage', href: '/docs/examples/basic', icon: Code },
      { title: 'With Tailwind', href: '/docs/examples/tailwind', icon: Palette },
      { title: 'With shadcn/ui', href: '/docs/examples/shadcn', icon: ExternalLink },
      { title: 'Animations', href: '/docs/examples/animations', icon: Sparkles },
    ],
  },
]

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 transform border-r border-border bg-background transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <Link href="/docs" className="text-lg font-semibold">
              Documentation
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              'flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                              isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            )}
                            onClick={() => setSidebarOpen(false)}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:pl-0">
        {/* Mobile header */}
        <div className="sticky top-16 z-30 flex h-16 items-center border-b border-border bg-background px-6 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="mr-4"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">Documentation</h1>
        </div>

        {/* Content */}
        <main className="flex-1">
          <div className="container mx-auto max-w-4xl px-6 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
