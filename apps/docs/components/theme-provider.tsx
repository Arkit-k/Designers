'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

type ThemeMode = 'light' | 'dark' | 'midnight' | 'system'

interface ThemeModeContextType {
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
}

const ThemeModeContext = React.createContext<ThemeModeContextType | undefined>(undefined)

export function useThemeMode() {
  const context = React.useContext(ThemeModeContext)
  if (context === undefined) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider')
  }
  return context
}

function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = React.useState<ThemeMode>('midnight')

  React.useEffect(() => {
    const stored = localStorage.getItem('theme-mode') as ThemeMode
    if (stored && ['light', 'dark', 'midnight', 'system'].includes(stored)) {
      setThemeMode(stored)
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem('theme-mode', themeMode)

    // Apply theme mode to document
    const root = document.documentElement
    root.classList.remove('light', 'dark', 'midnight')

    if (themeMode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(themeMode)
    }
  }, [themeMode])

  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  )
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeModeProvider>
        {children}
      </ThemeModeProvider>
    </NextThemesProvider>
  )
}
