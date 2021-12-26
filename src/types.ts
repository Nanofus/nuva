export interface Post {
  uri: string;
  title: string;
  content: string;
  featuredImage: any;
  excerpt: string;
  author: { node: Author };
  date: Date;
}

export interface Author {
  firstName: string;
}

export interface BlogPostTemplateParams {
    data: {
        previous: Post,
        next: Post,
        post: Post,
    }
}
