export function createApiClient(baseURL = '', defaultHeaders = {}) {
  async function request(endpoint, config = {}) {
    const { method = 'GET', headers = {}, body, timeout = 10000, signal } = config
    const url = `${baseURL}${endpoint}`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    const mergedSignal = signal || controller.signal

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', ...defaultHeaders, ...headers },
        body: body ? JSON.stringify(body) : undefined,
        signal: mergedSignal,
      })

      const contentType = response.headers.get('content-type')
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text()

      return {
        data,
        ok: response.ok,
        status: response.status,
        error: response.ok ? null : data?.message || `HTTP ${response.status}`,
      }
    } catch (err) {
      return {
        data: null,
        ok: false,
        status: 0,
        error: err.name === 'AbortError' ? 'Request timeout' : err.message,
      }
    } finally {
      clearTimeout(timeoutId)
    }
  }

  return {
    get: (endpoint, config) => request(endpoint, { ...config, method: 'GET' }),
    post: (endpoint, body, config) => request(endpoint, { ...config, method: 'POST', body }),
    put: (endpoint, body, config) => request(endpoint, { ...config, method: 'PUT', body }),
    del: (endpoint, config) => request(endpoint, { ...config, method: 'DELETE' }),
  }
}
