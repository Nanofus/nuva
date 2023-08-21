import { globalConfig } from "$lib/util/config";

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
            custombanner
            featuredimage
            description
            mobilefriendly
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
            custombanner
            featuredimage
            description
            initialletter
            artists {
                name
            }
            bannervisible
            fullwidth
            mobilefriendly
            scripts
            scriptfiles
            styles
            music
            resetmusicbuttons
        }
        categories {
            nodes {
                slug
                name
            }
        }
        tags(first: ${globalConfig.maxPerFetch}) {
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
        parentDatabaseId`,
};
