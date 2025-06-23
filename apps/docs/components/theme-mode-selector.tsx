'use client'

import * as React from 'react'
import { Sun, Moon, Palette, Monitor, ChevronDown } from 'lucide-react'
import { useThemeMode } from './theme-provider'

const themes = [
  {
    id: 'light' as const,
    name: 'Light',
    icon: Sun,
  },
  {
    id: 'dark' as const,
    name: 'Dark',
    icon: Moon,
  },
  {
    id: 'midnight' as const,
    name: 'Midnight',
    icon: Palette,
  },
  {
    id: 'system' as const,
    name: 'System',
    icon: Monitor,
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

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-full mt-2 z-50 w-48 glass-card p-2">
            <div className="space-y-1">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setThemeMode(theme.id)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 rounded-lg px-3 py-2 text-left transition-all duration-200 hover:bg-accent/50 ${
                    themeMode === theme.id ? 'bg-accent/30' : ''
                  }`}
                >
                  <theme.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}


