export default {
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
