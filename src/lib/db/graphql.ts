import { toast } from "@zerodevx/svelte-toast";
import { browser } from "$app/environment";
import { error } from "@sveltejs/kit";
import {
  dataToCategories,
  dataToCommentMetas,
  dataToComments,
  dataToPost,
  dataToPostMeta,
  dataToTags,
} from "$lib/db/graphql.mappers";
import { QUERIES } from "$lib/db/graphql.queries";
import type {
  Category,
  Comment,
  CommentMeta,
  CommentResponse,
  Post,
  PostListByAuthorResponse,
  PostListByCategoryResponse,
  PostListBySearchResponse,
  PostListByTagResponse,
  PostMeta,
  Tag,
  TagListResponse,
} from "$lib/util/types";
import { objectsToHierarchy, toastSettings } from "$lib/util/util";
import { t } from "$lib/util/translations";
import { auth } from "$lib/util/stores";
import { get } from "svelte/store";
import { globalConfig } from "$lib/util/config";

// Legacy WPGraphQL queries

export const getLatestComments = async (fetch: Function): Promise<CommentMeta[]> => {
  const authToken = browser ? get(auth)?.authToken : null;
  const response = await (
    await fetch(globalConfig.graphqlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
      body: JSON.stringify({
        query: `
            query LatestComments {
                comments(first: ${globalConfig.latestCommentsPerFetch}) {
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

export const getLatestPosts = async (fetch: Function) =>
  (await getPostsPaginated(fetch, null, "", globalConfig.latestPostsPerFetch)).posts;

export const getPostMeta = async (fetch: Function, slug: string): Promise<PostMeta | null> => {
  const response = await (
    await fetch(globalConfig.graphqlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query PostBySlug {
                post(idType: SLUG, id: "${slug}") {
                    ${QUERIES.postMeta}
                }
            }
            `,
      }),
    })
  ).json();
  return dataToPostMeta(response.data.post);
};

