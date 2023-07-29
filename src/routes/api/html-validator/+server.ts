// Vercel should run this path in Node instead of edge, since html-validate uses `eval` for some reason
import { validateHTML } from "$lib/util/html-validator";
import { json } from "@sveltejs/kit";

export const config = {
  runtime: "nodejs18.x",
};

export const POST = async ({ request }: { request: any }) => {
  const { html } = await request.json();
  const validationResult = await validateHTML(html);
  return json({
    body: validationResult,
  });
}