export const state = () => ({
  homePageData: null,
  workPageData: null,
  projects: null,
  currentProject: null,
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

      if (edges && edges.length > 0) {
        let returnVal = []

        for (var i in edges) {
          returnVal.push(edges[i].node)
        }

        return returnVal
      }
    }

    return null
  },
  getCurrentProject(state) {
    if (state.currentProject === null) {
      return null
    }

    if (state.currentProject in state.projects) {
      return state.projects[state.currentProject]
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
      let heroImages = []
      let edges = node.HeroImages.edges

      for (let j in edges) {
        let edge = edges[j]

        heroImages.push(edge.node)
      }

      node.HeroImages = heroImages

      if (state.projects === null) {
        state.projects = {}
      }

      // Check if ID already in store
      if (!(node.URLSegment in state.projects)) {
        state.projects[node.URLSegment] = node
      }
    }

    // Add sorted projects Array
    state.projects.sorted = []
    let sortable = []

    for (let key in state.projects) {
      if (key !== 'sorted') {
        sortable.push(state.projects[key])
      }
    }

    sortable.sort(function(a, b) {
      return a.Sort - b.Sort
    })

    state.projects.sorted = sortable

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
        let details = award.AwardDetails

        award.details = []

        for (let k in details.edges) {
          let detail = details.edges[k].node
          award.details.push(detail)
        }

        record.awards.push(award)
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
      clients.clients.push(node)
    }

    if (state.clients === null) {
      state.clients = {}
      state.clients = clients
    }
  },
  updateProject(state, project) {
    if (project.ID) {
      if (state.projects === null) {
        state.projects = {}
      }

      let heroImages = []
      let edges = project.HeroImages.edges

      for (let i in edges) {
        let edge = edges[i]

        heroImages.push(edge.node)
      }

      project.HeroImages = heroImages

      let relatedProjects = {}
      edges = project.RelatedProjects.edges

      for (let y in edges) {
        let edge = edges[y]
        relatedProjects[edge.node.URLSegment] = edge.node
      }

      project.RelatedProjects = relatedProjects

      // Add sorted projects Array
      project.RelatedProjects.sorted = []
      let sortable = []

      for (let key in project.RelatedProjects) {
        if (key !== 'sorted') {
          sortable.push(project.RelatedProjects[key])
        }
      }

      sortable.sort(function(a, b) {
        return a.Sort - b.Sort
      })

      project.RelatedProjects.sorted = sortable

      state.projects[project.URLSegment] = project
      state.currentProject = project.URLSegment

      // Add sorted projects Array
      state.projects.sorted = []
      sortable = []

      for (let key in state.projects) {
        if (key !== 'sorted') {
          sortable.push(state.projects[key])
        }
      }

      sortable.sort(function(a, b) {
        return a.Sort - b.Sort
      })

      state.projects.sorted = sortable
    }
  },
  updateProjectBlocks(state, updateOptions) {
    let project = state.projects[updateOptions.projectId]
    let blocks = []

    /// Add in the blocks.
    for (let i in updateOptions.blocks) {
      let block = updateOptions.blocks[i].node

      if (block.__typename === 'ImageBlock') {
        let newImages = []
        let images = block.Images.edges

        for (let i in images) {
          newImages.push(images[i].node)
        }
        block.Images = newImages
      }

      blocks.push(block)
    }

    project.ContentBlocks = blocks

    state.projects[updateOptions.projectId] = project
  },
  updateCurrentProject(state, urlSegment) {
    state.currentProject = urlSegment
  }
}
