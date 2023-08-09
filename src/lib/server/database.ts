import { createKysely } from "@vercel/postgres-kysely";
import type { DB, Meta } from "$lib/server/database.types";
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
import { globalConfig } from "$lib/util/config";
import {
  dataToCategories,
  dataToCommentMetas,
  dataToComments,
  dataToPost,
  dataToPostMeta,
  dataToTags,
} from "$lib/server/legacy.graphql.mappers";
import { QUERIES } from "$lib/server/legacy.graphql.queries";
import { objectsToHierarchy } from "$lib/util/util";
import { error } from "@sveltejs/kit";
import { t } from "$lib/util/translations";

const db = createKysely<DB>({
  connectionString: import.meta.env.VITE_POSTGRES_URL,
});

/* Webhook checks */

export const getLatestPostSlug = async () => {
  const result: Meta | undefined = await db
    .selectFrom("Meta")
    .where("key", "=", "latestPost")
    .selectAll()
    .executeTakeFirst();
  if (!result) return null;
  return result.value;
};

export const setLatestPostSlug = async (slug: string) => {
  const result = await db
    .updateTable("Meta")
    .where("key", "=", "latestPost")
    .set({
      value: slug,
    })
    .executeTakeFirst();
  return BigInt(1) === result.numUpdatedRows;
};

export const getLatestCommentId = async () => {
  const result: Meta | undefined = await db
    .selectFrom("Meta")
    .where("key", "=", "latestComment")
    .selectAll()
    .executeTakeFirst();
  if (!result || !result.value) return null;
  return parseInt(result.value);
};

export const setLatestCommentId = async (id: number) => {
  const result = await db
    .updateTable("Meta")
    .where("key", "=", "latestComment")
    .set({
      value: String(id),
    })
    .executeTakeFirst();
  return BigInt(1) === result.numUpdatedRows;
};

/* Latest posts and comments */

export const getLatestComments = async (authToken: string | null = null): Promise<CommentMeta[]> => {
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

export const getLatestPosts = async () => (await getPosts(null, null, globalConfig.latestPostsPerFetch)).posts;

/* General queries */

export const getPostMeta = async (slug: string): Promise<PostMeta | null> => {
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

export const getPost = async (slug: string, authToken: string | null = null): Promise<Post | null> => {
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
  if (post) post.comments = await getCommentsForPost(slug);
  return post;
};

export const getCommentsForPost = async (slug: string): Promise<Comment[]> => {
  let allCommentsFetched = false;
  let allComments: Comment[] = [];
  let latestAfter = null;
  while (!allCommentsFetched) {
    const commentResponse = await getCommentsForPostPaginated(slug, latestAfter);
    allComments = [...allComments, ...commentResponse.comments];
    if (!commentResponse.hasNextPage) allCommentsFetched = true;
    else latestAfter = commentResponse.endCursor;
  }
  return (objectsToHierarchy(allComments) as Comment[]).sort((a, b) => a.date.getTime() - b.date.getTime());
};

const getCommentsForPostPaginated = async (slug: string, after: string | null = null): Promise<CommentResponse> => {
  const response = await (
    await fetch(globalConfig.graphqlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  const comments = dataToComments(response.data.post.comments["edges"].map((e: any) => e.node));
  return {
    comments,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage,
  };
};

export const getPostsByAuthor = async (
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
  const posts: PostMeta[] = response.data.posts["edges"].map((edge: any) => dataToPostMeta(edge.node));
  return {
    posts,
    author,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage,
  };
};

export const getPostsByTag = async (tag: string, after: string | null = null): Promise<PostListByTagResponse> => {
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
  const posts: PostMeta[] = response.data.posts["edges"].map((edge: any) => dataToPostMeta(edge.node));
  return {
    posts,
    tag: tagName,
    tagSlug: tag,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage,
  };
};

export const getPostsByCategory = async (
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
  const posts: PostMeta[] = response.data.category.posts["edges"].map((edge: any) => dataToPostMeta(edge.node));
  return {
    posts,
    category: categoryName,
    categorySlug: category,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage,
  };
};

export const getAllPosts = async (): Promise<PostMeta[]> => {
  let allPostsFetched = false;
  let allPosts: PostMeta[] = [];
  let latestAfter = null;
  while (!allPostsFetched) {
    const response = await getPosts(latestAfter);
    allPosts = [...allPosts, ...response.posts];
    if (!response.hasNextPage) allPostsFetched = true;
    else latestAfter = response.endCursor;
  }
  return allPosts.sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const getPosts = async (
  after: string | null = null,
  searchTerm: string | null = null,
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
                posts(where: {search: "${
                  searchTerm ? decodeURI(searchTerm) : ""
                }"}, first: ${count}, after: "${after}") {
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
  const posts: PostMeta[] = response.data.posts["edges"].map((edge: any) => dataToPostMeta(edge.node));
  return {
    posts,
    searchTerm: searchTerm ? searchTerm : ``,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage,
  };
};

export const getTags = async (after: string | null = null): Promise<TagListResponse> => {
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

export const getCategories = async (): Promise<Category[]> => {
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
  authToken: string,
  postId: number,
  parent: number,
  content: string,
): Promise<boolean> => {
  if (!authToken) return false;
  const response = await (
    await fetch(globalConfig.graphqlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
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
  return !!response.data.createComment.success;
};
