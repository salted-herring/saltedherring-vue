export default `query getMainMenu {
  readMenu {
    ID
    Title
    MenuTitle
    Link
    Children {
      edges {
        node {
          ID
          Link
          Title
        }
      }
    }
  }
}`
