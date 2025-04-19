import { createKysely } from '@vercel/postgres-kysely';
import type { DB } from '$lib/server/database.types';
import type {
  Category,
  Comment,
  CommentMeta,
  CommentResponse,
  Post,
  PostListByAuthorResponse,
  PostListByCategoryResponse,
  PostListBySearchResponse,
  PostListByTagResponse, PostListByYearResponse, PostListResponse,
  PostMeta,
  Tag,
  TagListResponse
} from '$lib/util/types';
import { getConfig } from '$lib/util/config';
import {
  dataToCategories,
  dataToCommentMetas,
  dataToComments,
  dataToPost,
  dataToPostMeta,
  dataToTags
} from '$lib/server/legacy.graphql.mappers';
import { QUERIES } from '$lib/server/legacy.graphql.queries';
import { objectsToHierarchy } from '$lib/util/util';
import { error } from '@sveltejs/kit';
import { t } from '$lib/util/translations';

const db = createKysely<DB>({
  connectionString: import.meta.env.VITE_POSTGRES_URL
});

/* Latest posts and comments */

export const getLatestComments = async (): Promise<CommentMeta[]> => {
  const response = await (
    await fetch(getConfig().graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query LatestComments {
                comments(first: ${getConfig().latestCommentsPerFetch}) {
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
            `
      })
    })
  ).json();
  return dataToCommentMetas(response.data.comments.nodes);
};

export const getLatestPosts = async () =>
  (await getPosts(null, null, getConfig().latestPostsPerFetch)).posts;

/* General queries */

export const getPostMeta = async (slug: string): Promise<PostMeta | null> => {
  const response = await (
    await fetch(getConfig().graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query PostBySlug {
                post(idType: SLUG, id: "${slug}") {
                    ${QUERIES.postMeta}
                }
            }
            `
      })
    })
  ).json();
  return dataToPostMeta(response.data.post);
};

export const getPost = async (
  slug: string,
  authToken: string | null = null
): Promise<Post | null> => {
  const response = await (
    await fetch(getConfig().graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken
          ? `Bearer ${authToken}`
          : `Bearer ${import.meta.env.VITE_WPGRAPHQL_AUTH_TOKEN}`
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
  let post = dataToPost(response.data.post);
  if (!post) {
    const response = await (
      await fetch(getConfig().graphqlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken
            ? `Bearer ${authToken}`
            : `Bearer ${import.meta.env.VITE_WPGRAPHQL_AUTH_TOKEN}`
        },
        body: JSON.stringify({
          query: `
            query PostBySlug {
                post(idType: DATABASE_ID, id: ${slug}) {
                    ${QUERIES.postContent}
                }
            }
            `
        })
      })
    ).json();
    post = dataToPost(response.data.post);
    if (post) post.previewMode = true;
  }
  if (post && !post.previewMode) post.comments = await getCommentsForPost(slug);
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
  return (objectsToHierarchy(allComments) as Comment[]).sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
};

const getCommentsForPostPaginated = async (
  slug: string,
  after: string | null = null
): Promise<CommentResponse> => {
  const response = await (
    await fetch(getConfig().graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query CommentsForPostBySlug {
                post(idType: SLUG, id: "${slug}") {
		                comments(first: ${getConfig().maxPerFetch}, after: "${after}") {
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
            `
      })
    })
  ).json();
  if (!response.data.post) return { comments: [], endCursor: '', hasNextPage: false };
  const { pageInfo } = response.data.post.comments;
  const comments = dataToComments(response.data.post.comments['edges'].map((e: any) => e.node));
  return {
    comments,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage
  };
};

export const getPostsByAuthor = async (
  author: string,
  after: string | null = null
): Promise<PostListByAuthorResponse> => {
  const response = await (
    await fetch(getConfig().graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query PostsByAuthor {
                posts(where: {authorName: "${decodeURI(author)}"}, first: ${
          getConfig().maxPerFetch
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
            `
      })
    })
  ).json();
  if (response.data.posts['edges'].length === 0) {
    throw error(404, t.errors.e404);
  }

  const { pageInfo } = response.data.posts;
  const posts: PostMeta[] = response.data.posts['edges'].map((edge: any) =>
    dataToPostMeta(edge.node)
  );
  return {
    posts,
    author,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage
  };
};

