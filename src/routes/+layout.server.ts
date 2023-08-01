import type { Load } from "@sveltejs/kit";
import { createClient } from "@vercel/edge-config";

const edgeConfig = createClient(import.meta.env.VITE_EDGE_CONFIG);

export const load: Load = async () => {
  const config = await edgeConfig.getAll();

  return {
    config,
  };
};
