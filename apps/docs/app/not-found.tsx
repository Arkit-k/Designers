'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Home, 
  BookOpen, 
  Code, 
  Package, 
  ArrowLeft,
  Search,
  Sparkles
} from 'lucide-react'
import { Logo } from '@/components/logo'

const quickLinks = [
  {
    title: 'Documentation',
    description: 'Learn how to use Designers',
    href: '/docs',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Components',
    description: 'Browse component library',
    href: '/docs/components',
    icon: Package,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Examples',
    description: 'See practical examples',
    href: '/docs/examples',
    icon: Code,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Playground',
    description: 'Try components live',
    href: '/playground',
    icon: Sparkles,
    color: 'from-orange-500 to-red-500'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 flex items-center justify-center p-4">
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating Logo */}
        <motion.div 
          className="mb-8 flex justify-center"
          variants={floatingVariants}
          animate="animate"
        >
          <Logo size="xl" animated={false} />
        </motion.div>

        {/* 404 Text */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oops! The page you're looking for seems to have wandered off into the design system void. 
            Don't worry, we'll help you find your way back.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-ring"
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-ring"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
          </div>
        </motion.div>

        {/* Quick Links Grid */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold mb-6">
            Or explore these popular sections:
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={link.href}
                  className="block p-6 rounded-xl border bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-200 group"
                >
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${link.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <link.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">{link.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search Suggestion */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Looking for something specific?
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Try searching our documentation or check out the{' '}
            <Link href="/docs" className="text-primary hover:underline">
              getting started guide
            </Link>
            {' '}to learn more about Designers.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Still can't find what you're looking for?{' '}
            <a 
              href="https://github.com/arkitkarmokar/designers/issues" 
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report an issue
            </a>
            {' '}or{' '}
            <a 
              href="mailto:support@designers.dev" 
              className="text-primary hover:underline"
            >
              contact support
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
