export interface Hierarchical {
  _id: number;
  _parentId: number;
  children: this[];
}

export interface Author {
  displayName: string;
  username: string;
}

export interface PostMeta {
  title: string;
  slug: string;
  date: Date;
  author: Author;
  coAuthors: Author[];
  categories: Category[];
  customBanner: string;
  featuredImage: string;
  description: string;
  mobileFriendly: boolean;
  commentCount: number;
}

export interface Post extends PostMeta {
  _id: number;
  initialLetter: boolean;
  scripts: string;
  styles: string;
  music: string[];
  artists: string[];
  bannerVisible: boolean;
  fullWidth: boolean;
  content: string;
  previous: {
    title: string;
    slug: string;
  } | null;
  next: {
    title: string;
    slug: string;
  } | null;
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
  author: Author;
  content: string;
}

export interface CommentMeta {
  _id: number;
  date: Date;
  author: Author;
  postSlug: string;
  postTitle: string;
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
}

export interface PostListByAuthorResponse extends PostListResponse {
  author: Author;
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

export interface PostsAndCommentsResponse {
  posts: PostListResponse;
  comments: CommentMeta[];
}

export interface AuthInfo {
  displayName: string;
  username: string;
  authToken: string;
  refreshToken: string;
}

export interface PostOptions {
  bannerVisible: boolean;
  customBannerUrl: string | null;
  stickyMenu: boolean;
  fullWidth: boolean;
}