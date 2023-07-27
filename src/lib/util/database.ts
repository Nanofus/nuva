import {
	API_PATH,
	LATEST_COMMENTS_PER_FETCH,
	LOCALSTORAGE_AUTH_KEY,
	MAX_PER_FETCH,
	QUERIES,
} from "$lib/config";
import { toast } from "@zerodevx/svelte-toast";
import { browser } from "$app/environment";
import { error } from "@sveltejs/kit";
import { loginInfo } from "$lib/util/stores";
import {
	dataToCategories,
	dataToCommentMetas,
	dataToComments,
	dataToPost,
	dataToPostMeta,
	dataToTags,
} from "$lib/util/database.mappers";
import type {
	AuthInfo,
	CategoryListResponse,
	Comment,
	CommentMeta,
	Post,
	PostListByAuthorResponse,
	PostListByCategoryResponse,
	PostListBySearchResponse,
	PostListByTagResponse,
	PostMeta,
	Tag,
	TagListResponse,
} from "$lib/util/types";
import { toastSettings } from "$lib/util/util";

// New Postgres queries

// const db = createKysely<Database>();

// Legacy WPGraphQL queries

export const getLatestComments = async (fetch: Function): Promise<CommentMeta[]> => {
	const authToken = browser ? getAuthInfo()?.authToken : null;
	const response = await (
		await fetch(API_PATH, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: authToken ? `Bearer ${authToken}` : "",
			},
			body: JSON.stringify({
				query: `
            query LatestComments {
                comments(first: ${LATEST_COMMENTS_PER_FETCH}) {
                    nodes {
                        databaseId
                        author {
                          node {
                            name
                          }
                        }
                        date
                        commentedOn {
                            node {
                                slug
                                ... on Post {
                                    title
                                }
                            }
                        }
                    }
                }
            }
            `,
			}),
		})
	).json();
	return dataToCommentMetas(response.data.comments.nodes);
};

export const getPostBySlug = async (fetch: Function, slug: string): Promise<Post | undefined> => {
	const authToken = browser ? getAuthInfo()?.authToken : null;
	const response = await (
		await fetch(API_PATH, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: authToken ? `Bearer ${authToken}` : "",
			},
			body: JSON.stringify({
				query: `
            query PostBySlug {
                post(idType: SLUG, id: "${slug}") {
                    ${QUERIES.postContent}
					${QUERIES.postComments}
                }
            }
            `,
			}),
		})
	).json();
	return dataToPost(response.data.post);
};

export const getCommentsForPostBySlug = async (
	fetch: Function,
	slug: string
): Promise<Comment[]> => {
	const authToken = browser ? getAuthInfo()?.authToken : null;
	const response = await (
		await fetch(API_PATH, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: authToken ? `Bearer ${authToken}` : "",
			},
			body: JSON.stringify({
				query: `
            query CommentsForPostBySlug {
                post(idType: SLUG, id: "${slug}") {
					${QUERIES.postComments}
                }
            }
            `,
			}),
		})
	).json();
	return dataToComments(response.data.post.comments.nodes);
};

export const getPostListByAuthor = async (
	fetch: Function,
	author: string,
	after: string | undefined = null
): Promise<PostListByAuthorResponse> => {
	const response = await (
		await fetch(API_PATH, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
            query PostsByAuthor {
                posts(where: {authorName: "${decodeURI(
									author
								)}"}, first: ${MAX_PER_FETCH}, after: "${after}") {
                    ${QUERIES.pageInfo}
                    edges {
                        cursor
                        node {
                            ${QUERIES.postMeta}
                        }
                    }
                }
            }
            `,
			}),
		})
	).json();
	if (response.data.posts.edges.length === 0) {
		throw error(404, "Not found");
	}

	const { pageInfo } = response.data.posts;
	const posts: PostMeta[] = response.data.posts.edges.map((edge: any) => dataToPostMeta(edge.node));
	return {
		posts,
		author,
		endCursor: pageInfo.endCursor,
		hasNextPage: pageInfo.hasNextPage,
	};
};

export const getPostListByTag = async (
	fetch: Function,
	tag: string,
	after: string | undefined = null
): Promise<PostListByTagResponse> => {
	const response = await (
		await fetch(API_PATH, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
            query PostsByTag {
                posts(where: {tagSlugIn: "${tag}"}, first: ${MAX_PER_FETCH}, after: "${after}") {
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
            `,
			}),
		})
	).json();
	if (!response.data.tag) {
		throw error(404, "Not found");
	}

	const { pageInfo } = response.data.posts;
	const tagName = response.data.tag.name;
	const posts: PostMeta[] = response.data.posts.edges.map((edge: any) => dataToPostMeta(edge.node));
	return {
		posts,
		tag: tagName,
		tagSlug: tag,
		endCursor: pageInfo.endCursor,
		hasNextPage: pageInfo.hasNextPage,
	};
};

