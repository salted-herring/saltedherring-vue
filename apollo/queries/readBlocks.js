export default `query readBlocks($urlSegment: String) {
  readContentBlocks(ProjectSlug: $urlSegment) {
    edges {
      node {
        ... on TextBlock {
          __typename
          ID
          Title
          SortOrder
          Content
          ShowQuote
          Quote
          Source
        }
        ... on ImageBlock {
          __typename
          ID
          Title
          SortOrder
          Images {
            edges {
              node {
                ID
                Title
                FitFullScreen
              }
            }
          }
        }
        ... on VideoBlock {
          __typename
          ID
          Title
          SortOrder
          VideoSource
          VideoLink
          OptionalPreview
          VideoFile {
            id
            filename
            size
            url
            width
            height
          }
        }
      }
    }
  }
}`