export const getPost = async (fetch: Function, slug: string): Promise<Post | null> => {
  const authToken = browser ? get(auth)?.authToken : null;
  const response = await (
    await fetch(globalConfig.graphqlApi, {
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
                }
            }
            `,
      }),
    })
  ).json();
  const post = dataToPost(response.data.post);
  if (post) post.comments = await getCommentsForPost(fetch, slug);
  return post;
};

export const getCommentsForPost = async (fetch: Function, slug: string): Promise<Comment[]> => {
  let allCommentsFetched = false;
  let allComments: Comment[] = [];
  let latestAfter = null;
  while (!allCommentsFetched) {
    const commentResponse = await getCommentsForPostPaginated(fetch, slug, latestAfter);
    allComments = [...allComments, ...commentResponse.comments];
    if (!commentResponse.hasNextPage) allCommentsFetched = true;
    else latestAfter = commentResponse.endCursor;
  }
  return (objectsToHierarchy(allComments) as Comment[]).sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );
};

const getCommentsForPostPaginated = async (
  fetch: Function,
  slug: string,
  after: string | null = null,
): Promise<CommentResponse> => {
  const authToken = browser ? get(auth)?.authToken : null;
  const response = await (
    await fetch(globalConfig.graphqlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
      body: JSON.stringify({
        query: `
            query CommentsForPostBySlug {
                post(idType: SLUG, id: "${slug}") {
		                comments(first: ${globalConfig.maxPerFetch}, after: "${after}") {
		                    ${QUERIES.pageInfo}
		                    edges {
		                        cursor
		                        node {
																${QUERIES.postComment}
		                        }
		                    }
		                }
		            }
            }
            `,
      }),
    })
  ).json();
  const { pageInfo } = response.data.post.comments;
  const comments = dataToComments(response.data.post.comments.edges.map((e: any) => e.node));
  return {
    comments,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage,
  };
};

export const getPostsForAuthorPaginated = async (
  fetch: Function,
  author: string,
  after: string | null = null,
): Promise<PostListByAuthorResponse> => {
  const response = await (
    await fetch(globalConfig.graphqlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query PostsByAuthor {
                posts(where: {authorName: "${decodeURI(author)}"}, first: ${
                  globalConfig.maxPerFetch
                }, after: "${after}") {
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
  if (response.data.posts["edges"].length === 0) {
    throw error(404, t.errors.e404);
  }

  const { pageInfo } = response.data.posts;
  const posts: PostMeta[] = response.data.posts["edges"].map((edge: any) =>
    dataToPostMeta(edge.node),
  );
  return {
    posts,
    author,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage,
  };
};

export const getPostsForTagPaginated = async (
  fetch: Function,
  tag: string,
  after: string | null = null,
): Promise<PostListByTagResponse> => {
  const response = await (
    await fetch(globalConfig.graphqlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query PostsByTag {
                posts(where: {tagSlugIn: "${tag}"}, first: ${globalConfig.maxPerFetch}, after: "${after}") {
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
    throw error(404, t.errors.e404);
  }

  const { pageInfo } = response.data.posts;
  const tagName = response.data.tag.name;
  const posts: PostMeta[] = response.data.posts["edges"].map((edge: any) =>
    dataToPostMeta(edge.node),
  );
  return {
    posts,
    tag: tagName,
    tagSlug: tag,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage,
  };
};

export const getPostsForCategoryPaginated = async (
  fetch: Function,
  category: string,
  after: string | null = null,
): Promise<PostListByCategoryResponse> => {
  const response = await (
    await fetch(globalConfig.graphqlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query PostsByCategory {
                category(id: "${category}", idType: SLUG) {
                    name
                    posts(first: ${globalConfig.maxPerFetch}, after: "${after}") {
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
    throw error(404, t.errors.e404);
  }

  const { pageInfo } = response.data.category.posts;
  const categoryName = response.data.category.name;
  const posts: PostMeta[] = response.data.category.posts["edges"].map((edge: any) =>
    dataToPostMeta(edge.node),
  );
  return {
    posts,
    category: categoryName,
    categorySlug: category,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage,
  };
};

export const getPosts = async (fetch: Function): Promise<PostMeta[]> => {
  let allPostsFetched = false;
  let allPosts: PostMeta[] = [];
  let latestAfter = null;
  while (!allPostsFetched) {
    const response = await getPostsPaginated(fetch, latestAfter);
    allPosts = [...allPosts, ...response.posts];
    if (!response.hasNextPage) allPostsFetched = true;
    else latestAfter = response.endCursor;
  }
  return allPosts.sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const getPostsPaginated = async (
  fetch: Function,
  after: string | null = null,
  searchTerm = "",
  count: number = globalConfig.maxPerFetch,
): Promise<PostListBySearchResponse> => {
  const response = await (
    await fetch(globalConfig.graphqlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query AllPostsPaginated {
                posts(where: {search: "${decodeURI(
                  searchTerm,
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
  const posts: PostMeta[] = response.data.posts["edges"].map((edge: any) =>
    dataToPostMeta(edge.node),
  );
  return {
    posts,
    searchTerm,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage,
  };
};

export const getTagsPaginated = async (
  fetch: Function,
  after: string | null = null,
): Promise<TagListResponse> => {
  const response = await (
    await fetch(globalConfig.graphqlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query AllTagsPaginated {
                tags(first: ${globalConfig.maxPerFetch}, after: "${after}") {
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
  const tags: Tag[] = dataToTags(response.data.tags["edges"].map((edge: any) => edge.node)).filter(
    (tag) => tag.count > 0,
  );
  return {
    tags,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage,
  };
};

export const getCategoriesPaginated = async (fetch: Function): Promise<Category[]> => {
  const response = await (
    await fetch(globalConfig.graphqlApi, {
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
  return dataToCategories(response.data.categories.nodes);
};

export const postComment = async (
  fetch: Function,
  postId: number,
  parent: number,
  content: string,
): Promise<boolean> => {
  const authToken = browser ? get(auth)?.authToken : null;
  if (!authToken) return false;
  const response = await (
    await fetch(globalConfig.graphqlApi, {
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
    toast.push(t.toasts.commentSent, toastSettings.success);
    return true;
  }

  return false;
};
