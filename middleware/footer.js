import getFooter from '~/apollo/queries/footer.js'

export default function({ store, route, redirect }) {
  return store
    .$axios({
      url: '/graphql/',
      method: 'post',
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
