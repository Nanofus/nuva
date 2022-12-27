import { API_PATH, POSTS_PER_FETCH } from "$lib/config";
import { toast } from '@zerodevx/svelte-toast'
import { browser } from '$app/environment'; 

export const getPostBySlug = async (slug: string) => {
    const authToken = browser ? getAuthInfo()?.authToken : null;
    return (await fetch(API_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken ? `Bearer ${authToken}` : "",
        },
        body: JSON.stringify({
            query: `
            query PostBySlug {
                postBy(slug: "${slug}") {
                    title
                    rawDate: date
                    author {
                      node {
                        firstName
                        description
                        avatar {
                          url
                        }
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
                    content
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
    let pageInfo = data.data.posts.pageInfo;
    let posts = data.data.posts.edges.map((edge: any) => edge.node);
    return {
        posts,
        endCursor: pageInfo.endCursor,
        hasNextPage: pageInfo.hasNextPage
    }
}

export const getAuthInfo = () => {
    if (localStorage !== undefined) {
        return localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth") as string) : null;
    }
    return null;
}

export const isLoggedIn = () => {
    return !!getAuthInfo();
}

export const login = async (username: string, password: string) => {
    const loginResponse = await (await fetch(API_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
            mutation LoginUser {
                login(
                  input: {
                    clientMutationId: "LoginUser"
                    username: "${username}"
                    password: "${password}"
                  }
                ) {
                  authToken
                  refreshToken
                  user {
                    id
                    name
                    email
                  }
                }
              }
            `,
        }),
    })).json();
    console.log(loginResponse);
    loginResponse.errors?.forEach((error: any) => {
        toast.push(error.message);
    });
    if (loginResponse.data.login) {
        localStorage.setItem("auth", JSON.stringify({
            username: loginResponse.data.login.user.name,
            authToken: loginResponse.data.login.authToken,
            refreshToken: loginResponse.data.login.refreshToken
        }))
    }
}