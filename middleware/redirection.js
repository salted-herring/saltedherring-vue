import getRedirections from '~/apollo/queries/redirections.js'

const redirectURL = function(store, req, res) {
  let redirects = store.state.redirects.urls
  let redirect = redirects.find(r => r.FromBase === req.url)

  if (redirect) {
    res.writeHead(301, { Location: redirect.To })
    res.end()
  }
}

export default function({ store, req, res, next, route, redirect }) {
  if (typeof req === 'undefined') {
    return false
  }

  // only execute if the redirection is not present.
  if (store.state.redirects.urls.length !== 0) {
    redirectURL(store, req, res)
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
        query: getRedirections
      }
    })
    .then(result => {
      let returnVal = result.data.data.readRedirector

      if (returnVal.length >= 1) {
        store.commit('redirects/updateURLs', returnVal)
        redirectURL(store, req, res)
      }
    })
}
