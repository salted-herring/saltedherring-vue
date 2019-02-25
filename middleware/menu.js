import getMainMenu from '~/apollo/queries/menu.js'

export default function({ store, route, redirect }) {
  // console.log('menu', process.env.GRAPHQL_ENDPOINT)
  return store
    .$axios({
      // baseURL: process.env.GRAPHQL_ENDPOINT,
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
