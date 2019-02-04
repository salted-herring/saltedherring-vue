export const state = () => ({
  pageData: null
})

export const mutations = {
  updatePageData(state, pageResult) {
    state.pageData = pageResult
  }
}
