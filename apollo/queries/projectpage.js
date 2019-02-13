export default `query getProject($urlSegment: String) {
  readProject(URLSegment: $urlSegment) {
    ID
    URLSegment
    MetaTitle
    MetaRobots
    MetaKeywords
    MetaDescription
    ExtraMeta
    MenuTitle
    Link
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
    TitleColour {
      Name
      Colour
    }
    BackgroundColour {
      Name
      Colour
    }
    HeroTitle
    HeroImages {
      edges {
        node {
          ID
          Title
          URL
          FitFullScreen
        }
      }
    }
    HeroVideo {
      id
      filename
      size
      url
      width
      height
    }
    Introduction
    Services
    Recognition
    Summary
    RelatedProjectsTitle
    RelatedProjects {
      edges {
        node {
          ID
          Link
          MenuTitle
        }
      }
    }
  }
}`
