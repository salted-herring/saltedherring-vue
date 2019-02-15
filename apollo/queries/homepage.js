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
                Imagex2
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
