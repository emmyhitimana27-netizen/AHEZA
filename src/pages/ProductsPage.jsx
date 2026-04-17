import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { Grid3X3, List, ArrowUpDown } from 'lucide-react'
import SEOHead from '@components/common/SEOHead'
import ProductGrid from '@components/products/ProductGrid'
import ProductFilter from '@components/products/ProductFilter'
import { productService } from '@services/productService'
import { QUERY_KEYS, SORT_OPTIONS, PAGE_SIZE } from '@utils/constants'
import { useDebounce } from '@hooks/useDebounce'
import clsx from 'clsx'

const DEFAULT_FILTERS = {
  search:     '',
  type:       '',
  size:       '',
  sort:       'featured',
  priceRange: '',
  priceMin:   null,
  priceMax:   null,
  page:       1,
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode]         = useState('grid')

  /* ── Initialise filters from URL ─────────────────────── */
  const [filters, setFilters] = useState(() => ({
    ...DEFAULT_FILTERS,
    search: searchParams.get('q')    || '',
    type:   searchParams.get('type') || '',
    size:   searchParams.get('size') || '',
    sort:   searchParams.get('sort') || 'featured',
    page:   Number(searchParams.get('page')) || 1,
  }))

  /* ── Sync filters → URL ──────────────────────────────── */
  useEffect(() => {
    const params = {}
    if (filters.search)  params.q    = filters.search
    if (filters.type)    params.type = filters.type
    if (filters.size)    params.size = filters.size
    if (filters.sort !== 'featured') params.sort = filters.sort
    if (filters.page > 1) params.page = filters.page
    setSearchParams(params, { replace: true })
  }, [filters, setSearchParams])

  /* ── Fetch products ──────────────────────────────────── */
  const queryKey = [QUERY_KEYS.PRODUCTS, filters]
  const { data, isLoading, isError, error, refetch } = useQuery(
    queryKey,
    () => productService.getAll({
      search:   filters.search   || undefined,
      type:     filters.type     || undefined,
      size:     filters.size     || undefined,
      sort:     filters.sort,
      priceMin: filters.priceMin || undefined,
      priceMax: filters.priceMax || undefined,
      page:     filters.page,
      limit:    PAGE_SIZE,
    }),
    {
      keepPreviousData: true,
      staleTime: 2 * 60 * 1000,
      retry: 2,
    }
  )

  const products   = data?.products    || []
  const pagination = data?.pagination  || null
  const total      = data?.total       || 0

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters)
  }, [])

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  const handlePageChange = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      <SEOHead
        title="All Mattresses"
        description="Browse AHEZA 2050's full collection of premium mattresses. Memory foam, hybrid, orthopedic, latex and more — available with free delivery in Musanze, Rwanda."
        keywords="buy mattress Rwanda, mattress collection, memory foam mattress price Rwanda, hybrid mattress Musanze"
        url="https://aheza2050.rw/products"
      />

      {/* Page Header */}
      <div className="relative bg-surface border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-radial from-primary-900/10 to-transparent pointer-events-none" />

        <div className="container-custom relative z-10 py-12 lg:py-16"
          style={{ paddingTop: 'calc(var(--navbar-height) + 3rem)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-6 bg-primary-500" />
              <span className="text-xs font-semibold tracking-widest text-primary-400 uppercase">
                Full Collection
              </span>
            </div>
            <h1 className="font-display font-black text-white heading-lg mb-3">
              Our <span className="text-gradient-primary">Mattresses</span>
            </h1>
            <p className="text-neutral-400 text-base max-w-xl">
              Discover Rwanda's finest mattress collection. Engineered for the future, priced for today.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-dark min-h-screen">
        <div className="container-custom py-8 lg:py-12">

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              {/* Mobile Filter */}
              <ProductFilter
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleReset}
                totalResults={total}
              />

              {/* Results Count */}
              <span className="text-sm text-neutral-500">
                {isLoading
                  ? 'Loading…'
                  : `${total.toLocaleString()} mattress${total !== 1 ? 'es' : ''} found`
                }
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Sort (Desktop quick-select) */}
              <div className="hidden sm:flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange({ ...filters, sort: e.target.value, page: 1 })}
                  className="bg-transparent text-neutral-300 text-sm border-none outline-none cursor-pointer"
                  aria-label="Sort products"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-surface text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-1 glass border border-white/10 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={clsx(
                    'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'text-neutral-500 hover:text-white'
                  )}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={clsx(
                    'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                    viewMode === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'text-neutral-500 hover:text-white'
                  )}
                  aria-label="List view"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid + Sidebar Layout */}
          <div className="flex gap-8">
            {/* Desktop Sidebar Filter */}
            <div className="hidden lg:block">
              <ProductFilter
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleReset}
                totalResults={total}
              />
            </div>

            {/* Products */}
            <div className="flex-1 min-w-0">
              <ProductGrid
                products={products}
                loading={isLoading}
                error={isError ? (error?.message || 'Failed to load products') : null}
                onRetry={refetch}
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}