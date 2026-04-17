import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import {
  ChevronRight, Star, MessageSquare,
  ThumbsUp, AlertCircle
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import SEOHead from '@components/common/SEOHead'
import ProductImageGallery from '@components/products/ProductImageGallery'
import ProductDetail from '@components/products/ProductDetail'
import ProductCard from '@components/products/ProductCard'
import Loader from '@components/common/Loader'
import { productService } from '@services/productService'
import { QUERY_KEYS } from '@utils/constants'
import { reviewSchema } from '@utils/validators'
import { generateProductSchema } from '@utils/seoUtils'
import { formatDate } from '@utils/formatters'
import toast from 'react-hot-toast'
import clsx from 'clsx'

/* ─── Review Form ────────────────────────────────────────── */
function ReviewForm({ productId, onSuccess }) {
  const [rating, setRating] = useState(0)
  const [hover,  setHover]  = useState(0)
  const [loading, setLoading] = useState(false)

  const {
    register, handleSubmit, reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema.omit({ rating: true })),
  })

  const onSubmit = async (formData) => {
    if (!rating) { toast.error('Please select a rating'); return }
    try {
      setLoading(true)
      await productService.submitReview(productId, { ...formData, rating })
      toast.success('Review submitted! Thank you.')
      reset()
      setRating(0)
      onSuccess?.()
    } catch {
      toast.error('Failed to submit review. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Star Picker */}
      <div>
        <p className="text-sm font-semibold text-white mb-2">Your Rating *</p>
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHover(i + 1)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-125"
              aria-label={`Rate ${i + 1} star${i !== 0 ? 's' : ''}`}
            >
              <Star
                className="w-7 h-7 transition-colors"
                style={{
                  fill:  i < (hover || rating) ? '#2d55ff' : 'none',
                  color: i < (hover || rating) ? '#2d55ff' : '#4a4a5a',
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5 block">
            Your Name *
          </label>
          <input
            {...register('name')}
            placeholder="John Doe"
            className={clsx(
              'w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors',
              errors.name
                ? 'border-red-500/50 focus:border-red-400'
                : 'border-white/10 focus:border-primary-500/50'
            )}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5 block">
            Email *
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="you@example.com"
            className={clsx(
              'w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors',
              errors.email
                ? 'border-red-500/50 focus:border-red-400'
                : 'border-white/10 focus:border-primary-500/50'
            )}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5 block">
          Review Title *
        </label>
        <input
          {...register('title')}
          placeholder="e.g. Best mattress I've ever slept on"
          className={clsx(
            'w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors',
            errors.title
              ? 'border-red-500/50'
              : 'border-white/10 focus:border-primary-500/50'
          )}
        />
        {errors.title && (
          <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5 block">
          Your Review *
        </label>
        <textarea
          {...register('comment')}
          rows={4}
          placeholder="Share your honest experience with this mattress…"
          className={clsx(
            'w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors resize-none',
            errors.comment
              ? 'border-red-500/50'
              : 'border-white/10 focus:border-primary-500/50'
          )}
        />
        {errors.comment && (
          <p className="text-red-400 text-xs mt-1">{errors.comment.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors"
      >
        {loading ? (
          <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
        ) : (
          <><MessageSquare className="w-4 h-4" /> Submit Review</>
        )}
      </button>
    </form>
  )
}

/* ─── Review Card ────────────────────────────────────────── */
function ReviewCard({ review }) {
  return (
    <div className="glass border border-white/5 rounded-2xl p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-700/30 border border-primary-600/25 flex items-center justify-center flex-shrink-0">
            <span className="text-primary-300 font-bold text-sm">
              {review.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{review.name}</p>
            <p className="text-neutral-600 text-xs">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <div className="flex gap-0.5 flex-shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5"
              style={{
                fill:  i < review.rating ? '#2d55ff' : 'none',
                color: i < review.rating ? '#2d55ff' : '#4a4a5a',
              }}
            />
          ))}
        </div>
      </div>

      {review.title && (
        <p className="text-white font-semibold text-sm">{review.title}</p>
      )}
      <p className="text-neutral-400 text-sm leading-relaxed">{review.comment}</p>

      <div className="flex items-center gap-3 pt-1">
        {review.verified && (
          <span className="text-2xs text-green-400 font-medium px-2 py-0.5 bg-green-400/10 rounded-full border border-green-400/20">
            Verified Purchase
          </span>
        )}
        <button className="flex items-center gap-1 text-2xs text-neutral-600 hover:text-neutral-400 transition-colors ml-auto">
          <ThumbsUp className="w-3 h-3" />
          Helpful ({review.helpful || 0})
        </button>
      </div>
    </div>
  )
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function ProductDetailPage() {
  const { slug }     = useParams()
  const navigate     = useNavigate()
  const [reviewPage, setReviewPage] = useState(1)

  /* Product */
  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery(
    [QUERY_KEYS.PRODUCT_DETAIL, slug],
    () => productService.getBySlug(slug),
    { retry: 2, staleTime: 5 * 60 * 1000 }
  )

  /* Reviews */
  const {
    data: reviewData,
    refetch: refetchReviews,
  } = useQuery(
    ['reviews', slug, reviewPage],
    () => productData?.product?.id
      ? productService.getReviews(productData.product.id, { page: reviewPage, limit: 5 })
      : Promise.resolve({ reviews: [], total: 0 }),
    { enabled: !!productData?.product?.id, staleTime: 2 * 60 * 1000 }
  )

  /* Related */
  const { data: relatedData } = useQuery(
    ['related', productData?.product?.id],
    () => productService.getRelated(productData.product.id, 4),
    { enabled: !!productData?.product?.id, staleTime: 10 * 60 * 1000 }
  )

  const product  = productData?.product
  const reviews  = reviewData?.reviews || []
  const related  = relatedData?.products || []
  const schema   = product ? generateProductSchema(product) : null

  /* ── Loading ─── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center"
        style={{ paddingTop: 'var(--navbar-height)' }}
      >
        <Loader size="lg" text="Loading product…" />
      </div>
    )
  }

  /* ── Error / Not found ─── */
  if (isError || !product) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4"
        style={{ paddingTop: 'var(--navbar-height)' }}
      >
        <div className="text-center max-w-md glass border border-red-500/15 rounded-2xl p-10">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="font-display font-bold text-white text-2xl mb-2">Product Not Found</h2>
          <p className="text-neutral-400 text-sm mb-6">
            The mattress you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-semibold text-sm transition-colors"
          >
            Browse All Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title={product.name}
        description={product.description}
        keywords={`${product.name}, ${product.type}, mattress Rwanda, ${product.size || ''}`}
        image={product.images?.[0]}
        url={`https://aheza2050.rw/products/${product.slug}`}
        type="product"
        schema={schema}
      />

      <div
        className="bg-dark min-h-screen"
        style={{ paddingTop: 'var(--navbar-height)' }}
      >
        <div className="container-custom py-8">

          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-xs text-neutral-500 mb-8 flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link to="/"        className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-neutral-300 truncate max-w-[200px]">{product.name}</span>
          </motion.nav>

          {/* Product Main Section */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductImageGallery
                images={product.images}
                productName={product.name}
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductDetail product={product} />
            </motion.div>
          </div>

          {/* ── Reviews Section ────────────────────────────────── */}
          <div className="border-t border-white/5 pt-12 mb-16">
            <div className="grid lg:grid-cols-2 gap-12">

              {/* Reviews List */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="font-display font-bold text-white text-2xl">
                    Customer Reviews
                  </h2>
                  {reviewData?.total > 0 && (
                    <span className="px-2.5 py-1 bg-primary-600/20 text-primary-300 text-xs font-bold rounded-lg">
                      {reviewData.total}
                    </span>
                  )}
                </div>

                {reviews.length === 0 ? (
                  <div className="glass border border-white/5 rounded-2xl p-8 text-center">
                    <MessageSquare className="w-10 h-10 text-neutral-700 mx-auto mb-3" />
                    <p className="text-neutral-400 text-sm">No reviews yet. Be the first!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                    {reviewData?.total > reviews.length && (
                      <button
                        onClick={() => setReviewPage((p) => p + 1)}
                        className="w-full py-3 glass border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white rounded-xl text-sm font-medium transition-all"
                      >
                        Load More Reviews
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Write a Review */}
              <div>
                <h3 className="font-display font-bold text-white text-xl mb-6">
                  Write a Review
                </h3>
                <div className="glass border border-white/5 rounded-2xl p-6">
                  <ReviewForm
                    productId={product.id}
                    onSuccess={refetchReviews}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Related Products ────────────────────────────────── */}
          {related.length > 0 && (
            <div className="border-t border-white/5 pt-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display font-bold text-white text-2xl">
                  You May Also Like
                </h2>
                <Link
                  to="/products"
                  className="text-primary-400 hover:text-primary-300 text-sm font-semibold transition-colors"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((rel, i) => (
                  <motion.div
                    key={rel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <ProductCard product={rel} index={i} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}