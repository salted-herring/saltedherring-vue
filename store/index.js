export const state = () => ({
  homePageData: null
})

export const getters = {
  getLatest(state) {
    let latest = state.homePageData.Latest

    if (latest) {
      let edges = latest.edges

      if (edges && edges.length > 0 && edges.length < 2) {
        let returnVal = []

        for (var i in edges) {
          returnVal.push(edges[i].node)
        }

        return returnVal
      }
    }

    return null
  }
}

export const mutations = {
  updateHomePageData(state, pageResult) {
    state.homePageData = pageResult
  }
}
