import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useQuery } from 'react-query'
import { productService } from '@services/productService'
import { QUERY_KEYS } from '@utils/constants'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import ProductCard from '@components/products/ProductCard'
import Loader from '@components/common/Loader'

export default function FeaturedProducts() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  const { data, isLoading, isError } = useQuery(
    [QUERY_KEYS.FEATURED, { limit: 6 }],
    () => productService.getFeatured(6),
    { staleTime: 5 * 60 * 1000, retry: 2 }
  )

  const products = data?.products || []

  return (
    <section
      ref={ref}
      className="relative section-padding overflow-hidden"
      aria-labelledby="featured-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary-700/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-primary-700/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-xs font-semibold tracking-widest text-primary-400 uppercase">Featured Collection</span>
            </div>
            <h2
              id="featured-heading"
              className="font-display font-black text-white heading-lg"
            >
              Our Best{' '}
              <span className="text-gradient-primary">Mattresses</span>
            </h2>
            <p className="text-neutral-400 text-base mt-3 max-w-lg">
              Handpicked premium mattresses for every sleep style and budget — available for same-day delivery in Musanze.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 px-5 py-2.5 glass border border-primary-500/25 hover:border-primary-400/50 text-primary-300 hover:text-white rounded-xl text-sm font-semibold transition-all duration-300"
            >
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader size="lg" text="Loading mattresses…" />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
            <p className="text-neutral-400">Failed to load products.</p>
            <Link to="/products" className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
              Browse all products →
            </Link>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-neutral-500 py-20">
            <p>No featured products available yet.</p>
            <Link to="/products" className="text-primary-400 hover:underline mt-2 inline-block text-sm">
              Browse the catalog →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}