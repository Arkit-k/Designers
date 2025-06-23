'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Github,
  ExternalLink,
  BookOpen,
  Code,
  Sparkles,
  Package
} from 'lucide-react'
import { LogoWithText } from './logo'
import { ThemeModeSelector } from './theme-mode-selector'

const navigation = [
  { name: 'Docs', href: '/docs', icon: BookOpen },
  { name: 'Components', href: '/docs/components', icon: Package },
  { name: 'Examples', href: '/docs/examples', icon: Code },
  { name: 'Themes', href: '/theme-demo', icon: Sparkles },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <LogoWithText size="md" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-ring rounded-md px-2 py-1"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Mode Selector */}
          <ThemeModeSelector />

          {/* GitHub link */}
          <Link
            href="https://github.com/Arkit-k/Designers"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md glass text-sm font-medium transition-all duration-300 hover:scale-105 focus-ring"
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Link>

          {/* npm link */}
          <Link
            href="https://www.npmjs.com/package/designers"
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 focus-ring glow-effect"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            npm
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md glass text-sm font-medium transition-all duration-300 hover:scale-105 focus-ring md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <Link
                href="https://www.npmjs.com/package/designers"
                className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                <span>npm Package</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
