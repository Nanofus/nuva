import { type Load, redirect } from "@sveltejs/kit";

export const load: Load = ({ params }) => {
  throw redirect(307, `/posts/${params.slug}`);
};
