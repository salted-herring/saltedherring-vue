export const state = () => ({
  pages: {}
})

export const getters = {
  getMeta(state, slug) {
    return state.pages[slug] || null
  }
}

export const mutations = {
  addPageData(state, pagemeta) {
    state.pages[pagemeta.slug] = pagemeta.data
  }
}
