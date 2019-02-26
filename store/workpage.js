export const state = () => ({
  hoveredItem: null
})

export const mutations = {
  updateHoveredItem(state, item) {
    state.hoveredItem = item
  },
  resetHoveredItem(state) {
    state.hoveredItem = null
  }
}
