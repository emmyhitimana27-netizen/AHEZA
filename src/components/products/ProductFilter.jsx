import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SlidersHorizontal, X, ChevronDown, ChevronUp, Search
} from 'lucide-react'
import { MATTRESS_TYPES, MATTRESS_SIZES, SORT_OPTIONS } from '@utils/constants'
import { useDebounce } from '@hooks/useDebounce'
import clsx from 'clsx'

const PRICE_RANGES = [
  { label: 'Under 100k',    min: 0,       max: 100000 },
  { label: '100k – 300k',   min: 100000,  max: 300000 },
  { label: '300k – 600k',   min: 300000,  max: 600000 },
  { label: '600k – 1M',     min: 600000,  max: 1000000 },
  { label: 'Above 1M',      min: 1000000, max: null },
]

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-white/5 pb-5 mb-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-left mb-3 group"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-white group-hover:text-primary-300 transition-colors">
          {title}
        </span>
        {open
          ? <ChevronUp className="w-4 h-4 text-neutral-500" />
          : <ChevronDown className="w-4 h-4 text-neutral-500" />
        }
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductFilter({ filters, onChange, onReset, totalResults }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState(filters.search || '')
  const debouncedSearch = useDebounce(search, 400)

  // Propagate debounced search
  useState(() => {
    if (debouncedSearch !== filters.search) {
      onChange({ ...filters, search: debouncedSearch, page: 1 })
    }
  }, [debouncedSearch])

  const activeCount = [
    filters.type, filters.size, filters.priceRange, filters.search,
  ].filter(Boolean).length

  const FilterContent = () => (
    <div className="flex flex-col gap-0">
      {/* Search */}
      <div className="mb-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search mattresses…"
            className="w-full bg-white/5 border border-white/10 focus:border-primary-500/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
          />
          {search && (
            <button
              onClick={() => { setSearch(''); onChange({ ...filters, search: '', page: 1 }) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Sort */}
      <FilterSection title="Sort By">
        <div className="flex flex-col gap-1.5">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filters, sort: opt.value, page: 1 })}
              className={clsx(
                'flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors text-left',
                filters.sort === opt.value
                  ? 'bg-primary-600/20 text-primary-300 border border-primary-500/25'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              )}
            >
              {filters.sort === opt.value && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
              )}
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Type */}
      <FilterSection title="Mattress Type">
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => onChange({ ...filters, type: '', page: 1 })}
            className={clsx(
              'px-3 py-2 rounded-xl text-sm transition-colors text-left',
              !filters.type
                ? 'bg-primary-600/20 text-primary-300 border border-primary-500/25'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            )}
          >
            All Types
          </button>
          {MATTRESS_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => onChange({ ...filters, type: type.value, page: 1 })}
              className={clsx(
                'px-3 py-2 rounded-xl text-sm transition-colors text-left',
                filters.type === type.value
                  ? 'bg-primary-600/20 text-primary-300 border border-primary-500/25'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection title="Size">
        <div className="grid grid-cols-2 gap-1.5">
          {MATTRESS_SIZES.map((size) => (
            <button
              key={size.value}
              onClick={() =>
                onChange({ ...filters, size: filters.size === size.value ? '' : size.value, page: 1 })
              }
              className={clsx(
                'flex flex-col px-3 py-2 rounded-xl text-xs transition-colors text-left border',
                filters.size === size.value
                  ? 'bg-primary-600/20 text-primary-300 border-primary-500/30'
                  : 'text-neutral-400 hover:text-white border-white/5 hover:border-white/10 hover:bg-white/5'
              )}
            >
              <span className="font-semibold">{size.label}</span>
              <span className="text-2xs text-neutral-600 mt-0.5">{size.dimensions}</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="flex flex-col gap-1.5">
          {PRICE_RANGES.map((range, i) => (
            <button
              key={i}
              onClick={() => onChange({
                ...filters,
                priceMin: range.min,
                priceMax: range.max,
                priceRange: `${range.min}-${range.max}`,
                page: 1,
              })}
              className={clsx(
                'px-3 py-2 rounded-xl text-sm transition-colors text-left',
                filters.priceRange === `${range.min}-${range.max}`
                  ? 'bg-primary-600/20 text-primary-300 border border-primary-500/25'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Reset */}
      {activeCount > 0 && (
        <button
          onClick={onReset}
          className="mt-2 flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors font-medium"
        >
          <X className="w-3.5 h-3.5" />
          Clear all filters ({activeCount})
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────────── */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="glass border border-white/5 rounded-2xl p-5 sticky top-24">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary-400" />
              <h3 className="font-semibold text-white text-sm">Filters</h3>
              {activeCount > 0 && (
                <span className="px-1.5 py-0.5 bg-primary-600 text-white text-2xs font-bold rounded-md">
                  {activeCount}
                </span>
              )}
            </div>
            {totalResults !== undefined && (
              <span className="text-2xs text-neutral-500">{totalResults} results</span>
            )}
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* ── Mobile Filter Button & Drawer ───────────────── */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 glass border border-white/10 hover:border-white/20 rounded-xl text-sm text-neutral-300 hover:text-white transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <span className="px-1.5 py-0.5 bg-primary-600 text-white text-2xs font-bold rounded">
              {activeCount}
            </span>
          )}
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] bg-dark/80 backdrop-blur-sm"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 bottom-0 z-[80] w-80 bg-surface border-r border-white/5 flex flex-col overflow-hidden"
              >
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-primary-400" />
                    <h3 className="font-semibold text-white">Filters</h3>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-8 h-8 rounded-xl hover:bg-white/5 flex items-center justify-center text-neutral-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-5">
                  <FilterContent />
                </div>
                <div className="px-5 py-4 border-t border-white/5">
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl text-sm transition-colors"
                  >
                    Show {totalResults || 0} Results
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}