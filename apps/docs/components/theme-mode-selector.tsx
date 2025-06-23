'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sun, 
  Moon, 
  Monitor, 
  Palette,
  Check,
  ChevronDown
} from 'lucide-react'
import { useThemeMode } from './theme-provider'

const themes = [
  {
    id: 'light' as const,
    name: 'Light',
    description: 'Clean and bright',
    icon: Sun,
    preview: 'bg-white border-gray-200'
  },
  {
    id: 'dark' as const,
    name: 'Dark',
    description: 'Easy on the eyes',
    icon: Moon,
    preview: 'bg-gray-900 border-gray-700'
  },
  {
    id: 'midnight' as const,
    name: 'Midnight',
    description: 'Black with blue accents',
    icon: Palette,
    preview: 'bg-black border-blue-500/30'
  },
  {
    id: 'system' as const,
    name: 'System',
    description: 'Follow system preference',
    icon: Monitor,
    preview: 'bg-gradient-to-r from-white to-gray-900 border-gray-400'
  }
]

export function ThemeModeSelector() {
  const { themeMode, setThemeMode } = useThemeMode()
  const [isOpen, setIsOpen] = React.useState(false)

  const currentTheme = themes.find(theme => theme.id === themeMode) || themes[2]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-md glass px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 focus-ring min-w-[120px]"
      >
        <currentTheme.icon className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">{currentTheme.name}</span>
        <ChevronDown className={`h-3 w-3 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 z-50 w-72 glass-card p-2"
            >
              <div className="space-y-1">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setThemeMode(theme.id)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 hover:bg-accent/50 ${
                      themeMode === theme.id ? 'bg-accent/30' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-md border-2 ${theme.preview} flex items-center justify-center`}>
                      <theme.icon className="h-4 w-4 text-foreground" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">
                          {theme.name}
                        </p>
                        {themeMode === theme.id && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {theme.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-3 pt-2 border-t border-border/50">
                <p className="text-xs text-muted-foreground px-3">
                  Choose your preferred theme mode
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
