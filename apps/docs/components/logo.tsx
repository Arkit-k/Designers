'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

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
      sizeClasses[size],
      className
    )}>
      {/* Gradient background */}
      <div className="absolute inset-0 logo-gradient dark:logo-gradient-dark" />
      
      {/* Glass overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      
      {/* Winking face */}
      <div className="relative h-full w-full flex items-center justify-center">
        {/* Left eye (dot) */}
        <div className="absolute left-1/4 top-1/3 w-1 h-1 bg-gray-900 dark:bg-gray-100 rounded-full transform -translate-x-1/2 -translate-y-1/2" 
             style={{ 
               width: size === 'sm' ? '2px' : size === 'md' ? '3px' : size === 'lg' ? '4px' : '5px',
               height: size === 'sm' ? '2px' : size === 'md' ? '3px' : size === 'lg' ? '4px' : '5px'
             }} />
        
        {/* Right eye (wink) */}
        <div className="absolute right-1/4 top-1/3 transform translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-0.5 bg-gray-900 dark:bg-gray-100 rounded-full transform rotate-12"
               style={{ 
                 width: size === 'sm' ? '4px' : size === 'md' ? '6px' : size === 'lg' ? '8px' : '10px',
                 height: size === 'sm' ? '1px' : size === 'md' ? '1.5px' : size === 'lg' ? '2px' : '2.5px'
               }} />
        </div>
        
        {/* Smile */}
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-3 h-1.5 border-b-2 border-gray-900 dark:border-gray-100 rounded-full"
               style={{ 
                 width: size === 'sm' ? '8px' : size === 'md' ? '12px' : size === 'lg' ? '16px' : '20px',
                 height: size === 'sm' ? '4px' : size === 'md' ? '6px' : size === 'lg' ? '8px' : '10px',
                 borderBottomWidth: size === 'sm' ? '1px' : size === 'md' ? '1.5px' : '2px'
               }} />
        </div>
      </div>
      
      {/* Shine effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1 left-1 w-1 h-1 bg-white/60 rounded-full"
             style={{ 
               width: size === 'sm' ? '2px' : size === 'md' ? '3px' : size === 'lg' ? '4px' : '5px',
               height: size === 'sm' ? '2px' : size === 'md' ? '3px' : size === 'lg' ? '4px' : '5px'
             }} />
      </div>
    </div>
  )

  if (!animated) {
    return logoContent
  }

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
    >
      {logoContent}
    </motion.div>
  )
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
