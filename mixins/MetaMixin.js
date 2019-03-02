export default {
  setupMeta(store, key, data) {
    let metaData = {
      slug: key,
      data: {}
    }

    metaData.data.title = data.MetaTitle || data.Title || ''
    metaData.data.description = data.MetaDescription || ''
    metaData.data.keywords = data.MetaKeywords || ''
    metaData.data.robots = data.MetaRobots || ''

    metaData.data.ogTitle = data.OGTitle || metaData.data.title
    metaData.data.ogDescription =
      data.OGDescription || metaData.data.description || ''
    metaData.data.ogType = data.OGType || ''
    metaData.data.ogImage = data.OGImage.Cropped || ''

    store.commit('meta/addPageData', metaData)
  },
  computed: {
    metaData() {
      return {
        title: '',
        description: '',
        keywords: '',
        robots: '',
        ogTitle: '',
        ogDescription: '',
        ogType: '',
        ogImage: ''
      }
    }
  },
  head() {
    return {
      title: this.metaData.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaData.description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.metaData.keywords
        },
        {
          hid: 'ogtitle',
          property: 'og:title',
          content: this.metaData.ogTitle
        },
        {
          hid: 'ogdescription',
          property: 'og:description',
          content: this.metaData.ogDescription
        },
        {
          hid: 'ogimage',
          property: 'og:image',
          content: this.metaData.ogImage
        },
        {
          hid: 'ogtype',
          property: 'og:type',
          content: this.metaData.ogType
        }
      ]
    }
  }
}
