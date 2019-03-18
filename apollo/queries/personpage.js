export default `query readPerson($urlSegment: String) {
  readPerson(URLSegment: $urlSegment) {
    URLSegment
    Link
    Content
    MetaTitle
    MenuTitle
    Title
    MetaDescription
    MetaKeywords
    ExtraMeta
    MetaRobots
    ConanicalURL
    OGType
    OGTitle
    OGDescription
    HeroTitle
    HeroMenuColour
    BackgroundColour {
      Colour
    }
    TitleColour {
      Colour
    }
    HeroImages {
      edges {
        node {
          Title
          URL
          FitFullScreen
          FitFullScreenWidth
          FitFullScreenHeight
        }
      }
    }
    Introduction
  }
}`
