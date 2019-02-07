export const state = () => ({
  menuItems: []
})

export const getters = {
  getChildren(state, parentId) {
    let children = []

    for (let link in state.menuItems) {
      if (link.ID === parentId) {
        let localChildren = link.Children.edges

        for (let localLink in localChildren) {
          children.push(localLink.node)
        }
        break
      }
    }

    return children
  }
}

export const mutations = {
  updateMenuData(state, menuItems) {
    state.menuItems = menuItems
  }
}
