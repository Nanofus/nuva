import { validateHTML } from "$lib/util/html-validator";
import { json } from "@sveltejs/kit";

export const POST = async ({ request }: { request: any }) => {
  const { html } = await request.json();
  const validationResult = await validateHTML(html);
  return json(validationResult);
};
