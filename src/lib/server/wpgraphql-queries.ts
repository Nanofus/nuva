import { serverConfig } from '$lib/server/config';

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
                slug
            }
        }
        coAuthors(first: 20) {
            nodes {
                displayName
                name
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
                slug
            }
        }
        coAuthors(first: 20) {
            nodes {
                displayName
                name
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
                    slug
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
        tags(first: ${serverConfig.maxPerFetch}) {
            nodes {
                name
                slug
                count
            }
        }
        commentCount
        content`
};
