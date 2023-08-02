import { error, type Load } from "@sveltejs/kit";
import { getPost } from "$lib/db/graphql";
import type { Post } from "$lib/util/types";
import { t } from "$lib/util/translations";

export const load: Load = async ({ fetch, params, url }): Promise<Post | null> => {
  if (params.slug) {
    const isPreview = url.searchParams.get("preview") != null;
    const post = await getPost(fetch, params.slug);
    if (isPreview && post) {
      post.validationResult = await fetch("/api/html-validator", {
        method: "POST",
        body: JSON.stringify({
          html: post.content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res: Response) => res.json());
    }
    return post;
  }

  throw error(404, t.errors.e404);
};
