'use client'

import Link from 'next/link'
import { Github, Twitter, ExternalLink, Package, Heart } from 'lucide-react'

const navigation = {
  docs: [
    { name: 'Getting Started', href: '/docs/getting-started' },
    { name: 'Installation', href: '/docs/installation' },
    { name: 'Configuration', href: '/docs/configuration' },
    { name: 'Theming', href: '/docs/theming' },
  ],
  components: [
    { name: 'Core', href: '/docs/components/core' },
    { name: 'React', href: '/docs/components/react' },
    { name: 'Animations', href: '/docs/components/animations' },
    { name: 'Integrations', href: '/docs/components/integrations' },
  ],
  resources: [
    { name: 'Examples', href: '/docs/examples' },
    { name: 'Playground', href: '/playground' },
    { name: 'Changelog', href: '/changelog' },
    { name: 'Contributing', href: '/contributing' },
  ],
  community: [
    { name: 'GitHub', href: 'https://github.com/arkitkarmokar/designers' },
    { name: 'npm', href: 'https://www.npmjs.com/package/designers' },
    { name: 'Issues', href: 'https://github.com/arkitkarmokar/designers/issues' },
    { name: 'Discussions', href: 'https://github.com/arkitkarmokar/designers/discussions' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">Designers</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              A complete, lightweight, headless design system for React applications.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/arkitkarmokar/designers"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com/arkitkarmokar"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://www.npmjs.com/package/designers"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
                <span className="sr-only">npm</span>
              </Link>
            </div>
          </div>

          {/* Navigation sections */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Documentation</h3>
            <ul className="space-y-2">
              {navigation.docs.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Components</h3>
            <ul className="space-y-2">
              {navigation.components.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-2">
              {navigation.community.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Designers. Built with{' '}
            <Heart className="inline h-4 w-4 text-red-500" />{' '}
            by{' '}
            <Link
              href="https://github.com/arkitkarmokar"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              arkit karmokar
            </Link>
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            MIT License. Open source and free to use.
          </p>
        </div>
      </div>
    </footer>
  )
}
