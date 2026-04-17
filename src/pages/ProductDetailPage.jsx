import { useState }                  from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion }                    from 'framer-motion'
import { useQuery }                  from 'react-query'
import {
  ChevronRight, Star, MessageSquare,
  ThumbsUp, AlertCircle, BarChart2
} from 'lucide-react'
import { useForm }                   from 'react-hook-form'
import { zodResolver }               from '@hookform/resolvers/zod'
import SEOHead                       from '@components/common/SEOHead'
import ProductImageGallery           from '@components/products/ProductImageGallery'
import ProductDetail                 from '@components/products/ProductDetail'
import ProductCard                   from '@components/products/ProductCard'
import Loader                        from '@components/common/Loader'
import { productService }            from '@services/productService'
import { QUERY_KEYS }                from '@utils/constants'
import { reviewSchema }              from '@utils/validators'
import { generateProductSchema }     from '@utils/seoUtils'
import { formatDate }                from '@utils/formatters'
import { useProductReviews }         from '@hooks/useProductReviews'
import clsx                          from 'clsx'

/* ─── Rating breakdown bar ───────────────────────────────── */
function RatingBar({ star, count, total }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-neutral-400 w-3 text-right">{star}</span>
      <Star className="w-3 h-3 text-primary-400 fill-primary-400 flex-shrink-0" />
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: (5 - star) * 0.08 }}
        />
      </div>
      <span className="text-neutral-500 w-6 text-right">{count}</span>
    </div>
  )
}

/* ─── Single review card ─────────────────────────────────── */
function ReviewCard({ review, onHelpful, isMarkingHelpful }) {
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
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-white text-sm font-semibold">{review.name}</p>
              {review.verified && (
                <span className="text-2xs text-green-400 font-medium px-2 py-0.5 bg-green-400/10 rounded-full border border-green-400/20">
                  ✓ Verified Purchase
                </span>
              )}
              {review._optimistic && (
                <span className="text-2xs text-primary-400 font-medium px-2 py-0.5 bg-primary-400/10 rounded-full">
                  Posting…
                </span>
              )}
            </div>
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
        <button
          onClick={() => !review._optimistic && onHelpful(review.id)}
          disabled={isMarkingHelpful || review._optimistic}
          className="flex items-center gap-1 text-2xs text-neutral-600 hover:text-neutral-400 transition-colors ml-auto disabled:opacity-40"
        >
          <ThumbsUp className="w-3 h-3" />
          Helpful ({review.helpful || 0})
        </button>
      </div>
    </div>
  )
}

/* ─── Review submission form ─────────────────────────────── */
function ReviewForm({ productId, onSuccess }) {
  const [rating, setRating] = useState(0)
  const [hover,  setHover]  = useState(0)

  const {
    register, handleSubmit, reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      reviewSchema.omit({ rating: true })
    ),
  })

  const onSubmit = async (formData) => {
    if (!rating) {
      return
    }
    onSuccess({ ...formData, rating })
    reset()
    setRating(0)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Star picker */}
      <div>
        <p className="text-sm font-semibold text-white mb-2">
          Your Rating <span className="text-primary-400">*</span>
        </p>
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHover(i + 1)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-125"
              aria-label={`${i + 1} star${i !== 0 ? 's' : ''}`}
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
          {rating === 0 && (
            <span className="text-xs text-neutral-600 self-center ml-2">
              Click to rate
            </span>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5 block">
            Name <span className="text-primary-400">*</span>
          </label>
          <input
            {...register('name')}
            placeholder="Jean Uwimana"
            className={clsx(
              'w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors',
              errors.name
                ? 'border-red-500/50'
                : 'border-white/10 focus:border-primary-500/50'
            )}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5 block">
            Email <span className="text-primary-400">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="you@example.com"
            className={clsx(
              'w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors',
              errors.email
                ? 'border-red-500/50'
                : 'border-white/10 focus:border-primary-500/50'
            )}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5 block">
          Review Title
        </label>
        <input
          {...register('title')}
          placeholder="e.g. Best mattress I've ever slept on"
          className="w-full bg-white/5 border border-white/10 focus:border-primary-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5 block">
          Your Review <span className="text-primary-400">*</span>
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
          <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.comment.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!rating}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Submit Review
        </button>
        {!rating && (
          <p className="text-neutral-500 text-xs">Please select a rating first</p>
        )}
      </div>

      <p className="text-neutral-600 text-xs">
        💡 If you purchased this mattress from us, your review will automatically
        receive a <span className="text-green-400 font-medium">Verified Purchase</span> badge.
      </p>
    </form>
  )
}

