import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useQuery } from 'react-query'
import { Users, Star, Truck, Award } from 'lucide-react'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { QUERY_KEYS } from '@utils/constants'
import api from '@services/api'

const DEFAULT_STATS = [
  {
    icon:        Users,
    value:       5000,
    suffix:      '+',
    label:       'Happy Customers',
    description: 'Across Rwanda',
    decimals:    0,
  },
  {
    icon:        Star,
    value:       4.9,
    suffix:      '/5',
    label:       'Average Rating',
    description: 'Verified reviews',
    decimals:    1,
  },
  {
    icon:        Truck,
    value:       48,
    suffix:      'hr',
    label:       'Delivery Time',
    description: 'In Musanze city',
    decimals:    0,
  },
  {
    icon:        Award,
    value:       10,
    suffix:      'yr',
    label:       'Warranty Coverage',
    description: 'On all premium models',
    decimals:    0,
  },
]

export default function StatsSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })

  const { data } = useQuery(
    QUERY_KEYS.STATS,
    () => api.get('/stats').then((r) => r.data),
    {
      staleTime: Infinity,
      retry:     1,
      /* Don't throw on 404 — fall back to defaults silently */
      onError:   () => {},
    }
  )

  /* Merge backend data with defaults (backend may return partial list) */
  const stats = data?.stats?.length
    ? data.stats.map((s, i) => ({
        ...DEFAULT_STATS[i],
        ...s,
        icon: DEFAULT_STATS[i]?.icon || Users,
      }))
    : DEFAULT_STATS

  return (
    <section
      ref={ref}
      className="relative section-padding overflow-hidden"
      aria-label="Key statistics"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-600/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-600/30 to-transparent" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
          {stats.map((stat, i) => {
            const Icon = stat.icon || Users
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay:    i * 0.12,
                  ease:     [0.16, 1, 0.3, 1],
                }}
                className="group relative bg-surface hover:bg-primary-950/30 transition-colors duration-500 p-8 lg:p-10 flex flex-col items-center text-center gap-4"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-primary-600/15 border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-600/25 group-hover:border-primary-500/40 group-hover:shadow-glow-sm transition-all duration-500">
                  <Icon className="w-5 h-5 text-primary-400" />
                </div>

                {/* Animated Number */}
                <div className="font-display font-black text-4xl lg:text-5xl text-white leading-none">
                  {isVisible ? (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      delay={i * 0.15}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix || ''}
                      separator=","
                    />
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>

                {/* Label */}
                <div>
                  <p className="text-white font-semibold text-sm">{stat.label}</p>
                  <p className="text-neutral-500 text-xs mt-0.5">{stat.description}</p>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-radial from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-inherit" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}