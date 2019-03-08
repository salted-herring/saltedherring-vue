export const state = () => ({
  menuItems: [],
  color: 'black',
  currentColor: 'black',
  hoveredMenuTitle: '',
  menuHidden: false,
  menuScrolledIntoView: false,
  menuClicked: false,
  menuVisible: false,
  menuHamburgerVisible: false
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
  },
  getMenuColour(state) {
    return state.color
  },
  getMenuCurrentColour(state) {
    return state.currentColor
  }
}

export const mutations = {
  updateMenuData(state, menuItems) {
    state.menuItems = menuItems
  },
  setHamburger(state, hamburgerVisible) {
    state.hamburgerVisible = hamburgerVisible
  },
  setMenu(state, menuVisible) {
    state.menuVisible = menuVisible
  },
  setMenuHidden(state, hide) {
    state.menuHidden = hide
  },
  setMenuColour(state, colour) {
    state.color = colour
  },
  setMenuCurrentColour(state, colour) {
    state.currentColor = colour
  },
  setHoveredText(state, title) {
    state.hoveredMenuTitle = title
  },
  setMenuClicked(state, status) {
    state.menuClicked = status
  },
  setmenuScrolledIntoView(state, status) {
    state.menuScrolledIntoView = status
  }
}
