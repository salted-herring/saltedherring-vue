import getFooter from '~/apollo/queries/footer.js'

export default function({ store, route, redirect }) {
  console.log('footer', process.env.GRAPHQL_ENDPOINT)
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
        query: getFooter
      }
    })
    .then(result => {
      let returnVal = result.data.data.readFooter
      if (returnVal.length !== 0) {
        store.commit('footer/updateFooterData', returnVal)
      }
    })
}
