'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'


import Palette from 'lucide-react/dist/esm/icons/palette'
import Type from 'lucide-react/dist/esm/icons/type'
import Layers from 'lucide-react/dist/esm/icons/layers'
import Zap from 'lucide-react/dist/esm/icons/zap'
import Sparkles from 'lucide-react/dist/esm/icons/sparkles'
import Package from 'lucide-react/dist/esm/icons/package'
import Settings from 'lucide-react/dist/esm/icons/settings'
import Code from 'lucide-react/dist/esm/icons/code'

interface FeatureCardProps {
  iconName: string
  title: string
  description: string
  children?: ReactNode
  className?: string
}


const iconMap: Record<string, LucideIcon> = {
  Palette,
  Type,
  Layers,
  Zap,
  Sparkles,
  Package,
  Settings,
  Code,
}

export function FeatureCard({ iconName, title, description, children, className = '' }: FeatureCardProps) {
  const Icon = iconMap[iconName] || Palette;
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden glass-card p-6 transition-all duration-300 hover:glow-effect ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="mb-2 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {children}
      </div>
    </motion.div>
  )
}
