import type { Config, LocalConfig } from '$lib/util/types';
import { browser } from '$app/environment';
import { createClient } from '@vercel/edge-config';

export const localConfig: LocalConfig = {
  bottomScrollThreshold: 100,
  localStorageAuthKey: 'auth',
  localStorageSettingsKey: 'settings',
  defaultVolume: 50,
  musicFadeSpeed: 1,
  featuredPostRotationInterval: 10000
};

export const loadServerConfig = async () => {
  const edgeConfigClient = createClient(import.meta.env.VITE_EDGE_CONFIG);
  return (await edgeConfigClient.getAll()) as Config;
};

export const loadClientConfig = async () => {
  clientConfig = await (await fetch('/api/config')).json();
}

let clientConfig: Config | undefined = undefined;
const serverConfig: Config | undefined = browser ? undefined : await loadServerConfig();

export const globalConfig: Config = browser
  ? clientConfig!
  : serverConfig!;
