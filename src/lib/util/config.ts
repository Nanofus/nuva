import type { Config, LocalConfig } from "$lib/util/types";
import { browser } from "$app/environment";
import { createClient } from "@vercel/edge-config";

export const localConfig: LocalConfig = {
  bottomScrollThreshold: 100,
  localStorageAuthKey: "auth",
  localStorageSettingsKey: "settings",
  globalObjectName: "globals",
  defaultVolume: 50,
  musicFadeSpeed: 1,
  featuredPostRotationInterval: 10000,
};

export const getConfig = async () => {
  const edgeConfigClient = createClient(import.meta.env.VITE_EDGE_CONFIG);
  return (await edgeConfigClient.getAll()) as Config;
};

export const globalConfig: Config = browser
  ? await (await fetch("/api/config")).json()
  : await getConfig();
