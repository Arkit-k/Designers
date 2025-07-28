'use client'

import { motion } from 'framer-motion'
import { Download, Star, Users, Package } from 'lucide-react'

const stats = [
  {
    icon: Download,
    value: '10K+',
    label: 'Downloads',
    description: 'Monthly npm downloads',
  },
  {
    icon: Star,
    value: '500+',
    label: 'GitHub Stars',
    description: 'Community support',
  },
  {
    icon: Users,
    value: '100+',
    label: 'Contributors',
    description: 'Active developers',
  },
  {
    icon: Package,
    value: '7',
    label: 'Packages',
    description: 'Modular components',
  },
]

export function StatsSection() {
  return (
    <section className="py-16 border-y border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
