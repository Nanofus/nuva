export const ISR_EXPIRATION = 60;
export const API_PATH = "https://klaanon.fi/wp/graphql";
export const BASE_PATH = "https://nuva.klaanon.fi";
export const MAX_PER_FETCH = 100;
export const LATEST_POSTS_PER_FETCH = 20;
export const LATEST_COMMENTS_PER_FETCH = 10;
export const LOCALSTORAGE_AUTH_KEY = "auth";
export const LOCALSTORAGE_SETTINGS_KEY = "settings";
export const GLOBAL_OBJECT_NAME = "globals" as keyof typeof window;
export const LOCALE = "fi-FI";
export const OG_LOCALE = "fi_FI";

export const SITE_NAME = "Klaanon Nuva";
export const SITE_NAME_DELIMITER = "—";
export const CATEGORIES_EXCLUDED_FROM_ALL_POSTS = ["meta", "muu-roska"];

export const BANNER_COUNT = 1;
export const DEFAULT_VOLUME = 50;
export const MUSIC_FADE_SPEED = 1;

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
  postComments: `
        comments(first: ${MAX_PER_FETCH}) {
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