export const getPostsByTag = async (
  tag: string,
  after: string | null = null
): Promise<PostListByTagResponse> => {
  const response = await (
    await fetch(getConfig().graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query PostsByTag {
                posts(where: {tagSlugIn: "${tag}"}, first: ${getConfig().maxPerFetch}, after: "${after}") {
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
  if (!response.data.tag) {
    throw error(404, t.errors.e404);
  }

  const { pageInfo } = response.data.posts;
  const tagName = response.data.tag.name;
  const posts: PostMeta[] = response.data.posts['edges'].map((edge: any) =>
    dataToPostMeta(edge.node)
  );
  return {
    posts,
    tag: tagName,
    tagSlug: tag,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage
  };
};

export const getPostsByCategory = async (
  category: string,
  after: string | null = null
): Promise<PostListByCategoryResponse> => {
  const response = await (
    await fetch(getConfig().graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query PostsByCategory {
                category(id: "${category}", idType: SLUG) {
                    name
                    posts(first: ${getConfig().maxPerFetch}, after: "${after}") {
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
  if (!response.data.category) {
    throw error(404, t.errors.e404);
  }

  const { pageInfo } = response.data.category.posts;
  const categoryName = response.data.category.name;
  const posts: PostMeta[] = response.data.category.posts['edges'].map((edge: any) =>
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

export const getAllPostMetas = async (): Promise<PostMeta[]> => {
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

export const getPostsByYear = async (year: number): Promise<PostListByYearResponse> => {
  const response = await (
    await fetch(getConfig().graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query PostsByYear {
                posts(first: ${getConfig().maxPerFetch}, where: { dateQuery: {
                  column: DATE
                  year: ${year}
            }}) {
                    nodes {
                        ${QUERIES.postMeta}
                    }
                }
            }
            `
      })
    })
  ).json();
  const posts: PostMeta[] = response.data.posts.nodes.map((node: any) =>
    dataToPostMeta(node)
  );
  return {
    posts,
    year: Number(year),
    endCursor: '',
    hasNextPage: false,
  };
};

export const getPosts = async (
  after: string | null = null,
  searchTerm: string | null = null,
  count: number = getConfig().maxPerFetch,
): Promise<PostListBySearchResponse> => {
  const response = await (
    await fetch(getConfig().graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query AllPostsPaginated {
                posts(${searchTerm != null ? `where: {search: "${searchTerm ? decodeURI(searchTerm) : ''
    }"}, ` : ''}first: ${count}${after != null ? `, after: "${after}"` : ''}) {
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
  const { pageInfo } = response.data.posts;
  const posts: PostMeta[] = response.data.posts['edges'].map((edge: any) =>
    dataToPostMeta(edge.node)
  );
  return {
    posts,
    searchTerm: searchTerm ? searchTerm : '',
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage
  };
};

export const getTags = async (after: string | null = null): Promise<TagListResponse> => {
  const response = await fetch(getConfig().graphqlApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
            query AllTagsPaginated {
                tags(first: ${getConfig().maxPerFetch}, after: "${after}") {
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
            `
    })
  });
  const jsonResponse = await response.json();
  const { pageInfo } = jsonResponse.data.tags;
  const tags: Tag[] = dataToTags(jsonResponse.data.tags['edges'].map((edge: any) => edge.node)).filter(
    (tag) => tag.count > 0
  );
  return {
    tags,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage
  };
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await (
    await fetch(getConfig().graphqlApi, {
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
                        databaseId
                        parentDatabaseId
                    }
                  }
              }
            `
      })
    })
  ).json();
  return dataToCategories(response.data.categories.nodes);
};

export const postComment = async (
  authToken: string,
  postId: number,
  parent: number,
  content: string
): Promise<boolean> => {
  if (!authToken) return false;
  const query = `
    mutation PostComment($content: String!) {
        createComment(input: {
            commentOn: ${postId}, 
            parent: ${parent},
            content:$content}) {
            success
        }
    }`;
  const response = await (
    await fetch(getConfig().graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        query,
        variables: {
          content
        }
      })
    })
  ).json();
  return !!response.data.createComment.success;
};
