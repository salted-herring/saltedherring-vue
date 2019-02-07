import getMainMenu from '~/apollo/queries/menu.js'

export default function({ store, route, redirect }) {
  return store
    .$axios({
      url: '/graphql/',
      method: 'post',
      data: {
        query: getMainMenu
      }
    })
    .then(result => {
      let returnVal = result.data.data.readMenu

      if (returnVal.length === 1) {
        store.commit('menu/updateMenuData', returnVal)
      }
    })
}
