export default `query getMainMenu {
  readMenu {
    ID
    Title
    MenuTitle
    Link
    TitleColour {
      Name
      Colour
    }
    BackgroundColour {
      Name
      Colour
    }
    Children {
      edges {
        node {
          ID
          Link
          Title
          TitleColour {
            Name
            Colour
          }
          BackgroundColour {
            Name
            Colour
          }
        }
      }
    }
  }
}`
