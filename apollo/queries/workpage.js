export default `query getWorkPage {
  readWorkPage {
    ID
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
    Introduction
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
    ShowAwards
    AwardsTitle
    AwardsBackgroundColour {
      Name
      Colour
    }
    Programmes {
     edges {
      node {
        ID
        Title
        Link {
          ID
          Title
          OpenInNewWindow
          LinkURL
        }
        Awards {
          edges {
            node {
              ID
              Title
              Image
              ImageWidth
              ImageHeight
              AwardDetails {
                edges {
                  node {
                    ID
                    Year
                    Details
                  }
                }
              }
            }
          }
        }
      }
    }
    }
    ShowClients
    ClientsTitle
    ClientsBackgroundColour {
      Name
      Colour
    }
    ClientLogos {
      edges {
        node {
          ID
          Title
          Thumbnail
          ThumbnailWidth
          ThumbnailHeight
        }
      }
    }
    Projects {
      edges {
        node {
          ID
          Sort
          URLSegment
          MenuTitle
          Link
          HeroVideo {
            id
            filename
            size
            url
            width
            height
          }
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
