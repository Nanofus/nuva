import type { Category, Comment, CommentMeta, Post, PostMeta, Tag } from '$lib/util/types';
import { objectsToHierarchy } from '$lib/util/util';

export const dataToPostMeta = (data: any): PostMeta => ({
  title: data.title,
  slug: data.slug,
  date: new Date(data.rawDate),
  author: data.author.node.name,
  coAuthors: data.coAuthors.nodes
    .map((author: any) => author.displayName)
    .sort((a: string, b: string) => {
      if (a === data.author.node.name) {
        return -1;
      }

      if (b === data.author.node.name) {
        return 1;
      }

      return a.localeCompare(b);
    }),
  categories: data.categories.nodes.map((category: any) => ({
    slug: category.slug,
    name: category.name
  })),
  customBanner: data.additionalFields.custombanner,
  featuredImage: data.additionalFields.featuredimage,
  description: data.additionalFields.description,
  mobileFriendly: data.additionalFields.mobilefriendly,
  commentCount: data.commentCount
});

export const dataToComments = (nodes: any): Comment[] => {
  return nodes.map(
    (comment: any): Comment => ({
      date: new Date(comment.date),
      author: comment.author.node.name,
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
      author: comment.author.node.name,
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
    author: data.author.node.name,
    coAuthors: data.coAuthors.nodes
      .map((author: any) => author.displayName)
      .sort((a: string, b: string) => {
        if (a === data.author.node.name) {
          return -1;
        }

        if (b === data.author.node.name) {
          return 1;
        }

        return a.localeCompare(b);
      }),
    artists: data.additionalFields.artists
      ? data.additionalFields.artists.map((artist: any) => artist.name)
      : [],
    bannerVisible: data.additionalFields.bannervisible,
    fullWidth: data.additionalFields.fullwidth ? data.additionalFields.fullwidth : false,
    customBanner: data.additionalFields.custombanner,
    featuredImage: data.additionalFields.featuredimage,
    description: data.additionalFields.description,
    commentCount: data.commentCount,
    initialLetter: data.additionalFields.initialletter,
    mobileFriendly: data.additionalFields.mobilefriendly,
    scripts: data.additionalFields.scripts,
    styles: data.additionalFields.styles,
    scriptFiles: data.additionalFields.scriptfiles
      ? data.additionalFields.scriptfiles.split('\n')
      : [],
    music: data.additionalFields.music ? data.additionalFields.music.split('\n') : [],
    resetMusicButtons: data.additionalFields.resetmusicbuttons,
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
  }));
  return objectsToHierarchy(categories) as Category[];
};

export const dataToTags = (data: any): Tag[] =>
  data.map((tag: any) => ({
    slug: tag.slug,
    name: tag.name,
    count: tag.count
  }));
