import getMainMenu from '~/apollo/queries/menu'

export default function({ store, route, redirect }) {
  // menu is alwasy closed when route is loaded.
  store.commit('menu/setMenu', false)
  store.commit('menu/setMenuClicked', false)
  store.commit('menu/setMenuColour', 'black')
  store.commit('menu/setMenuCurrentColour', 'black')

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
