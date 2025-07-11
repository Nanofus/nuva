import { createKysely } from '@vercel/postgres-kysely';
import type { DB } from '$lib/server/database.types';
import type {
  Author,
  Category,
  Comment,
  CommentMeta,
  CommentResponse,
  Post,
  PostListByAuthorResponse,
  PostListByCategoryResponse, PostListByDateResponse,
  PostListBySearchResponse,
  PostListByTagResponse,
  PostListByYearResponse,
  PostMeta,
  Tag,
  TagListResponse
} from '$lib/types';
import {
  dataToCategories,
  dataToCommentMetas,
  dataToComments,
  dataToPost,
  dataToPostMeta,
  dataToTags
} from '$lib/server/wpgraphql-mappers';
import { QUERIES } from '$lib/server/wpgraphql-queries';
import { objectsToHierarchy } from '$lib/server/util';
import { error } from '@sveltejs/kit';
import { t } from '$lib/client/localization';
import { serverConfig } from '$lib/server/config';

const db = createKysely<DB>({
  connectionString: import.meta.env.VITE_POSTGRES_URL
});

/* Latest posts and comments */

export const getLatestComments = async (): Promise<CommentMeta[]> => {
  const response = await (
    await fetch(serverConfig.graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query LatestComments {
                comments(first: ${serverConfig.latestCommentsPerFetch}) {
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
  (await getPosts(null, null, serverConfig.latestPostsPerFetch)).posts;

/* General queries */

export const getPostMeta = async (slug: string,
  authToken: string | null = null): Promise<PostMeta | null> => {
  const response = await (
    await fetch(serverConfig.graphqlApi, {
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
  let post = dataToPostMeta(response.data.post);
  if (!post) {
    const response = await (
      await fetch(serverConfig.graphqlApi, {
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
                    ${QUERIES.postMeta}
                }
            }
            `
        })
      })
    ).json();
    post = dataToPostMeta(response.data.post);
  }
  return post;
};

export const getPost = async (
  slug: string,
  authToken: string | null = null
): Promise<Post | null> => {
  const response = await (
    await fetch(serverConfig.graphqlApi, {
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
      await fetch(serverConfig.graphqlApi, {
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
    await fetch(serverConfig.graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query CommentsForPostBySlug {
                post(idType: SLUG, id: "${slug}") {
		                comments(first: ${serverConfig.maxPerFetch}, after: "${after}") {
		                    ${QUERIES.pageInfo}
		                    edges {
		                        cursor
		                        node {
																date
                                author {
                                    node {
                                      name
                                    }
                                }
                                content
                                databaseId
                                parentDatabaseId
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
    await fetch(serverConfig.graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query PostsByAuthor {
                posts(where: {authorName: "${decodeURI(author)}"}, first: ${
      serverConfig.maxPerFetch
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
  const authorResponse = await (
    await fetch(serverConfig.graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query AuthorByName {
                user(idType: SLUG, id: "${decodeURI(author)}") {
                    name
                    slug
                }
            }
            `
      })
    })
  ).json();
  const authorData: Author = authorResponse.data.user;

  const { pageInfo } = response.data.posts;
  const posts: PostMeta[] = response.data.posts['edges'].map((edge: any) =>
    dataToPostMeta(edge.node)
  );
  return {
    posts,
    author: authorData,
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage
  };
};

export const getPostsByTag = async (
  tag: string,
  after: string | null = null
): Promise<PostListByTagResponse> => {
  const response = await (
    await fetch(serverConfig.graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query PostsByTag {
                posts(where: {tagSlugIn: "${tag}"}, first: ${serverConfig.maxPerFetch}, after: "${after}") {
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
    await fetch(serverConfig.graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query PostsByCategory {
                category(id: "${category}", idType: SLUG) {
                    name
                    posts(first: ${serverConfig.maxPerFetch}, after: "${after}") {
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
    await fetch(serverConfig.graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query PostsByYear {
                posts(first: ${serverConfig.maxPerFetch}, where: { dateQuery: {
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
    hasNextPage: false
  };
};

export const getPostsByDate = async (date: string): Promise<PostListByDateResponse> => {
  const dateParts = date.split('-');
  const year = dateParts[0];
  let month = dateParts[1];
  let day = dateParts[2];
  if (day[0] === '0') day = day.substring(1);
  if (month[0] === '0') month = month.substring(1);
  const response = await (
    await fetch(serverConfig.graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query PostsByYear {
                posts(first: ${serverConfig.maxPerFetch}, where: { dateQuery: {
                  day: ${day}, month: ${month}, year: ${year}
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
    date: date,
    endCursor: '',
    hasNextPage: false
  };
};

export const getPosts = async (
  after: string | null = null,
  searchTerm: string | null = null,
  count: number = serverConfig.maxPerFetch
): Promise<PostListBySearchResponse> => {
  const response = await (
    await fetch(serverConfig.graphqlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query AllPostsPaginated {
                posts(${searchTerm != null ? `where: {search: "${searchTerm ? decodeURI(searchTerm).replaceAll('"', '\\"') : ''
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
  const response = await fetch(serverConfig.graphqlApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
            query AllTagsPaginated {
                tags(first: ${serverConfig.maxPerFetch}, after: "${after}") {
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
    await fetch(serverConfig.graphqlApi, {
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
    await fetch(serverConfig.graphqlApi, {
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
