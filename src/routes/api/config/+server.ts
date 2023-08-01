import { json } from "@sveltejs/kit";
import { getConfig } from "$lib/util/config";

export const GET = async () => {
  return json(await getConfig());
};
