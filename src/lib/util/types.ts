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
	comments: Comment[] | null;
	validationResult: any;
} & PostMeta;

export type Category = {
	slug: string;
	name: string;
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
	posts: PostListResponse;
	comments: CommentMeta[];
};

export type AuthInfo = {
	displayName: string;
	username: string;
	authToken: string;
	refreshToken: string;
};

export type PostOptions = {
	bannerVisible: boolean;
	customBannerUrl: string | null;
	stickyMenu: boolean;
	fullWidth: boolean;
};
