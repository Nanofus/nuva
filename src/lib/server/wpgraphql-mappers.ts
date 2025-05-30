import type { Author, Category, Comment, CommentMeta, Post, PostMeta, Tag } from '$lib/types';
import { objectsToHierarchy } from '$lib/server/util';

export const dataToPostMeta = (data: any): PostMeta => ({
  title: data.title,
  slug: data.slug,
  date: new Date(data.rawDate),
  author: {
    name: data.author.node.name,
    slug: data.author.node.slug
  },
  coAuthors: data.coAuthors.nodes
    .map((author: any) => {
      return {
        name: author.displayName,
        slug: author.name
      }
    })
    .sort((a: Author, b: Author) => {
      if (a.name === data.author.node.name) {
        return -1;
      }

      if (b.name === data.author.node.name) {
        return 1;
      }

      return a.name.localeCompare(b.name);
    }),
  categories: data.categories.nodes.map((category: any) => ({
    slug: category.slug,
    name: category.name
  })),
  customBanner: data.additionalFields.customBanner,
  featuredImage: data.additionalFields.featuredImage,
  description: data.additionalFields.description,
  mobileFriendly: data.additionalFields.mobileFriendly,
  metaPage: data.additionalFields.metapage, 
  commentCount: data.commentCount
});

export const dataToComments = (nodes: any): Comment[] => {
  return nodes.map(
    (comment: any): Comment => ({
      date: new Date(comment.date),
      author: {
        name: comment.author.node.name,
        slug: comment.author.node.slug
      },
      content: comment.content,
      children: [],
      _id: comment.databaseId,
      _parentId: comment.parentDatabaseId
    })
  );
};

export const dataToCommentMetas = (nodes: any): CommentMeta[] =>
  nodes.map(
    (comment: any): CommentMeta => ({
      date: new Date(comment.date),
      author: {
        name: comment.author.node.name,
        slug: comment.author.node.slug
      },
      postSlug: comment.commentedOn.node.slug,
      postTitle: comment.commentedOn.node.title,
      _id: comment.databaseId
    })
  );

export const dataToPost = (data: any): Post | null => {
  if (!data) {
    return null;
  }

  return {
    _id: data.databaseId,
    title: data.title,
    slug: data.slug,
    date: new Date(data.rawDate),
    author: {
      name: data.author.node.name,
      slug: data.author.node.slug
    },
    coAuthors: data.coAuthors.nodes
      .map((author: any) => {
        return {
          name: author.displayName,
          slug: author.name
        }
      })
      .sort((a: Author, b: Author) => {
        if (a.name === data.author.node.name) {
          return -1;
        }

        if (b.name === data.author.node.name) {
          return 1;
        }

        return a.name.localeCompare(b.name);
      }),
    artists: data.additionalFields.artists?.nodes
      ? data.additionalFields.artists.nodes.map((artist: any) => {
        return {
          name: artist.name,
          slug: artist.slug
        }
      })
      : [],
    bannerVisible: data.additionalFields.bannerVisible,
    metaPage: data.additionalFields.metapage,
    fullWidth: data.additionalFields.fullWidth ? data.additionalFields.fullWidth : false,
    customBanner: data.additionalFields.customBanner,
    featuredImage: data.additionalFields.featuredImage,
    description: data.additionalFields.description,
    commentCount: data.commentCount,
    initialLetter: data.additionalFields.initialLetter,
    mobileFriendly: data.additionalFields.mobileFriendly,
    scripts: data.additionalFields.scripts,
    styles: data.additionalFields.styles,
    scriptFiles: data.additionalFields.scriptFiles
      ? data.additionalFields.scriptFiles.split('\n')
      : [],
    music: data.additionalFields.music ? data.additionalFields.music.split('\n') : [],
    resetMusicButtons: data.additionalFields.resetMusicButtons,
    content: data.content,
    previous: data.previous
      ? {
        title: data.previous.title,
        slug: data.previous.slug
      }
      : null,
    next: data.next
      ? {
        title: data.next.title,
        slug: data.next.slug
      }
      : null,
    categories: data.categories.nodes.map((category: any) => ({
      slug: category.slug,
      name: category.name
    })),
    tags: data.tags.nodes.map((tag: any) => ({
      slug: tag.slug,
      name: tag.name
    })),
    comments: [],
    validationResult: null
  };
};

export const dataToCategories = (data: any): Category[] => {
  const categories = data.map((category: any) => ({
    slug: category.slug,
    name: category.name,
    children: [],
    _id: category.databaseId,
    _parentId: category.parentDatabaseId
  })).filter((category: { slug: string; }) => category.slug != 'user-visibility');
  return objectsToHierarchy(categories) as Category[];
};

export const dataToTags = (data: any): Tag[] =>
  data.map((tag: any) => ({
    slug: tag.slug,
    name: tag.name,
    count: tag.count
  }));
