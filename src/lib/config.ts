export const API_PATH = 'https://klaanon.fi/wp/graphql';
export const POSTS_PER_FETCH = 100;

export const QUERIES = {
    pageInfo: `
        pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
        }`,
}