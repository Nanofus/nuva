import type { Hierarchical, PostMeta } from '$lib/types';
import { serverConfig } from '$lib/server/config';

export const filterExcludedCategories = (posts: PostMeta[]) =>
  posts.filter(
    (post) =>
      !post.categories
        .map((cat) => cat.slug)
        .some((slug) => serverConfig.categoriesExcludedFromAllPosts.includes(slug))
  );

export const objectsToHierarchy = (arr: Hierarchical[]) => {
  const arrMap = new Map(arr.map((item: Hierarchical) => [item._id, item]));
  const tree: Hierarchical[] = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    if (item._parentId) {
      const parentItem = arrMap.get(item._parentId);

      if (parentItem) {
        const { children } = parentItem;

        if (children) {
          parentItem.children.push(item);
        } else {
          parentItem.children = [item];
        }
      }
    } else {
      tree.push(item);
    }
  }

  return tree;
};
