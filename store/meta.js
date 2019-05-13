export const state = () => ({
  pages: {}
})

export const getters = {
  getMeta(state, slug) {
    return state.pages[slug] || null
  }
}

export const mutations = {
  setupMeta(state, pagemeta) {
    let metaData = {
      slug: pagemeta.slug,
      data: {},
      url: ''
    }

    metaData.data.title = pagemeta.data.MetaTitle || pagemeta.data.Title || ''
    metaData.data.description = pagemeta.data.MetaDescription || ''
    metaData.data.keywords = pagemeta.data.MetaKeywords || ''
    metaData.data.robots = pagemeta.data.MetaRobots || ''

    metaData.data.ogURL = pagemeta.url
    metaData.data.ogTitle = pagemeta.data.OGTitle || pagemeta.data.title
    metaData.data.ogDescription =
      pagemeta.data.OGDescription || pagemeta.data.description || ''
    metaData.data.ogType = pagemeta.data.OGType || ''
    metaData.data.ogImage =
      typeof pagemeta.data.OGImage !== 'undefined'
        ? process.env.baseUrl + pagemeta.data.OGImage.Cropped
        : ''

    state.pages[pagemeta.slug] = metaData.data
  }
}
