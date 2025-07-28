/**
 * Theme Mode Selector Component - UI component for switching theme modes
 */

import React, { useState, useRef, useEffect } from 'react';
import { useThemeMode } from '../providers/ThemeModeProvider';

export interface ThemeOption {
  id: 'light' | 'dark' | 'midnight' | 'system';
  name: string;
  description: string;
  icon: string;
  preview: string;
}

export interface ThemeModeSelectorProps {
  className?: string;
  showLabels?: boolean;
  showDescriptions?: boolean;
  showPreviews?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dropdown' | 'tabs' | 'buttons';
  customThemes?: Partial<ThemeOption>[];
}

const defaultThemes: ThemeOption[] = [
  {
    id: 'light',
    name: 'Light',
    description: 'Clean and bright',
    icon: '☀️',
    preview: '#ffffff'
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Easy on the eyes',
    icon: '🌙',
    preview: '#1a1a1a'
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Black with blue accents',
    icon: '🎨',
    preview: '#000000'
  },
  {
    id: 'system',
    name: 'System',
    description: 'Follow system preference',
    icon: '💻',
    preview: 'linear-gradient(45deg, #ffffff 50%, #1a1a1a 50%)'
  }
];

export function ThemeModeSelector({
  className = '',
  showLabels = true,
  showDescriptions = false,
  showPreviews = true,
  size = 'md',
  variant = 'dropdown',
  customThemes = []
}: ThemeModeSelectorProps) {
  const { themeMode, setThemeMode } = useThemeMode();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Merge custom themes with defaults
  const themes = defaultThemes.map(theme => {
    const custom = customThemes.find(c => c.id === theme.id);
    return custom ? { ...theme, ...custom } : theme;
  });

  const currentTheme = themes.find(theme => theme.id === themeMode) || themes[2];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3'
  };

  const iconSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (variant === 'buttons') {
    return (
      <div className={`flex gap-1 ${className}`}>
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setThemeMode(theme.id)}
            className={`
              ${sizeClasses[size]}
              flex items-center gap-2 rounded-md border transition-all duration-200
              ${themeMode === theme.id 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600'
              }
            `}
            title={theme.description}
          >
            <span className={iconSizes[size]}>{theme.icon}</span>
            {showLabels && <span>{theme.name}</span>}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'tabs') {
    return (
      <div className={`flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 ${className}`}>
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setThemeMode(theme.id)}
            className={`
              ${sizeClasses[size]}
              flex items-center gap-2 rounded-md transition-all duration-200 flex-1
              ${themeMode === theme.id 
                ? 'bg-white dark:bg-gray-700 shadow-sm' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }
            `}
            title={theme.description}
          >
            <span className={iconSizes[size]}>{theme.icon}</span>
            {showLabels && <span className="truncate">{theme.name}</span>}
          </button>
        ))}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          ${sizeClasses[size]}
          flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-600
          bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700
          transition-all duration-200 min-w-[120px]
        `}
      >
        <span className={iconSizes[size]}>{currentTheme.icon}</span>
        {showLabels && <span className="flex-1 text-left">{currentTheme.name}</span>}
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[200px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50">
          <div className="p-1">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  setThemeMode(theme.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-md text-left
                  transition-all duration-200
                  ${themeMode === theme.id 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                `}
              >
                {showPreviews && (
                  <div 
                    className="w-6 h-6 rounded border border-gray-200 dark:border-gray-600 flex-shrink-0"
                    style={{ background: theme.preview }}
                  />
                )}
                <span className={iconSizes[size]}>{theme.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{theme.name}</div>
                  {showDescriptions && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {theme.description}
                    </div>
                  )}
                </div>
                {themeMode === theme.id && (
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