/* ─── Main page ──────────────────────────────────────────── */
export default function ProductDetailPage() {
  const { slug }     = useParams()
  const navigate     = useNavigate()
  const [reviewPage, setReviewPage] = useState(1)

  /* Product */
  const {
    data:      productData,
    isLoading: productLoading,
    isError:   productError,
  } = useQuery(
    [QUERY_KEYS.PRODUCT_DETAIL, slug],
    () => productService.getBySlug(slug),
    { retry: 2, staleTime: 5 * 60 * 1000 }
  )

  const product = productData?.data?.product

  /* Reviews — real-time hook */
  const {
    reviews,
    total:           reviewTotal,
    totalPages:      reviewTotalPages,
    averageRating,
    ratingBreakdown,
    isLoading:       reviewsLoading,
    isFetching:      reviewsFetching,
    submitReview,
    isSubmitting,
    markHelpful,
    isMarkingHelpful,
  } = useProductReviews(product?.id, reviewPage)

  /* Related */
  const { data: relatedData } = useQuery(
    ['related', product?.id],
    () => productService.getRelated(product.id, 4),
    { enabled: !!product?.id, staleTime: 10 * 60 * 1000 }
  )

  const related = relatedData?.data?.products || []
  const schema  = product ? generateProductSchema(product) : null

  if (productLoading) {
    return (
      <div
        className="min-h-screen bg-dark flex items-center justify-center"
        style={{ paddingTop: 'var(--navbar-height)' }}
      >
        <Loader size="lg" text="Loading product…" />
      </div>
    )
  }

  if (productError || !product) {
    return (
      <div
        className="min-h-screen bg-dark flex items-center justify-center px-4"
        style={{ paddingTop: 'var(--navbar-height)' }}
      >
        <div className="text-center max-w-md glass border border-red-500/15 rounded-2xl p-10">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="font-display font-bold text-white text-2xl mb-2">
            Product Not Found
          </h2>
          <p className="text-neutral-400 text-sm mb-6">
            This mattress doesn't exist or has been removed.
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
        keywords={`${product.name}, ${product.type}, mattress Rwanda`}
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
          <nav
            className="flex items-center gap-1.5 text-xs text-neutral-500 mb-8 flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-neutral-300 truncate max-w-[200px]">{product.name}</span>
          </nav>

          {/* Product main */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
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

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductDetail product={product} />
            </motion.div>
          </div>

          {/* Reviews */}
          <div className="border-t border-white/5 pt-12 mb-16">
            <div className="grid lg:grid-cols-2 gap-12">

              {/* Reviews list + rating summary */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="font-display font-bold text-white text-2xl">
                    Customer Reviews
                  </h2>
                  {reviewTotal > 0 && (
                    <span className="px-2.5 py-1 bg-primary-600/20 text-primary-300 text-xs font-bold rounded-lg">
                      {reviewTotal}
                    </span>
                  )}
                  {reviewsFetching && !reviewsLoading && (
                    <span className="text-2xs text-neutral-600 animate-pulse">Updating…</span>
                  )}
                </div>

                {/* Rating summary */}
                {averageRating && ratingBreakdown.length > 0 && (
                  <div className="glass border border-white/5 rounded-2xl p-5 mb-6 flex gap-6 items-center">
                    <div className="text-center flex-shrink-0">
                      <p className="font-display font-black text-5xl text-white leading-none">
                        {Number(averageRating).toFixed(1)}
                      </p>
                      <div className="flex gap-0.5 justify-center my-1.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3"
                            style={{
                              fill:  i < Math.round(averageRating) ? '#2d55ff' : 'none',
                              color: i < Math.round(averageRating) ? '#2d55ff' : '#4a4a5a',
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-neutral-500 text-xs">{reviewTotal} reviews</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const found = ratingBreakdown.find(
                          (r) => Number(r.rating) === star
                        )
                        return (
                          <RatingBar
                            key={star}
                            star={star}
                            count={Number(found?.count || 0)}
                            total={reviewTotal}
                          />
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Review list */}
                {reviewsLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader size="md" text="Loading reviews…" />
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="glass border border-white/5 rounded-2xl p-8 text-center">
                    <MessageSquare className="w-10 h-10 text-neutral-700 mx-auto mb-3" />
                    <p className="text-neutral-400 text-sm">
                      No reviews yet. Be the first to share your experience!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <ReviewCard
                        key={review.id}
                        review={review}
                        onHelpful={markHelpful}
                        isMarkingHelpful={isMarkingHelpful}
                      />
                    ))}

                    {/* Pagination */}
                    {reviewTotalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 pt-2">
                        <button
                          onClick={() => setReviewPage((p) => Math.max(1, p - 1))}
                          disabled={reviewPage <= 1}
                          className="px-4 py-2 glass border border-white/10 text-neutral-400 hover:text-white rounded-xl text-xs font-medium transition-all disabled:opacity-40"
                        >
                          Previous
                        </button>
                        <span className="text-xs text-neutral-600">
                          {reviewPage} / {reviewTotalPages}
                        </span>
                        <button
                          onClick={() => setReviewPage((p) => Math.min(reviewTotalPages, p + 1))}
                          disabled={reviewPage >= reviewTotalPages}
                          className="px-4 py-2 glass border border-white/10 text-neutral-400 hover:text-white rounded-xl text-xs font-medium transition-all disabled:opacity-40"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Write review */}
              <div>
                <h3 className="font-display font-bold text-white text-xl mb-6">
                  Write a Review
                </h3>
                <div className="glass border border-white/5 rounded-2xl p-6">
                  <ReviewForm
                    productId={product.id}
                    onSuccess={(data) => submitReview(data)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Related products */}
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