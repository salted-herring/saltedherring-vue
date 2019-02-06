export const state = () => ({
  menuItems: []
})

export const mutations = {
  updateMenuData(state, menuItems) {
    state.menuItems = menuItems
  }
}
