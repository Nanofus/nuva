import { get } from "svelte/store";
import { auth } from "$lib/util/stores";
import type {
  Category,
  Comment,
  PostListResponse,
  PostMeta,
  TagListResponse,
} from "$lib/util/types";

export type RequestParams = {
  [key: string]: any;
  after?: string;
} | null;

const getRequest = async (url: string) => {
  const authValue = get(auth);
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authValue ? `Bearer ${authValue.authToken}` : "",
    },
  });
};

const postRequest = async (url: string, body: RequestParams = null) => {
  const authValue = get(auth);
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authValue ? `Bearer ${authValue.authToken}` : "",
    },
    body: body ? JSON.stringify(body) : null,
  });
};

export const getPosts = async (
  by: "author" | "category" | "tag" | null,
  forValue: string | null,
  after: string | null,
  searchTerm: string | null,
): Promise<PostListResponse> => {
  const postListResponse = await (
    await getRequest(
      `/api/posts?${by ? `by=${by}` : ``}${forValue ? `for=${forValue}` : ``}${
        searchTerm ? `&search=${encodeURI(searchTerm)}` : ``
      }${after ? `&after=${encodeURI(after)}` : ``}`,
    )
  ).json();
  postListResponse.posts.forEach((post: PostMeta) => {
    post.date = new Date(post.date);
  });
  return postListResponse;
};

export const getTags = async (after: string | null): Promise<TagListResponse> => {
  return await (await getRequest(`/api/tags?${after ? `after=${encodeURI(after)}` : ``}`)).json();
};

export const getCategories = async (): Promise<Category[]> => {
  return await (await getRequest("/api/categories")).json();
};

export const getCommentsByPost = async (postSlug: string): Promise<Comment[]> => {
  return await (await getRequest(`/api/posts/${postSlug}/comments`)).json();
};

export const postComment = async (
  post: number,
  postSlug: string,
  parent: number,
  content: string,
): Promise<boolean> => {
  return (await postRequest(`/api/posts/${postSlug}/comments`, { post, parent, content })).ok;
};
