import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Designers - Complete Design System for React',
  description: 'A lightweight, headless design system for React applications with automatic Tailwind CSS integration, animations, and UI library support.',
  keywords: ['design system', 'react', 'typescript', 'tailwind', 'ui components', 'headless'],
  authors: [{ name: 'arkit karmokar' }],
  creator: 'arkit karmokar',
  openGraph: {
    title: 'Designers - Complete Design System for React',
    description: 'A lightweight, headless design system for React applications',
    url: 'https://designers-docs.vercel.app',
    siteName: 'Designers',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Designers Design System',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Designers - Complete Design System for React',
    description: 'A lightweight, headless design system for React applications',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="midnight"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