export const getPostListByCategory = async (
	fetch: Function,
	category: string,
	after: string | undefined = null
): Promise<PostListByCategoryResponse> => {
	const response = await (
		await fetch(API_PATH, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
            query PostsByCategory {
                category(id: "${category}", idType: SLUG) {
                    name
                    posts(first: ${MAX_PER_FETCH}, after: "${after}") {
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
            `,
			}),
		})
	).json();
	if (!response.data.category) {
		throw error(404, "Not found");
	}

	const { pageInfo } = response.data.category.posts;
	const categoryName = response.data.category.name;
	const posts: PostMeta[] = response.data.category.posts.edges.map((edge: any) =>
		dataToPostMeta(edge.node)
	);
	return {
		posts,
		category: categoryName,
		categorySlug: category,
		endCursor: pageInfo.endCursor,
		hasNextPage: pageInfo.hasNextPage,
	};
};

export const getPostList = async (
	fetch: Function,
	after: string | undefined = null,
	searchTerm = "",
	count: number = MAX_PER_FETCH
): Promise<PostListBySearchResponse> => {
	const response = await (
		await fetch(API_PATH, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
            query AllPostsPaginated {
                posts(where: {search: "${decodeURI(
									searchTerm
								)}"}, first: ${count}, after: "${after}") {
                    ${QUERIES.pageInfo}
                    edges {
                        cursor
                        node {
                            ${QUERIES.postMeta}
                        }
                    }
                }
              }
            `,
			}),
		})
	).json();
	const { pageInfo } = response.data.posts;
	const posts: PostMeta[] = response.data.posts.edges.map((edge: any) => dataToPostMeta(edge.node));
	return {
		posts,
		searchTerm,
		endCursor: pageInfo.endCursor,
		hasNextPage: pageInfo.hasNextPage,
	};
};

export const getTagList = async (
	fetch: Function,
	after: string | undefined = null
): Promise<TagListResponse> => {
	const response = await (
		await fetch(API_PATH, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
            query AllTagsPaginated {
                tags(first: ${MAX_PER_FETCH}, after: "${after}") {
                    ${QUERIES.pageInfo}
                    edges {
                        cursor
                        node {
                            name
                            slug
                            count
                        }
                    }
                }
              }
            `,
			}),
		})
	).json();
	const { pageInfo } = response.data.tags;
	const tags: Tag[] = dataToTags(response.data.tags.edges.map((edge: any) => edge.node)).filter(
		(tag) => tag.count > 0
	);
	return {
		tags,
		endCursor: pageInfo.endCursor,
		hasNextPage: pageInfo.hasNextPage,
	};
};

export const getCategoryList = async (fetch: Function): Promise<CategoryListResponse> => {
	const response = await (
		await fetch(API_PATH, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
            query AllCategories {
                categories {
                    nodes {
                        name
                        slug
                        databaseId
                        parentDatabaseId
                    }
                  }
              }
            `,
			}),
		})
	).json();
	const categories = dataToCategories(response.data.categories.nodes);
	return { categories };
};

export const getAuthInfo = (): AuthInfo | undefined => {
	if (localStorage !== undefined) {
		return localStorage.getItem(LOCALSTORAGE_AUTH_KEY)
			? JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH_KEY)!)
			: null;
	}

	return null;
};

export const isLoggedIn = (): boolean => {
	if (!browser) {
		return false;
	}

	return Boolean(getAuthInfo());
};

export const logout = (): void => {
	loginInfo.set(null);
	localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
	toast.push("Kirjauduit ulos", toastSettings.success);
};

export const login = async (
	fetch: Function,
	username: string,
	password: string
): Promise<boolean> => {
	const response = await (
		await fetch(API_PATH, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
        mutation LoginUser {
            login(input: {
						    clientMutationId: "LoginUser"
						    username: "${username}"
						    password: "${password}"
				    }) {
					      authToken
					      refreshToken
					      user {
						        name
					      }
            }
        }`,
			}),
		})
	).json();
	if (response.errors?.length > 0) {
		toast.push("Kirjautuminen epäonnistui.", toastSettings.error);
	}

	if (response.data.login) {
		const loginData: AuthInfo = {
			displayName: response.data.login.user.name,
			username: response.data.login.user.username,
			authToken: response.data.login.authToken,
			refreshToken: response.data.login.refreshToken,
		};
		localStorage.setItem("auth", JSON.stringify(loginData));
		loginInfo.set(loginData);
		toast.push(`Tervetuloa, ${loginData.displayName}`, toastSettings.success);
		return true;
	}

	return false;
};

export const postComment = async (
	fetch: Function,
	postId: number,
	parent: number,
	content: string
): Promise<boolean> => {
	if (!isLoggedIn()) {
		return false;
	}

	const authToken = browser ? getAuthInfo()?.authToken : null;
	const response = await (
		await fetch(API_PATH, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: authToken ? `Bearer ${authToken}` : "",
			},
			body: JSON.stringify({
				query: `
					mutation PostComment {
						createComment(input: {
							commentOn: ${postId}, 
							parent: ${parent},
							content: "${content}"
						}) {
							success
						}
					}`,
			}),
		})
	).json();
	response.errors?.forEach((error: any) => {
		toast.push(error.message, toastSettings.error);
	});
	if (response.data.createComment.success) {
		toast.push("Kommentti lähetetty", toastSettings.success);
		return true;
	}

	return false;
};