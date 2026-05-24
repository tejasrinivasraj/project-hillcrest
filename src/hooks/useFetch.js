import { useState, useEffect, useCallback } from 'react'

export function useFetch(fetchFn, { immediate = true, deps = [] } = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchFn(...args)
      if (result.ok) {
        setData(result.data)
      } else {
        setError(result.error)
      }
      return result
    } catch (err) {
      setError(err.message)
      return { ok: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, deps)

  useEffect(() => {
    if (immediate) execute()
  }, [execute, immediate])

  return { data, loading, error, execute, setData }
}
