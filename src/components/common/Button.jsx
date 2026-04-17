import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import clsx from 'clsx'

const variants = {
  primary:   'bg-primary-600 hover:bg-primary-500 text-white shadow-glow-sm hover:shadow-glow-md',
  secondary: 'glass border border-primary-500/30 text-primary-300 hover:border-primary-400 hover:text-white',
  accent:    'bg-accent-500 hover:bg-accent-400 text-white shadow-glow-accent',
  ghost:     'hover:bg-white/5 text-neutral-300 hover:text-white',
  outline:   'border border-neutral-700 hover:border-primary-500/50 text-neutral-300 hover:text-white',
  danger:    'bg-red-600 hover:bg-red-500 text-white',
}

const sizes = {
  xs:  'text-xs px-3 py-1.5 rounded-lg gap-1.5',
  sm:  'text-sm px-4 py-2   rounded-xl gap-2',
  md:  'text-sm px-6 py-3   rounded-xl gap-2',
  lg:  'text-base px-8 py-4 rounded-2xl gap-2.5',
  xl:  'text-lg px-10 py-5  rounded-2xl gap-3',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className,
  fullWidth = false,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      className={clsx(
        'btn-base font-semibold transition-all duration-300',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 flex-shrink-0" />
      )}
    </motion.button>
  )
}