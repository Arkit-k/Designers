'use client'

import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8', 
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
}


export function Logo({ className, size = 'md', animated = true }: LogoProps) {
  const logoContent = (
    <div className={cn(
      'relative rounded-2xl overflow-hidden shadow-lg',
      size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-16 w-16',
      className
    )}>
      {/* Gradient background */}
      <div className="absolute inset-0 logo-gradient dark:logo-gradient-dark" />
      {/* Glass overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      {/* Cat face (previous logo) */}
      <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
        <ellipse cx="256" cy="320" rx="180" ry="160" fill="#111" filter="url(#shadow)" />
        <ellipse cx="180" cy="240" rx="32" ry="32" fill="#fff" />
        <ellipse cx="332" cy="240" rx="32" ry="32" fill="#fff" />
        <path d="M80 160 Q120 80 200 120" stroke="#111" strokeWidth="40" strokeLinecap="round" />
        <path d="M432 160 Q392 80 312 120" stroke="#111" strokeWidth="40" strokeLinecap="round" />
        <defs>
          <filter id="shadow" x="0" y="0" width="512" height="512">
            <feDropShadow dx="0" dy="0" stdDeviation="32" flood-color="#000" flood-opacity="0.5" />
            <feDropShadow dx="0" dy="0" stdDeviation="16" flood-color="#00f0ff" flood-opacity="0.2" />
          </filter>
        </defs>
      </svg>
    </div>
  );
  if (!animated) return logoContent;
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
    >
      {logoContent}
    </motion.div>
  );
}

// Text logo variant
export function LogoWithText({ className, size = 'md' }: Omit<LogoProps, 'animated'>) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Logo size={size} />
      <span className={cn(
        'font-bold gradient-text',
        size === 'sm' && 'text-lg',
        size === 'md' && 'text-xl', 
        size === 'lg' && 'text-2xl',
        size === 'xl' && 'text-3xl'
      )}>
        Designers
      </span>
    </div>
  )
}
