import { API_PATH } from "$lib/config";

export const getPostBySlug = async (slug: string) => {
    return (await fetch(API_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query PostBySlug {
                postBy(slug: "${slug}") {
                    content
                    additionalFields {
                        authorgroup
                        featuredimage
                        initialletter
                        scripts
                        styles
                        theme
                    }
                }
            }
            `,
        }),
    })).json();
}

export const getAllPosts = async () => {
    // This needs to be iterative
    // since GraphQL only returns a limited number of items at once
    const itemsPerIteration = 100;
    let result: any[] = [];
    let params: any = {
        first: itemsPerIteration,
        after: null
    }
    while (true) {
        let data = await getAllPostsPaginated(params);
        let pageInfo = data.data.posts.pageInfo;
        let posts = data.data.posts.edges.map((edge: any) => edge.node);
        params = {
            first: itemsPerIteration,
            after: `"${pageInfo.endCursor}"`
        }
        result = [...result, ...posts];
        if (!pageInfo.hasNextPage) break;
    }
    return result;
}

const getAllPostsPaginated = async (params: any) => {
    return (await fetch(API_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query AllPostsPaginated {
                posts(first: ${params.first}, after: ${params.after}) {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                        startCursor
                        endCursor
                    }
                    edges {
                        cursor
                        node {
                            additionalFields {
                            authorgroup
                            }
                            slug
                            title
                        }
                    }
                }
              }
            `,
        }),
    })).json();
}