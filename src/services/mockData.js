const MOCK_DELAY = 300

export async function mockFetch(dataPath) {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY))

  try {
    const module = await import(`../data/${dataPath}.json`)
    return { data: module.default, ok: true, status: 200, error: null }
  } catch (err) {
    return { data: null, ok: false, status: 404, error: `Mock data not found: ${dataPath}` }
  }
}
