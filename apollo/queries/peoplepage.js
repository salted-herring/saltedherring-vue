export default `query {
  readPeoplePage {
    URLSegment
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
    TitleColour {
      Colour
    }
    Content
    HeroTitle
    HeroMenuColour
    HeroImages {
      edges {
        node {
          Title
          Thumbnail
          ThumbnailWidth
          ThumbnailHeight
          FitFullScreen
          FitFullScreenWidth
          FitFullScreenHeight
        }
      }
    }
    HeroVideo {
      id
    }
    BackgroundColour {
      Colour
    }
    ShowPartners
    PartnersTitle
    People {
      edges {
        node {
          Sort
          URLSegment
          Link
          MenuTitle
        }
      }
    }
    Partners {
      edges {
        node {
          SortOrder
          Title
          SummaryText
          Image
          ImageWidth
          ImageHeight
          Imagex2
          Imagex2Width
          Imagex2Height
          Link {
            Title
            OpenInNewWindow
            LinkURL
          }
        }
      }
    }
  }
}`
