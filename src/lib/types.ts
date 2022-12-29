import { objectsToTree as objectsToHierarchy } from "$lib/util";

export type Hierarchical = {
    _id: string;
    _parentId: string;
    children: Hierarchical[];
}

export type PostMeta = {
    title: string;
    slug: string;
    date: Date;
    authors: string[];
    featuredImage: string;
    commentCount: number;
}

export type Post = PostMeta & {
    initialLetter: boolean;
    scripts: string;
    styles: string;
    theme: string;
    content: string;
    categories: Category[];
    tags: Tag[];
    comments: Comment[];
}

export type Category = Hierarchical & {
    slug: string;
    name: string;
}

export type Tag = {
    slug: string;
    name: string;
}

export type Comment = Hierarchical & {
    date: Date;
    author: string;
    content: string;
}

export type Paginated = {
    endCursor: string;
    hasNextPage: boolean | null;
}

export type PostListResponse = Paginated & {
    posts: PostMeta[];
    searchTerm: string | null;
}

export type TagListResponse = Paginated & {
    tags: Tag[];
}

export type CategoryListResponse = {
    categories: Category[];
}

export type AuthInfo = {
    username: string;
    authToken: string;
    refreshToken: string;
}

export const dataToPostMeta = (data: any): PostMeta => {
    return {
        title: data.title,
        slug: data.slug,
        date: new Date(data.rawDate),
        authors: data.additionalFields.authorgroup ? (data.additionalFields.authorgroup.replace(" ", "").split(",")) : data.author.node.name,
        featuredImage: data.additionalFields.featuredimage,
        commentCount: data.commentCount
    }
}

export const dataToPost = (data: any): Post => {
    const post: Post = {
        title: data.title,
        slug: data.slug,
        date: new Date(data.rawDate),
        authors: data.additionalFields.authorgroup ? (data.additionalFields.authorgroup.replace(" ", "").split(",")) : data.author.node.name,
        featuredImage: data.additionalFields.featuredimage,
        commentCount: data.commentCount,
        initialLetter: data.additionalFields.initialletter,
        scripts: data.additionalFields.scripts,
        styles: data.additionalFields.styles,
        theme: data.additionalFields.theme,
        content: data.content,
        categories: data.categories.nodes.map((category: any) => {
            return {
                slug: category.slug,
                name: category.name
            }
        }),
        tags: data.tags.nodes.map((tag: any) => {
            return {
                slug: tag.slug,
                name: tag.name
            }
        }),
        comments: data.comments.nodes.map((comment: any) => {
            return {
                date: new Date(comment.date),
                author: comment.author.node.name,
                content: comment.content,
                children: [],
                _id: comment.id,
                _parentId: comment.parentId
            }
        })
    }
    post.comments = objectsToHierarchy(post.comments) as Comment[];
    return post;
}

export const dataToCategories = (data: any): Category[] => {
    let categories = data.map((category: any) => {
        return {
            slug: category.slug,
            name: category.name,
            children: [],
            _id: category.id,
            _parentId: category.parentId
        }
    });
    categories = objectsToHierarchy(categories) as Category[];
    return categories;
}

export const dataToTags = (data: any): Tag[] => {
    return data.map((tag: any) => {
        return {
            slug: tag.slug,
            name: tag.name
        }
    })
}