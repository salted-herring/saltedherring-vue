export default `query getProjectPreviews {
  readProject {
    ID
    MenuTitle
    Link
    Sort
    PreviewVideo {
      id
      url
    }
    PreviewImage {
      URL
      FitFullScreen
      FitFullScreenWidth
      FitFullScreenHeight
    }
  }
}`
