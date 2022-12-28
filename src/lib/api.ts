import { API_PATH, POSTS_PER_FETCH, QUERIES } from "$lib/config";
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
                post(idType: SLUG, id: "${slug}") {
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

export const getPostsByTag = async (tag: string, after = null) => {
    const data = await (await fetch(API_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query PostsByTag {
                posts(where: {tagSlugIn: "${tag}"}, first: ${POSTS_PER_FETCH}, after: ${`"${after}"`}) {
                    ${QUERIES.pageInfo}
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
                tag(id: "${tag}", idType: SLUG) {
                    name
                }
            }
            `,
        }),
    })).json();
    let pageInfo = data.data.posts.pageInfo;
    let tagName = data.data.tag.name;
    let posts = data.data.posts.edges.map((edge: any) => edge.node);
    return {
        posts,
        tag: tagName,
        tagSlug: tag,
        endCursor: pageInfo.endCursor,
        hasNextPage: pageInfo.hasNextPage
    }
}

export const getPostsByCategory = async (category: string, after = null) => {
    const data = await (await fetch(API_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query PostsByCategory {
                category(id: "${category}", idType: SLUG) {
                    name
                    posts(first: ${POSTS_PER_FETCH}, after: ${`"${after}"`}) {
                        ${QUERIES.pageInfo}
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
            }
            `,
        }),
    })).json();
    let pageInfo = data.data.category.posts.pageInfo;
    let categoryName = data.data.category.name;
    let posts = data.data.category.posts.edges.map((edge: any) => edge.node);
    return {
        posts,
        category: categoryName,
        tagSlug: category,
        endCursor: pageInfo.endCursor,
        hasNextPage: pageInfo.hasNextPage
    }
}

export const getPosts = async (after = null) => {
    const data = await (await fetch(API_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query AllPostsPaginated {
                posts(first: ${POSTS_PER_FETCH}, after: ${`"${after}"`}) {
                    ${QUERIES.pageInfo}
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

export const getTags = async (after = null) => {
    const data = await (await fetch(API_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query AllTagsPaginated {
                tags(first: ${POSTS_PER_FETCH}, after: ${`"${after}"`}) {
                    ${QUERIES.pageInfo}
                    edges {
                        cursor
                        node {
                            name
                            slug
                        }
                    }
                }
              }
            `,
        }),
    })).json();
    let pageInfo = data.data.tags.pageInfo;
    let tags = data.data.tags.edges.map((edge: any) => edge.node);
    return {
        tags,
        endCursor: pageInfo.endCursor,
        hasNextPage: pageInfo.hasNextPage
    }
}

export const getCategories = async () => {
    const data = await (await fetch(API_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query AllCategories {
                categories {
                    nodes {
                        name
                        slug
                        parent {
                            node {
                                slug
                            }
                        }
                    }
                  }
              }
            `,
        }),
    })).json();
    let categories: any[] = [];
    data.data.categories.nodes.forEach((category: any) => {
        if (!category.parent) {
            category.children = [];
            categories.push(category);
        }
    });
    data.data.categories.nodes.forEach((category: any) => {
        if (category.parent?.node.slug !== null) {
            categories.forEach((parentCategory: any) => {
                if (parentCategory.slug === category.parent?.node.slug) {
                    parentCategory.children.push(category);
                }
            });
        }
    });
    return { categories };
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

export const logout = () => {
    localStorage.removeItem('auth');
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
                }
              }
            `,
        }),
    })).json();
    loginResponse.errors?.forEach((error: any) => {
        toast.push(error.message);
    });
    if (loginResponse.data.login) {
        localStorage.setItem("auth", JSON.stringify({
            username,
            password,
            authToken: loginResponse.data.login.authToken,
            refreshToken: loginResponse.data.login.refreshToken
        }))
    }
}
