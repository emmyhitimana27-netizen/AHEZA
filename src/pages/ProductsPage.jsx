import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from 'react-query'
import {
  Grid3X3, LayoutList, SlidersHorizontal, X,
  Search, ArrowUpDown, Package, ChevronDown,
  RefreshCw, Sparkles
} from 'lucide-react'
import SEOHead from '@components/common/SEOHead'
import ProductCard from '@components/products/ProductCard'
import Loader from '@components/common/Loader'
import { productService } from '@services/productService'
import { QUERY_KEYS, SORT_OPTIONS, PAGE_SIZE, MATTRESS_SIZES } from '@utils/constants'
import { useDebounce } from '@hooks/useDebounce'
import { formatPrice } from '@utils/formatters'
import clsx from 'clsx'

/* ─── Price range chips ──────────────────────────────────── */
const PRICE_RANGES = [
  { label: 'All Prices', min: null,    max: null },
  { label: 'Under 200k', min: 0,       max: 200000 },
  { label: '200k – 500k', min: 200000,  max: 500000 },
  { label: '500k – 800k', min: 500000,  max: 800000 },
  { label: 'Above 800k',  min: 800000,  max: null },
]

/* ─── Default filters ────────────────────────────────────── */
const DEFAULT_FILTERS = {
  search:     '',
  type:       '',
  size:       '',
  sort:       'featured',
  priceIdx:   0,
  categoryId: '',
  page:       1,
}

/* ─── Skeleton card ──────────────────────────────────────── */
function ProductSkeleton() {
  return (
    <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-3 w-10 rounded" />
        </div>
        <div className="skeleton h-5 w-4/5 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-3/4 rounded" />
        <div className="flex justify-between items-center pt-2">
          <div className="skeleton h-6 w-24 rounded" />
          <div className="skeleton h-3 w-12 rounded" />
        </div>
      </div>
    </div>
  )
}

/* ─── Empty state ────────────────────────────────────────── */
function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-24 gap-5 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-neutral-800/60 flex items-center justify-center">
        <Package className="w-9 h-9 text-neutral-600" />
      </div>
      <div>
        <h3 className="font-display font-bold text-white text-xl mb-1">
          No mattresses found
        </h3>
        <p className="text-neutral-500 text-sm max-w-sm">
          Try adjusting your filters, changing the search term, or browse our full collection.
        </p>
      </div>
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-sm font-semibold transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Reset All Filters
      </button>
    </motion.div>
  )
}

/* ─── Error state ────────────────────────────────────────── */
function ErrorState({ error, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-24 gap-4 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
        <Package className="w-7 h-7 text-red-400" />
      </div>
      <p className="text-white font-semibold">Failed to load products</p>
      <p className="text-neutral-500 text-sm">{error}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-sm font-semibold transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Try Again
      </button>
    </motion.div>
  )
}

/* ─── Chip button ────────────────────────────────────────── */
function Chip({ active, onClick, children, count }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border whitespace-nowrap',
        active
          ? 'bg-primary-600/20 border-primary-500/40 text-primary-300 shadow-glow-sm'
          : 'bg-white/[0.03] border-white/8 text-neutral-400 hover:text-white hover:border-white/15 hover:bg-white/[0.06]'
      )}
    >
      {children}
      {count !== undefined && (
        <span className={clsx(
          'text-2xs font-bold px-1.5 py-0.5 rounded-md',
          active
            ? 'bg-primary-500/30 text-primary-200'
            : 'bg-white/8 text-neutral-500'
        )}>
          {count}
        </span>
      )}
    </button>
  )
}

/* ─── Pagination ─────────────────────────────────────────── */
function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages = []
    const range = 2
    let start   = Math.max(1, page - range)
    let end     = Math.min(totalPages, page + range)

    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push('...')
    }
    for (let i = start; i <= end; i++) pages.push(i)
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="flex items-center justify-center gap-1.5 pt-8">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="px-3.5 py-2 glass border border-white/8 text-neutral-400 hover:text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {getPages().map((p, i) => (
        p === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-neutral-600 text-sm">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={clsx(
              'w-9 h-9 rounded-xl text-sm font-semibold transition-all',
              p === page
                ? 'bg-primary-600 text-white shadow-glow-sm'
                : 'glass border border-white/8 text-neutral-400 hover:text-white hover:border-white/15'
            )}
          >
            {p}
          </button>
        )
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3.5 py-2 glass border border-white/8 text-neutral-400 hover:text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}

