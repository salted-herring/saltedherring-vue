export default `query getMeta($urlSegment: String) {
  readPage(Slug: $urlSegment) {
    MetaTitle
    MetaRobots
    MetaKeywords
    MetaDescription
    ExtraMeta
    OGType
    OGTitle
    OGDescription
    OGImage {
      ID
      Title
      URL
      Cropped
    }
    OGImageLarge {
      ID
      Title
      URL
      Cropped
    }
    Title
  }
}`
