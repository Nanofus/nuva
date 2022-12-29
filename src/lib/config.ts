export const API_PATH = 'https://klaanon.fi/wp/graphql';
export const POSTS_PER_FETCH = 100;
export const LOCALSTORAGE_AUTH_KEY = 'auth';

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
        additionalFields {
            authorgroup
            featuredimage
        }
        commentCount`,
	postContent: `
        title
        slug
        rawDate: date
        author {
            node {
                name
            }
        }
        additionalFields {
            authorgroup
            featuredimage
            initialletter
            scripts
            styles
            theme
        }
        categories {
            nodes {
                slug
                name
            }
        }
        tags {
            nodes {
                name
                slug
            }
        }
        commentCount
        comments {
            nodes {
                date
                author {
                    node {
                        name
                    }
                }
                content
                id
                parentId
            }
        }
        content`
};
