export default `query getProjectPreviews {
  readProject {
    ID
    MenuTitle
    Link
    PreviewVideo {
      id
      url
    }
    PreviewImage {
      URL
    }
  }
}`
