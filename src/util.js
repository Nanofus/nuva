export const newestFirstSort = (a, b) => {
  return new Date(a.rawDate) - new Date(b.rawDate);
};

export const alphabeticalSort = (a, b) => {
  return new Date(a.name) - new Date(b.name);
};

export const isBrowser = typeof window !== "undefined";

export const buildTaxonomyTree = (comments, sortFunction) => {
  let parentedComments = [];
  let rootComments = [];
  for (let comment of comments) {
    if (comment.children) comment.children = [];
    if (comment.parentId) {
      parentedComments.push(comment);
    } else {
      rootComments.push(comment);
    }
  }
  for (let comment of comments) {
    for (let parentedComment of parentedComments) {
      if (parentedComment.parentId === comment.id) {
        if (!comment.children) comment.children = [];
        comment.children.push(parentedComment);
      }
    }
    if (comment.children) {
      comment.children = comment.children.sort(sortFunction);
    }
  }
  rootComments = rootComments.sort(sortFunction);
  return rootComments;
};
