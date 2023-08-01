import { type Writable, writable } from "svelte/store";
import { localConfig } from "$lib/util/config";
import { browser } from "$app/environment";
import type { AuthData, PostOptions } from "$lib/util/types";

export const auth: Writable<AuthData> = writable(
  browser
    ? localStorage.getItem(localConfig.localStorageAuthKey)
      ? JSON.parse(localStorage.getItem(localConfig.localStorageAuthKey)!)
      : null
    : null,
);

export const scrolledToBottom: Writable<boolean> = writable(false);

export const postOptions = writable<PostOptions>({
  bannerVisible: true,
  customBannerUrl: null,
  stickyMenu: true,
  fullWidth: false,
});
