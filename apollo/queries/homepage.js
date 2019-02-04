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
                Title
            }
        }
      }
    }
}`
