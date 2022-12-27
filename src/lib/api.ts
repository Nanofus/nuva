import { API_PATH, POSTS_PER_FETCH } from "$lib/config";

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

export const getPosts = async (after = null) => {
    let params: any = {
        first: POSTS_PER_FETCH,
        after: `"${after}"`
    }
    const data = await (await fetch(API_PATH, {
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
    console.log(data);
    let pageInfo = data.data.posts.pageInfo;
    let posts = data.data.posts.edges.map((edge: any) => edge.node);
    return {
        posts, 
        endCursor: pageInfo.endCursor,
        hasNextPage: pageInfo.hasNextPage
    }
}