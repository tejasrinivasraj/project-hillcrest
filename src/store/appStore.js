import { create } from 'zustand'

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  features: {},
}

export const useAppStore = create((set, get) => ({
  ...initialState,

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setUser: (user) => set({ user }),
  setFeatureState: (featureKey, state) =>
    set({ features: { ...get().features, [featureKey]: state } }),
  reset: () => set({ ...initialState }),
}))
