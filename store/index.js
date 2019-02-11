export const state = () => ({
  homePageData: null,
  workPageData: null,
  projects: null,
  awards: null,
  clients: null
})

export const getters = {
  getLatest(state) {
    if (state.homePageData === null) {
      return null
    }

    let latest = state.homePageData.Latest

    if (latest) {
      let edges = latest.edges

      if (edges && edges.length > 0 && edges.length <= 2) {
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
  },
  updateWorkPageData(state, pageResult) {
    state.workPageData = pageResult

    let projects = pageResult.Projects.edges

    for (let i in projects) {
      let node = projects[i].node

      if (state.projects === null) {
        state.projects = {}
      }

      // Check if ID already in store
      if (!(node.ID in state.projects)) {
        state.projects[node.ID] = node
      }
    }

    /// Process programmes data.
    let programmes = {
      show: pageResult.ShowAwards,
      title: pageResult.AwardsTitle,
      backgroundColour: pageResult.AwardsBackgroundColour.Colour,
      awards: []
    }

    for (let i in pageResult.Programmes.edges) {
      let programme = pageResult.Programmes.edges[i]
      let record = {
        id: programme.node.ID,
        title: programme.node.Title,
        awards: []
      }

      if (programme.node.Link !== null) {
        record.link = programme.node.Link
      }

      let awards = programme.node.Awards

      for (let j in awards.edges) {
        let award = awards.edges[j].node

        let awardRecord = {
          id: award.ID,
          image: award.Image,
          imagex2: award.Imagex2,
          title: award.Title,
          details: []
        }

        let details = award.AwardDetails

        for (let k in details.edges) {
          let detail = details.edges[k].node
          awardRecord.details.push(detail)
        }

        record.awards.push(awardRecord)
      }

      programmes.awards.push(record)
    }

    // don't update after initial load.
    if (state.awards === null) {
      state.awards = {}
      state.awards = programmes
    }

    // Process Clients data
    let clients = {
      show: pageResult.ShowClients,
      title: pageResult.ClientsTitle,
      backgroundColour: pageResult.ClientsBackgroundColour.Colour,
      clients: []
    }

    for (let i in pageResult.ClientLogos.edges) {
      let node = pageResult.ClientLogos.edges[i].node

      clients.clients.push({
        id: node.ID,
        title: node.Title,
        url: node.Thumbnail
      })
    }

    if (state.clients === null) {
      state.clients = {}
      state.clients = clients
    }
  }
}
