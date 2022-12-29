import { API_PATH, LOCALSTORAGE_AUTH_KEY, POSTS_PER_FETCH, QUERIES } from '$lib/config';
import { toast } from '@zerodevx/svelte-toast';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
import { loginInfo } from '$lib/stores';
import { dataToPost, dataToPostMeta, dataToTags, dataToCategories } from '$lib/database.mappers';
import type {
	Post,
	PostMeta,
	TagListResponse,
	Tag,
	CategoryListResponse,
	AuthInfo,
	PostListBySearchResponse,
	PostListByTagResponse,
	PostListByCategoryResponse
} from '$lib/types';

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
	const authToken = browser ? getAuthInfo()?.authToken : null;
	const response = await (
		await fetch(API_PATH, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authToken ? `Bearer ${authToken}` : ''
			},
			body: JSON.stringify({
				query: `
            query PostBySlug {
                post(idType: SLUG, id: "${slug}") {
                    ${QUERIES.postContent}
                }
            }
            `
			})
		})
	).json();
	const post: Post | null = dataToPost(response.data.post);
	return post;
};

export const getPostListByTag = async (
	tag: string,
	after: string | null = null
): Promise<PostListByTagResponse> => {
	const response = await (
		await fetch(API_PATH, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `
            query PostsByTag {
                posts(where: {tagSlugIn: "${tag}"}, first: ${POSTS_PER_FETCH}, after: ${`"${after}"`}) {
                    ${QUERIES.pageInfo}
                    edges {
                        cursor
                        node {
                            ${QUERIES.postMeta}
                        }
                    }
                }
                tag(id: "${tag}", idType: SLUG) {
                    name
                }
            }
            `
			})
		})
	).json();
	if (!response.data.tag) throw error(404, 'Not found');
	let pageInfo = response.data.posts.pageInfo;
	let tagName = response.data.tag.name;
	let posts: PostMeta[] = response.data.posts.edges.map((edge: any) => dataToPostMeta(edge.node));
	return {
		posts,
		tag: tagName,
		tagSlug: tag,
		endCursor: pageInfo.endCursor,
		hasNextPage: pageInfo.hasNextPage
	};
};

export const getPostListByCategory = async (
	category: string,
	after: string | null = null
): Promise<PostListByCategoryResponse> => {
	const response = await (
		await fetch(API_PATH, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
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
                                ${QUERIES.postMeta}
                            }
                        }
                    }
                }
            }
            `
			})
		})
	).json();
	if (!response.data.category) throw error(404, 'Not found');
	let pageInfo = response.data.category.posts.pageInfo;
	let categoryName = response.data.category.name;
	let posts: PostMeta[] = response.data.category.posts.edges.map((edge: any) =>
		dataToPostMeta(edge.node)
	);
	return {
		posts,
		category: categoryName,
		categorySlug: category,
		endCursor: pageInfo.endCursor,
		hasNextPage: pageInfo.hasNextPage
	};
};

export const getPostList = async (
	after: string | null = null,
	searchTerm: string = ''
): Promise<PostListBySearchResponse> => {
	const response = await (
		await fetch(API_PATH, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `
            query AllPostsPaginated {
                posts(where: {search: "${decodeURI(
									searchTerm
								)}"}, first: ${POSTS_PER_FETCH}, after: "${after}") {
                    ${QUERIES.pageInfo}
                    edges {
                        cursor
                        node {
                            ${QUERIES.postMeta}
                        }
                    }
                }
              }
            `
			})
		})
	).json();
	let pageInfo = response.data.posts.pageInfo;
	let posts: PostMeta[] = response.data.posts.edges.map((edge: any) => dataToPostMeta(edge.node));
	return {
		posts,
		searchTerm,
		endCursor: pageInfo.endCursor,
		hasNextPage: pageInfo.hasNextPage
	};
};

export const getTagList = async (after: string | null = null): Promise<TagListResponse> => {
	const response = await (
		await fetch(API_PATH, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
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
            `
			})
		})
	).json();
	let pageInfo = response.data.tags.pageInfo;
	let tags: Tag[] = dataToTags(response.data.tags.edges.map((edge: any) => edge.node));
	return {
		tags,
		endCursor: pageInfo.endCursor,
		hasNextPage: pageInfo.hasNextPage
	};
};

export const getCategoryList = async (): Promise<CategoryListResponse> => {
	const response = await (
		await fetch(API_PATH, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `
            query AllCategories {
                categories {
                    nodes {
                        name
                        slug
						id
						parentId
                    }
                  }
              }
            `
			})
		})
	).json();
	const categories = dataToCategories(response.data.categories.nodes);
	return { categories };
};

export const getAuthInfo = (): AuthInfo | null => {
	if (localStorage !== undefined) {
		return localStorage.getItem(LOCALSTORAGE_AUTH_KEY)
			? JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH_KEY) as string)
			: null;
	}
	return null;
};

export const isLoggedIn = (): boolean => {
	return !!getAuthInfo();
};

export const logout = (): void => {
	loginInfo.set(null);
	localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
};

export const login = async (username: string, password: string): Promise<boolean> => {
	const loginResponse = await (
		await fetch(API_PATH, {
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
            `
			})
		})
	).json();
	loginResponse.errors?.forEach((error: any) => {
		toast.push(error.message);
	});
	if (loginResponse.data.login) {
		const loginData: AuthInfo = {
			username,
			authToken: loginResponse.data.login.authToken,
			refreshToken: loginResponse.data.login.refreshToken
		};
		localStorage.setItem('auth', JSON.stringify(loginData));
		loginInfo.set(loginData);
		toast.push('Sisäänkirjautuminen onnistui!');
		return true;
	}
	return false;
};
