import { MAX_PER_FETCH } from "$lib/config";

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
        coAuthors {
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
        coAuthors {
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
        }
        categories {
            nodes {
                slug
                name
            }
        }
        tags(first: ${MAX_PER_FETCH}) {
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
