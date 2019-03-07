export const state = () => ({
  loading: false
})

export const mutations = {
  updateLoading(state, loading) {
    state.loading = loading
  }
}
