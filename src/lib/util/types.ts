export type LocalConfig = {
  bottomScrollThreshold: number;
  localStorageAuthKey: string;
  localStorageSettingsKey: string;
  defaultVolume: number;
  musicFadeSpeed: number;
};

export type WebhookMeta = {
  url: string;
  contentText: string;
  icon: string;
  color: number;
};

export type Config = {
  baseUrl: string; // Domain for the app, used by sitemap and RSS
  graphqlApi: string; // Path to WordPress GraphQL API
  maxPerFetch: number; // Max posts to get per fetch (WP GraphQL API has a limit of 100)
  latestPostsPerFetch: number; // Max posts to get per fetch on front page
  latestCommentsPerFetch: number; // Max comments to get per fetch on front page
  locale: string; // Locale for language, "en-US"/"fi-FI"
  siteName: string; // Name of site
  subHeader: string; // Subheader for site
  copyright: string; // Copyright notice
  categoriesExcludedFromAllPosts: string[]; // Categories to exclude from all posts page
  banners: string[]; // URLs for banners
  urls: {
    soundtracks: string; // URL for soundtracks page
    writingGuide: string; // URL for writing guide
    commentEdit: string; // URL for comment edit page
    postEdit: string; // URL for post edit page
    writing: string; // URL for writing page
    feedback: string; // URL for feedback page
    about: string; // URL for about page
  };
  webhooks: {
    password: string;
    newPost: WebhookMeta[]; // URLs for new post webhooks
    newComment: WebhookMeta[]; // URLs for new comment webhooks
  };
  externalStylesheets: string[]; // External stylesheets to load
  defaultFeaturedImage: string; // Default featured image for posts
};

export type Localization = {
  common: {
    loadMore: string;
    edit: string;
    reply: string;
    comment: string;
    send: string;
    close: string;
    commentSingular: string;
    commentPlural: string;
  };
  toasts: {
    welcome: string;
    commentSent: string;
    commentFailed: string;
    loginFailed: string;
    loggedOut: string;
  };
  components: {
    commentForm: {
      emptyComment: string;
    };
    commentList: {
      post: string;
      date: string;
      commenter: string;
    };
    footer: {
      feedback: string;
      about: string;
    };
    login: {
      fillBothFields: string;
      cantUseWithoutJs: string;
      login: string;
      logout: string;
      username: string;
      password: string;
    };
    postContent: {
      validationError: string;
      noValidationError: string;
      scriptError: string;
      errorsCountSingular: string;
      errorsCountPlural: string;
      notMobileFriendly: string;
    };
    postList: {
      title: string;
      date: string;
      author: string;
    };
    search: {
      emptyField: string;
      search: string;
      searchTerms: string;
    };
    navigation: {
      frontPage: string;
      posts: string;
      tags: string;
      categories: string;
      search: string;
      guide: string;
      soundtracks: string;
      write: string;
      login: string;
      profile: string;
    };
  };
  settings: {
    user: string;
    volume: string;
  };
  errors: {
    e401: string;
    e403: string;
    e404: string;
    e500: string;
  };
  webhooks: {
    newComment: string;
  };
  pages: {
    index: {
      title: string;
      newestReleases: string;
      newestComments: string;
    };
    error: {
      title: string;
    };
    posts: {
      title: string;
    };
    post: {
      noAccess: string;
    };
    tags: {
      title: string;
    };
    tag: {
      title: string;
    };
    search: {
      title: string;
    };
    searchResults: {
      title: string;
    };
    categories: {
      title: string;
    };
    category: {
      title: string;
    };
    author: {
      title: string;
    };
    profile: {
      title: string;
    };
  };
};

export type Hierarchical = {
  _id: number;
  _parentId: number;
  children: Hierarchical[];
};

export type PostMeta = {
  title: string;
  slug: string;
  date: Date;
  author: string;
  coAuthors: string[];
  categories: Category[];
  customBanner: string;
  featuredImage: string;
  description: string;
  mobileFriendly: boolean;
  commentCount: number;
};

export type Post = {
  _id: number;
  initialLetter: boolean;
  scripts: string;
  styles: string;
  scriptFiles: string[];
  music: string[];
  artists: string[];
  bannerVisible: boolean;
  fullWidth: boolean;
  resetMusicButtons: boolean;
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
  validationResult: any;
} & PostMeta;

export type Category = {
  slug: string;
  name: string;
  children: Category[];
} & Hierarchical;

export type Tag = {
  slug: string;
  name: string;
  count: number;
};

export type Comment = {
  date: Date;
  author: string;
  content: string;
} & Hierarchical;

export type CommentMeta = {
  _id: number;
  date: Date;
  author: string;
  postSlug: string;
  postTitle: string;
};

export type Paginated = {
  endCursor: string;
  hasNextPage: boolean | null;
};

export type CommentResponse = {
  comments: Comment[];
} & Paginated;

export type PostResponse = {
  post: Post | null;
  slug: string;
};

export type PostListResponse = {
  posts: PostMeta[];
} & Paginated;

export type PostListBySearchResponse = {
  searchTerm: string;
} & PostListResponse;

export type PostListByAuthorResponse = {
  author: string;
} & PostListResponse;

export type PostListByCategoryResponse = {
  category: string;
  categorySlug: string;
} & PostListResponse;

export type PostListByTagResponse = {
  tag: string;
  tagSlug: string;
} & PostListResponse;

export type TagListResponse = {
  tags: Tag[];
} & Paginated;

export type CategoryListResponse = {
  categories: Category[];
};

export type PostsAndCommentsResponse = {
  posts: PostMeta[];
  comments: CommentMeta[];
};

export type AuthData = {
  displayName: string;
  username: string;
  authToken: string;
  refreshToken: string;
} | null;

export type PostOptions = {
  bannerVisible: boolean;
  customBannerUrl: string | null;
  stickyMenu: boolean;
  fullWidth: boolean;
};
