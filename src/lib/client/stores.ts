import { type Writable, writable } from 'svelte/store';
import { clientConfig } from '$lib/client/config';
import { browser } from '$app/environment';
import type { AuthData, PostOptions } from '$lib/types';

export const auth: Writable<AuthData> = writable(
  browser
    ? localStorage.getItem(clientConfig.localStorageAuthKey)
      ? JSON.parse(localStorage.getItem(clientConfig.localStorageAuthKey)!)
      : null
    : null
);

export const scrolledToBottom: Writable<boolean> = writable(false);

export const postOptions = writable<PostOptions>({
  bannerVisible: true,
  customBannerUrl: null,
  stickyMenu: true,
  fullWidth: false
});
