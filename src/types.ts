export interface Post {
  uri: string;
  title: string;
  content: string;
  excerpt: string;
  author: { node: Author };
  additionalFields: {
    authors: Author[];
    featuredimage: string;
    theme: string;
    scripts: string;
    styles: string;
  }
  date: Date;
}

export interface Author {
  firstName: string;
}

export interface PostTemplateParams {
    data: {
        previous: Post,
        next: Post,
        post: Post,
    }
}
