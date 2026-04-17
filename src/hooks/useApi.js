import { useState, useCallback, useEffect, useRef } from 'react'

/**
 * useApi — manual trigger hook
 * Call execute(...args) whenever you need to fire the request.
 */
export function useApi(apiFunction) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const abortRef = useRef(null)

  const execute = useCallback(
    async (...args) => {
      /* Abort any previous in-flight request */
      if (abortRef.current) abortRef.current.abort()
      abortRef.current = new AbortController()

      try {
        setLoading(true)
        setError(null)
        const result = await apiFunction(...args)
        setData(result)
        return result
      } catch (err) {
        if (err?.name !== 'AbortError') {
          const message =
            err?.message || err?.data?.message || 'Something went wrong'
          setError(message)
          throw err
        }
      } finally {
        setLoading(false)
      }
    },
    [apiFunction]
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort()
    }
  }, [])

  return { data, loading, error, execute, reset }
}

/**
 * useFetch — fires automatically on mount (and when deps change).
 * Pass params as second argument; it will re-fetch when they change.
 */
export function useFetch(apiFunction, params, deps = []) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  /* Stable serialisation of params so effect doesn't run on every render */
  const serialised = JSON.stringify(params)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const parsed = JSON.parse(serialised)
      const result = params !== undefined
        ? await apiFunction(parsed)
        : await apiFunction()
      setData(result)
    } catch (err) {
      if (err?.name !== 'AbortError') {
        setError(err?.message || 'Failed to load data')
      }
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFunction, serialised])

  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, ...deps])

  return { data, loading, error, refetch: fetchData }
}

export default useApi