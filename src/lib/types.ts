export type Hierarchical = {
	_id: string;
	_parentId: string;
	children: Hierarchical[];
};

export type PostMeta = {
	title: string;
	slug: string;
	date: Date;
	authors: string[];
	featuredImage: string;
	commentCount: number;
};

export type Post = PostMeta & {
	initialLetter: boolean;
	scripts: string;
	styles: string;
	theme: string;
	content: string;
	categories: Category[];
	tags: Tag[];
	comments: Comment[];
};

export type Category = Hierarchical & {
	slug: string;
	name: string;
};

export type Tag = {
	slug: string;
	name: string;
};

export type Comment = Hierarchical & {
	date: Date;
	author: string;
	content: string;
};

export type Paginated = {
	endCursor: string;
	hasNextPage: boolean | null;
};

export type PostListResponse = Paginated & {
	posts: PostMeta[];
};

export type PostListBySearchResponse = PostListResponse & {
	searchTerm: string | null;
};

export type PostListByCategoryResponse = PostListResponse & {
	category: string;
	categorySlug: string;
};

export type PostListByTagResponse = PostListResponse & {
	tag: string;
	tagSlug: string;
};

export type TagListResponse = Paginated & {
	tags: Tag[];
};

export type CategoryListResponse = {
	categories: Category[];
};

export type AuthInfo = {
	username: string;
	authToken: string;
	refreshToken: string;
};
