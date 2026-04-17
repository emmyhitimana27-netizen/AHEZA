import { motion } from 'framer-motion'
import { Package, RefreshCw } from 'lucide-react'
import ProductCard from './ProductCard'
import Loader from '@components/common/Loader'

function SkeletonCard() {
  return (
    <div className="bg-surface border border-white/5 rounded-3xl overflow-hidden">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-4/5 rounded" />
        <div className="skeleton h-6 w-1/2 rounded mt-4" />
      </div>
    </div>
  )
}

export default function ProductGrid({
  products = [],
  loading = false,
  error = null,
  onRetry,
  pagination,
  onPageChange,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-80 glass border border-red-500/15 rounded-2xl text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
          <Package className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <p className="text-white font-semibold mb-1">Failed to load products</p>
          <p className="text-neutral-400 text-sm">{error}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        )}
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center h-80 glass border border-white/5 rounded-2xl text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center">
          <Package className="w-6 h-6 text-neutral-600" />
        </div>
        <div>
          <p className="text-white font-semibold mb-1">No products found</p>
          <p className="text-neutral-400 text-sm">Try adjusting your filters or search term</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductCard product={product} index={i} />
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="px-4 py-2 glass border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {Array.from({ length: Math.min(pagination.totalPages, 7) }).map((_, i) => {
            const pageNum = i + 1
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                  pagination.page === pageNum
                    ? 'bg-primary-600 text-white shadow-glow-sm'
                    : 'glass border border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                }`}
              >
                {pageNum}
              </button>
            )
          })}

          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="px-4 py-2 glass border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}