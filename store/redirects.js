export const state = () => ({
  urls: []
})

export const mutations = {
  updateURLs(state, results) {
    for (let i in results) {
      let res = results[i].FromBase
      results[i].FromBase = res.replace(/\/?$/, '/')
    }

    state.urls = results
  }
}
