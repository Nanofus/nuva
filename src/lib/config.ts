export const ISR_EXPIRATION = 60;
export const API_PATH = "https://klaanon.fi/wp/graphql";
export const POSTS_PER_FETCH = 100;
export const LOCALSTORAGE_AUTH_KEY = "auth";
export const LOCALE = "fi-FI";

export const SITE_NAME = "Klaanon Nuva";
export const SITE_NAME_DELIMITER = "—";

export const BANNER_COUNT = 7;

export const FONT_PATH = "https://meri.klaanon.fi/fonts";

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
            authorgroup {
                name
            }
            featuredimage
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
        additionalFields {
            authorgroup {
                name
            }
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
        tags(first: ${POSTS_PER_FETCH}) {
            nodes {
                name
                slug
            }
        }
        commentCount
        content`,
  postComments: `
        comments {
            nodes {
                date
                author {
                    node {
                        name
                    }
                }
                content
                databaseId
                parentDatabaseId
            }
        }`
};
