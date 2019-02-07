export const state = () => ({
  footerList: []
})

export const mutations = {
  updateFooterData(state, items) {
    state.footerList = items
  }
}