/* ═════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
═════════════════════════════════════════════════════════ */
export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFilter, setMobileFilter] = useState(false)
  const [searchInput,  setSearchInput]  = useState(
    searchParams.get('q') || ''
  )

  const debouncedSearch = useDebounce(searchInput, 400)

  /* ── Filters state from URL ────────────────────────────── */
  const [filters, setFilters] = useState(() => ({
    ...DEFAULT_FILTERS,
    search:     searchParams.get('q')          || '',
    type:       searchParams.get('type')       || '',
    size:       searchParams.get('size')       || '',
    sort:       searchParams.get('sort')       || 'featured',
    categoryId: searchParams.get('category')   || '',
    page:       Number(searchParams.get('page')) || 1,
  }))

  /* Debounced search propagation */
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setFilters((prev) => ({ ...prev, search: debouncedSearch, page: 1 }))
    }
  }, [debouncedSearch])

  /* Sync filters → URL */
  useEffect(() => {
    const params = {}
    if (filters.search)               params.q        = filters.search
    if (filters.type)                 params.type     = filters.type
    if (filters.size)                 params.size     = filters.size
    if (filters.sort !== 'featured')  params.sort     = filters.sort
    if (filters.categoryId)           params.category = filters.categoryId
    if (filters.page > 1)            params.page     = filters.page
    setSearchParams(params, { replace: true })
  }, [filters, setSearchParams])

  /* ── Fetch categories from backend ─────────────────────── */
  const { data: catData } = useQuery(
    QUERY_KEYS.CATEGORIES,
    () => productService.getCategories(),
    { staleTime: 10 * 60 * 1000, retry: 2 }
  )
  const categories = catData?.data?.categories || []

  /* ── Fetch products ────────────────────────────────────── */
  const priceRange = PRICE_RANGES[filters.priceIdx] || PRICE_RANGES[0]

  const {
    data, isLoading, isError, error, refetch, isFetching,
  } = useQuery(
    [QUERY_KEYS.PRODUCTS, filters],
    () => productService.getAll({
      search:     filters.search   || undefined,
      type:       filters.type     || undefined,
      size:       filters.size     || undefined,
      sort:       filters.sort,
      categoryId: filters.categoryId || undefined,
      priceMin:   priceRange.min ?? undefined,
      priceMax:   priceRange.max ?? undefined,
      page:       filters.page,
      limit:      PAGE_SIZE,
    }),
    {
      keepPreviousData: true,
      staleTime: 2 * 60 * 1000,
      retry: 2,
    }
  )

  const products   = data?.data?.products   || []
  const pagination = data?.data?.pagination || null
  const total      = data?.data?.total      || 0

  /* ── Derived mattress types from categories ────────────── */
  const typeFilters = categories.map((c) => ({
    value: c.slug || c.name.toLowerCase().replace(/\s/g, '_'),
    label: c.name,
    count: Number(c.productCount || 0),
    type:  c.slug === 'memory-foam'   ? 'memory_foam'
         : c.slug === 'natural-latex' ? 'latex'
         : c.slug === 'cooling-gel'   ? 'cooling_gel'
         : c.slug || c.name.toLowerCase().replace(/\s/g, '_'),
    categoryId: c.id,
  }))

  /* ── Filter helpers ────────────────────────────────────── */
  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page:  1,
    }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setSearchInput('')
  }, [])

  const activeFilterCount = [
    filters.type,
    filters.size,
    filters.priceIdx > 0,
    filters.search,
    filters.categoryId,
  ].filter(Boolean).length

  /* ── Container variants ────────────────────────────────── */
  const containerVariants = {
    hidden:  {},
    visible: {
      transition: { staggerChildren: 0.06 },
    },
  }

  const itemVariants = {
    hidden:  { opacity: 0, y: 24, scale: 0.97 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <>
      <SEOHead
        title="All Mattresses"
        description="Browse AHEZA 2050's full collection of premium mattresses. Memory foam, hybrid, orthopedic, latex and more with free delivery in Musanze."
        keywords="buy mattress Rwanda, mattress collection, memory foam mattress price Rwanda, hybrid mattress Musanze"
        url="https://aheza2050.rw/products"
      />

      {/* ══ PAGE HEADER ════════════════════════════════════ */}
      <div className="relative bg-surface overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-radial from-primary-900/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-600/20 to-transparent" />

        <div
          className="container-custom relative z-10 pb-10 lg:pb-14"
          style={{ paddingTop: 'calc(var(--navbar-height) + 2.5rem)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-xs font-semibold tracking-widest text-primary-400 uppercase">
                Full Collection
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <h1 className="font-display font-black text-white heading-lg mb-2">
                  Premium <span className="text-gradient-primary">Mattresses</span>
                </h1>
                <p className="text-neutral-400 text-base max-w-xl">
                  Discover Rwanda's finest mattress collection — engineered for the future, priced for today.
                </p>
              </div>

              {/* Search box */}
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search mattresses…"
                    className="w-full bg-white/5 border border-white/10 focus:border-primary-500/50 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all"
                  />
                  {searchInput && (
                    <button
                      onClick={() => { setSearchInput(''); updateFilter('search', '') }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══ FILTERS BAR ════════════════════════════════════ */}
      <div className="bg-dark/80 backdrop-blur-md sticky top-[var(--navbar-height)] z-30 border-b border-white/5">
        <div className="container-custom py-4">

          {/* Row 1: Category chips (from backend) */}
          <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
            <Chip
              active={!filters.categoryId && !filters.type}
              onClick={() => { updateFilter('categoryId', ''); updateFilter('type', '') }}
              count={total}
            >
              All
            </Chip>

            {categories.map((cat) => {
              const catType = cat.slug === 'memory-foam'   ? 'memory_foam'
                            : cat.slug === 'natural-latex' ? 'latex'
                            : cat.slug === 'cooling-gel'   ? 'cooling_gel'
                            : cat.slug || ''

              const isActive = filters.categoryId
                ? Number(filters.categoryId) === cat.id
                : filters.type === catType

              return (
                <Chip
                  key={cat.id}
                  active={isActive}
                  onClick={() => {
                    if (isActive) {
                      updateFilter('categoryId', '')
                      updateFilter('type', '')
                    } else {
                      updateFilter('categoryId', String(cat.id))
                      updateFilter('type', catType)
                    }
                  }}
                  count={Number(cat.productCount || 0)}
                >
                  {cat.name}
                </Chip>
              )
            })}
          </div>

          {/* Row 2: Size + Price + Sort + Active filter count */}
          <div className="flex items-center gap-2 flex-wrap">

            {/* Size dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3.5 py-2 glass border border-white/8 hover:border-white/15 rounded-xl text-sm text-neutral-400 hover:text-white transition-all">
                {filters.size
                  ? MATTRESS_SIZES.find((s) => s.value === filters.size)?.label || 'Size'
                  : 'Size'
                }
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 mt-1.5 w-52 glass-dark border border-white/10 rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40 shadow-2xl">
                <button
                  onClick={() => updateFilter('size', '')}
                  className={clsx(
                    'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    !filters.size ? 'bg-primary-600/20 text-primary-300' : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  All Sizes
                </button>
                {MATTRESS_SIZES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => updateFilter('size', filters.size === s.value ? '' : s.value)}
                    className={clsx(
                      'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between',
                      filters.size === s.value
                        ? 'bg-primary-600/20 text-primary-300'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <span>{s.label}</span>
                    <span className="text-neutral-600 text-xs">{s.dimensions}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {PRICE_RANGES.map((range, i) => (
                <button
                  key={i}
                  onClick={() => updateFilter('priceIdx', filters.priceIdx === i ? 0 : i)}
                  className={clsx(
                    'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border',
                    filters.priceIdx === i
                      ? 'bg-primary-600/20 border-primary-500/35 text-primary-300'
                      : 'bg-transparent border-white/5 text-neutral-500 hover:text-white hover:border-white/15'
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Sort */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500 hidden sm:block" />
              <select
                value={filters.sort}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="bg-white/5 border border-white/8 text-neutral-300 text-xs font-medium rounded-lg px-3 py-2 outline-none cursor-pointer hover:border-white/15 transition-colors"
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-surface text-white"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Result count + clear */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-600 hidden sm:inline">
                {isLoading ? '…' : `${total} result${total !== 1 ? 's' : ''}`}
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs text-red-400/80 hover:text-red-300 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear ({activeFilterCount})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══ PRODUCTS GRID ══════════════════════════════════ */}
      <div className="bg-dark min-h-[60vh]">
        <div className="container-custom py-8 lg:py-10">

          {/* Loading indicator when refetching */}
          <AnimatePresence>
            {isFetching && !isLoading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 px-4 py-2.5 bg-primary-600/10 border border-primary-500/15 rounded-xl w-fit mx-auto">
                  <div className="w-3 h-3 border-2 border-primary-400/30 border-t-primary-400 rounded-full animate-spin" />
                  <span className="text-xs text-primary-300 font-medium">
                    Updating results…
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading state */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <ErrorState
              error={error?.message || 'Failed to load products'}
              onRetry={refetch}
            />
          ) : products.length === 0 ? (
            <EmptyState onReset={resetFilters} />
          ) : (
            <>
              {/* Active filters summary */}
              {(filters.search || filters.type || filters.size || filters.priceIdx > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap items-center gap-2 mb-6"
                >
                  <span className="text-xs text-neutral-500">Showing:</span>

                  {filters.search && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-primary-600/15 border border-primary-500/20 text-primary-300 text-xs rounded-lg">
                      "{filters.search}"
                      <button onClick={() => { setSearchInput(''); updateFilter('search', '') }}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {filters.type && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-primary-600/15 border border-primary-500/20 text-primary-300 text-xs rounded-lg capitalize">
                      {filters.type.replace(/_/g, ' ')}
                      <button onClick={() => { updateFilter('type', ''); updateFilter('categoryId', '') }}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {filters.size && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-primary-600/15 border border-primary-500/20 text-primary-300 text-xs rounded-lg">
                      {MATTRESS_SIZES.find((s) => s.value === filters.size)?.label}
                      <button onClick={() => updateFilter('size', '')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {filters.priceIdx > 0 && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-primary-600/15 border border-primary-500/20 text-primary-300 text-xs rounded-lg">
                      {PRICE_RANGES[filters.priceIdx].label}
                      <button onClick={() => updateFilter('priceIdx', 0)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </motion.div>
              )}

              {/* Products grid with stagger */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    layout
                  >
                    <ProductCard product={product} index={i} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {pagination && (
                <Pagination
                  page={pagination.page}
                  totalPages={pagination.totalPages}
                  onChange={(p) => {
                    setFilters((prev) => ({ ...prev, page: p }))
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}