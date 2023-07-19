export interface Hierarchical {
  _id: number;
  _parentId: number;
  children: this[];
}

export interface PostMeta {
  title: string;
  slug: string;
  date: Date;
  authors: string[];
  categories: Category[];
  customBanner: string;
  commentCount: number;
}

export interface Post extends PostMeta {
  _id: number;
  initialLetter: boolean;
  scripts: string;
  styles: string;
  theme: string;
  music: string[];
  content: string;
  tags: Tag[];
  comments: Comment[];
}

export interface Category extends Hierarchical {
  slug: string;
  name: string;
}

export interface Tag {
  slug: string;
  name: string;
  count: number;
}

export interface Comment extends Hierarchical {
  date: Date;
  author: string;
  content: string;
}

export interface Paginated {
  endCursor: string;
  hasNextPage: boolean | null;
}

export interface PostListResponse extends Paginated {
  posts: PostMeta[];
}

export interface PostListBySearchResponse extends PostListResponse {
  searchTerm: string;
  termSlug: string;
}

export interface PostListByCategoryResponse extends PostListResponse {
  category: string;
  categorySlug: string;
}

export interface PostListByTagResponse extends PostListResponse {
  tag: string;
  tagSlug: string;
}

export interface TagListResponse extends Paginated {
  tags: Tag[];
}

export interface CategoryListResponse {
  categories: Category[];
}

export interface AuthInfo {
  displayName: string;
  username: string;
  authToken: string;
  refreshToken: string;
}
