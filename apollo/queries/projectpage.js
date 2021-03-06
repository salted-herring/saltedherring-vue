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
    Sort
    OGType
    OGTitle
    OGDescription
    OGImage {
      ID
      Title
      URL
      Cropped
      Width
      Height
    }
    OGImageLarge {
      ID
      Title
      URL
      Cropped
      Width
      Height
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
    HeroMenuColour
    HeroImages {
      edges {
        node {
          ID
          Title
          URL
          FitFullScreen
          FitFullScreenWidth
          FitFullScreenHeight
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
    PreviewImage {
      URL
    }
    PreviewVideo {
      url
    }
    RelatedProjectsTitle
    RelatedProjects {
      edges {
        node {
          ID
          Link
          MenuTitle
          URLSegment
          HeroImages {
            edges {
              node {
                ID
                Title
                URL
                FitFullScreen
                FitFullScreenWidth
                FitFullScreenHeight
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
      }
    }
  }
}`
