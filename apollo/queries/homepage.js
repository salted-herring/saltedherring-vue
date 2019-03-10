export default `query getHomePage {
    readHomePage {
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
      }
      Title
      TitleColour {
        Name
        Colour
      }
      Link
      Content
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
      LatestSectionTitle
      Latest {
        edges {
            node {
                ID
                Title
                SummaryText
                Image
                ImageWidth
                ImageHeight
                Imagex2
                Imagex2Width
                Imagex2Height
                Link {
                  ID
                  Title
                  OpenInNewWindow
                  LinkURL
                }
            }
        }
      }
    }
}`
