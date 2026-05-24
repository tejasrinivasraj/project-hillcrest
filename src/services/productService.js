import { mockFetch } from './mockData'

export async function getProducts() {
  return mockFetch('products')
}

export async function getTeam() {
  return mockFetch('team')
}
