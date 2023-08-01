import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const Role = {
  READER: "READER",
  AUTHOR: "AUTHOR",
  ADMIN: "ADMIN",
} as const;
export type Role = (typeof Role)[keyof typeof Role];
export type Category = {
  id: Generated<number>;
  name: string;
};
export type Comment = {
  id: Generated<number>;
  content: string;
  postId: number;
  authorId: number;
  parentCommentId: number | null;
};
export type Post = {
  id: Generated<number>;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  title: string;
  published: Generated<boolean>;
};
export type PostToUser = {
  A: number;
  B: number;
};
export type Tag = {
  id: Generated<number>;
  name: string;
};
export type User = {
  id: Generated<number>;
  email: string;
  username: string;
  displayname: string;
  role: Generated<Role>;
};
export type DB = {
  _PostToUser: PostToUser;
  Category: Category;
  Comment: Comment;
  Post: Post;
  Tag: Tag;
  User: User;
};
