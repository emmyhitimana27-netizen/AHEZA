import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function Loader({ fullScreen = false, size = 'md', text = '' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className={clsx(sizes[size], 'rounded-full border-2 border-primary-800')}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        {/* Inner arc */}
        <motion.div
          className={clsx(
            sizes[size],
            'rounded-full border-2 border-transparent border-t-primary-500 absolute inset-0'
          )}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse-slow" />
        </div>
      </div>
      {text && (
        <p className="text-neutral-400 text-sm font-medium animate-pulse">{text}</p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Logo */}
          <motion.div
            className="font-display font-bold text-3xl tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-gradient">AHEZA</span>
            <span className="text-white ml-2">2050</span>
          </motion.div>

          {spinner}

          <motion.p
            className="text-neutral-500 text-xs tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading experience…
          </motion.p>
        </div>
      </motion.div>
    )
  }

  return spinner
}