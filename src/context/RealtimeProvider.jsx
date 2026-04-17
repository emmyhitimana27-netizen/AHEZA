import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { REALTIME_URL } from '@utils/constants'

function RealtimeProvider({ children }) {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!REALTIME_URL || typeof window === 'undefined') return
    if (!window.EventSource) return

    let fallbackTimer = null
    let source = null

    try {
      source = new EventSource(REALTIME_URL, { withCredentials: true })
    } catch (err) {
      source = null
    }

    const invalidateQueries = (queryKey) => {
      if (queryKey) {
        queryClient.invalidateQueries(queryKey)
      } else {
        queryClient.invalidateQueries()
      }
    }

    const invalidateResource = (resource) => {
      queryClient.invalidateQueries((queryKey) => {
        return Array.isArray(queryKey) && queryKey[0] === resource
      })
    }

    const handleMessage = (event) => {
      if (!event.data) {
        invalidateQueries()
        return
      }

      let payload = null
      try {
        payload = JSON.parse(event.data)
      } catch (err) {
        invalidateQueries()
        return
      }

      const { queryKey, resource, eventType } = payload
      if (queryKey) {
        invalidateQueries(queryKey)
        return
      }

      if (resource) {
        invalidateResource(resource)
        return
      }

      if (eventType) {
        const resourceName = eventType.split('.')[0]
        invalidateResource(resourceName)
        return
      }

      invalidateQueries()
    }

    const handleError = () => {
      if (!source || source.readyState === EventSource.CLOSED) {
        if (fallbackTimer === null) {
          fallbackTimer = window.setInterval(() => {
            queryClient.invalidateQueries()
          }, 30000)
        }
      }
    }

    if (!source) {
      fallbackTimer = window.setInterval(() => {
        queryClient.invalidateQueries()
      }, 30000)

      return () => {
        if (fallbackTimer !== null) {
          window.clearInterval(fallbackTimer)
        }
      }
    }

    source.addEventListener('message', handleMessage)
    source.addEventListener('error', handleError)

    return () => {
      source.removeEventListener('message', handleMessage)
      source.removeEventListener('error', handleError)
      source.close()
      if (fallbackTimer !== null) {
        window.clearInterval(fallbackTimer)
      }
    }
  }, [queryClient])

  return <>{children}</>
}

export default RealtimeProvider
