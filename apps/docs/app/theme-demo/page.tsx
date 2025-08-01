'use client'

import { motion } from 'framer-motion'
import { Palette, Sun, Moon, Monitor } from 'lucide-react'
import { useThemeMode } from '../../components/theme-provider'
import { ThemeModeSelector } from '../../components/theme-mode-selector'

export default function ThemeDemoPage() {
  const { themeMode } = useThemeMode()

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Clean and bright interface perfect for daytime use',
      icon: Sun,
      features: ['High contrast', 'Easy reading', 'Professional look']
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easy on the eyes with reduced blue light',
      icon: Moon,
      features: ['Reduced eye strain', 'Better for low light', 'Modern aesthetic']
    },
    {
      id: 'midnight',
      name: 'Midnight Mode',
      description: 'Deep black with vibrant blue accents for a premium feel',
      icon: Palette,
      features: ['Floating orbs', 'Glass morphism', 'SaaS-style effects']
    },
    {
      id: 'system',
      name: 'System Mode',
      description: 'Automatically follows your system preference',
      icon: Monitor,
      features: ['Auto switching', 'Respects OS settings', 'Seamless experience']
    }
  ]

  const currentTheme = themes.find(theme => theme.id === themeMode) || themes[2]

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
          <span className="gradient-text">Theme Modes</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
          Experience different visual modes designed for various preferences and use cases.
          Switch between themes to see the design adapt in real-time.
        </p>
        
        <div className="flex justify-center mb-12">
          <ThemeModeSelector />
        </div>
      </motion.div>

      {/* Current Theme Showcase */}
      <motion.div
        key={themeMode}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="glass-card p-8 text-center">
          <currentTheme.icon className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{currentTheme.name}</h2>
          <p className="text-muted-foreground mb-6">{currentTheme.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentTheme.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass p-4 rounded-lg"
              >
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* All Themes Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-center mb-8">All Available Themes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-6 transition-all duration-300 hover:scale-105 ${
                themeMode === theme.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <theme.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{theme.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{theme.description}</p>
              
              <ul className="space-y-1">
                {theme.features.map((feature) => (
                  <li key={feature} className="text-xs text-muted-foreground flex items-center">
                    <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Demo Elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-bold text-center mb-8">Interactive Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Buttons</h3>
            <div className="space-y-3">
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Primary Button
              </button>
              <button className="w-full glass px-4 py-2 rounded-lg hover:scale-105 transition-all">
                Glass Button
              </button>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Code Block</h3>
            <div className="code-block text-sm">
              <code>{`const theme = '${themeMode}';
console.log(theme);`}</code>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Typography</h3>
            <div className="space-y-2">
              <p className="text-foreground font-semibold">Foreground Text</p>
              <p className="text-muted-foreground">Muted Text</p>
              <p className="text-primary">Primary Text</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
