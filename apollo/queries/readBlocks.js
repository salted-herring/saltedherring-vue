export default `query readBlocks($urlSegment: String) {
  readContentBlocks(ProjectSlug: $urlSegment) {
    edges {
      node {
        ... on TextBlock {
          __typename
          ID
          Alignment
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
          Padding
          Images {
            edges {
              node {
                ID
                Title
                FitFullScreen
                FitFullScreenWidth
                FitFullScreenHeight
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
          OptionalPreview {
            ID
            FitFullScreen
            FitFullScreenWidth
            FitFullScreenHeight
          }
          VideoFile {
            id
            filename
            size
            url
            width
            height
            type
          }
        }
      }
    }
  }
}`
