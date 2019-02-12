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
    Introduction
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
              Imagex2
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
          URL
          Thumbnail
        }
      }
    }
    Projects {
      edges {
        node {
          ID
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
              }
            }
          }
        }
      }
    }
  }
}`
