import getMainMenu from '~/apollo/queries/menu.js'

export default function({ store, route, redirect }) {
  // only execute if the menu is not present.
  if (store.state.menu.menuItems.length !== 0) {
    return
  }

  return store
    .$axios({
      url: '/graphql/',
      method: 'post',
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        query: getMainMenu
      }
    })
    .then(result => {
      let returnVal = result.data.data.readMenu

      if (returnVal.length >= 1) {
        store.commit('menu/updateMenuData', returnVal)
      }
    })
}
