const indexName = `klaanon`
const pageQuery = `posts: allWpPost {
    nodes {
      objectID:id
      categories {
        nodes {
          name
          slug
          wpChildren {
            nodes {
              name
              slug
            }
          }
        }
      }
      title
      excerpt
      slug
      date
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }`

const queries = [
    {
        query: pageQuery,
        transformer: ({ data }) => data.posts.nodes,
        indexName,
        settings: { attributesToSnippet: [`excerpt:20`] },
    },
]
module.exports = queries
