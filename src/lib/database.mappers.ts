import type { Category, Comment, Post, PostMeta, Tag } from "$lib/types";
import { objectsToHierarchy } from "$lib/util";

export const dataToPostMeta = (data: any): PostMeta => {
  return {
    title: data.title,
    slug: data.slug,
    date: new Date(data.rawDate),
    authors: data.additionalFields.authorgroup
      ? data.additionalFields.authorgroup.map((author: any) => author.name)
      : [data.author.node.name],
    categories: data.categories.nodes.map((category: any) => {
      return {
        slug: category.slug,
        name: category.name
      };
    }),
    customBanner: data.additionalFields.custombanner,
    commentCount: data.commentCount
  };
};

export const dataToComments = (nodes: any): Comment[] => {
  const comments = nodes.map((comment: any) => {
    return {
      date: new Date(comment.date),
      author: comment.author.node.name,
      content: comment.content,
      children: [],
      _id: comment.databaseId,
      _parentId: comment.parentDatabaseId
    };
  });
  return (objectsToHierarchy(comments) as Comment[]).sort((a, b) => {
    return a.date.getTime() - b.date.getTime();
  });
};

export const dataToPost = (data: any): Post | null => {
  if (!data) return null;
  return {
    _id: data.databaseId,
    title: data.title,
    slug: data.slug,
    date: new Date(data.rawDate),
    authors: data.additionalFields.authorgroup
      ? data.additionalFields.authorgroup.map((author: any) => author.name)
      : [data.author.node.name],
    customBanner: data.additionalFields.custombanner,
    commentCount: data.commentCount,
    initialLetter: data.additionalFields.initialletter,
    scripts: data.additionalFields.scripts,
    styles: data.additionalFields.styles,
    theme: data.additionalFields.theme,
    music: data.additionalFields.music ? data.additionalFields.music.split("\n") : [],
    content: data.content,
    categories: data.categories.nodes.map((category: any) => {
      return {
        slug: category.slug,
        name: category.name
      };
    }),
    tags: data.tags.nodes.map((tag: any) => {
      return {
        slug: tag.slug,
        name: tag.name
      };
    }),
    comments: dataToComments(data.comments.nodes)
  };
};

export const dataToCategories = (data: any): Category[] => {
  let categories = data.map((category: any) => {
    return {
      slug: category.slug,
      name: category.name,
      children: [],
      _id: category.databaseId,
      _parentId: category.parentDatabaseId
    };
  });
  categories = objectsToHierarchy(categories) as Category[];
  return categories;
};

export const dataToTags = (data: any): Tag[] => {
  return data.map((tag: any) => {
    return {
      slug: tag.slug,
      name: tag.name,
      count: tag.count
    };
  });
};
