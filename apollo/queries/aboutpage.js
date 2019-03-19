export default `query {
  readAboutPage {
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
    BackgroundColour {
      Colour
    }
    AboutSections {
      edges {
        node {
          SortOrder
          Slug
          HeroTitle
          HeroIntroduction
          Introduction {
            ID
            Alignment
            Content
            ShowQuote
            Quote
            Source
            SourceLink {
              Title
              OpenInNewWindow
              LinkURL
            }
          }
          Blocks {
            edges {
              node {
                SortOrder
                Title
                Introduction
                Details
                ShowQuote
                Quote
                Source
                SourceLink {
                  Title
                  OpenInNewWindow
                  LinkURL
                }
              }
            }
          }
        }
      }
    }
  }
}`
