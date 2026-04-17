import { useQuery, useMutation, useQueryClient } from 'react-query'
import { productService } from '@services/productService'
import toast from 'react-hot-toast'

/**
 * Manages reviews for a single product with optimistic updates.
 */
export function useProductReviews(productId, page = 1) {
  const queryClient = useQueryClient()
  const key         = ['reviews', productId, page]

  /* Fetch reviews */
  const query = useQuery(
    key,
    () => productService.getReviews(productId, { page, limit: 5 }),
    {
      enabled:          !!productId,
      staleTime:        30 * 1000,
      refetchInterval:  30 * 1000,    // poll every 30 s for new reviews
      keepPreviousData: true,
    }
  )

  /* Submit review with optimistic update */
  const submitMutation = useMutation(
    (reviewData) => productService.submitReview(productId, reviewData),
    {
      /* Optimistically add the review to the list */
      onMutate: async (newReview) => {
        await queryClient.cancelQueries(key)
        const previous = queryClient.getQueryData(key)

        queryClient.setQueryData(key, (old) => {
          if (!old) return old
          const optimistic = {
            id:        `temp-${Date.now()}`,
            name:      newReview.name,
            rating:    newReview.rating,
            title:     newReview.title,
            comment:   newReview.comment,
            verified:  false,
            helpful:   0,
            createdAt: new Date().toISOString(),
            _optimistic: true,
          }
          return {
            ...old,
            data: {
              ...old.data,
              reviews: [optimistic, ...(old.data?.reviews || [])],
              total:   (old.data?.total || 0) + 1,
            },
          }
        })

        return { previous }
      },
      onError: (_err, _vars, ctx) => {
        /* Roll back optimistic update */
        if (ctx?.previous) queryClient.setQueryData(key, ctx.previous)
      },
      onSuccess: (response) => {
        /* Replace optimistic with real data */
        queryClient.invalidateQueries(key)
        /* Also refresh the product to show new rating */
        queryClient.invalidateQueries(['product', productId])
        queryClient.invalidateQueries(QUERY_KEYS?.FEATURED)

        const isVerified = response?.data?.review?.verified
        toast.success(
          isVerified
            ? '✓ Review submitted with Verified Purchase badge!'
            : '✓ Review submitted successfully.'
        )
      },
      onSettled: () => {
        queryClient.invalidateQueries(key)
      },
    }
  )

  /* Mark helpful */
  const helpfulMutation = useMutation(
    (reviewId) => productService.markHelpful(reviewId),
    {
      onMutate: async (reviewId) => {
        await queryClient.cancelQueries(key)
        const previous = queryClient.getQueryData(key)

        queryClient.setQueryData(key, (old) => {
          if (!old) return old
          return {
            ...old,
            data: {
              ...old.data,
              reviews: (old.data?.reviews || []).map((r) =>
                r.id === reviewId
                  ? { ...r, helpful: (r.helpful || 0) + 1 }
                  : r
              ),
            },
          }
        })

        return { previous }
      },
      onError: (_err, _vars, ctx) => {
        if (ctx?.previous) queryClient.setQueryData(key, ctx.previous)
      },
    }
  )

  return {
    reviews:         query.data?.data?.reviews || [],
    total:           query.data?.data?.total || 0,
    totalPages:      query.data?.data?.totalPages || 1,
    averageRating:   query.data?.data?.averageRating,
    reviewCount:     query.data?.data?.reviewCount,
    ratingBreakdown: query.data?.data?.ratingBreakdown || [],
    isLoading:       query.isLoading,
    isFetching:      query.isFetching,
    isError:         query.isError,
    submitReview:    submitMutation.mutate,
    isSubmitting:    submitMutation.isLoading,
    markHelpful:     helpfulMutation.mutate,
    isMarkingHelpful: helpfulMutation.isLoading,
  }
}