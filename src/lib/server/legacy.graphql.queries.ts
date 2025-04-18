import { getConfig } from '$lib/util/config';

export const QUERIES = {
  pageInfo: `
        pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
        }`,
  postMeta: `
        title
        slug
        rawDate: date
        author {
            node {
                name
            }
        }
        coAuthors(first: 20) {
            nodes {
                displayName
            }
        }
        additionalFields {
            customBanner
            featuredImage
            description
            mobileFriendly
        }
        categories {
            nodes {
                slug
                name
            }
        }
        commentCount`,
  postContent: `
        title
        slug
        rawDate: date
        databaseId
        author {
            node {
                name
            }
        }
        coAuthors(first: 20) {
            nodes {
                displayName
            }
        }
        previous {
            slug
            title
        }
        next {
            slug
            title
        }
        additionalFields {
            customBanner
            featuredImage
            description
            initialLetter
            artists {
                nodes {
                    name
                }
            }
            bannerVisible
            fullWidth
            mobileFriendly
            scripts
            scriptFiles
            styles
            music
            resetMusicButtons
        }
        categories {
            nodes {
                slug
                name
            }
        }
        tags(first: ${getConfig().maxPerFetch}) {
            nodes {
                name
                slug
                count
            }
        }
        commentCount
        content`,
  postComment: `
        date
        author {
            node {
                name
            }
        }
        content
        databaseId
        parentDatabaseId`
};
