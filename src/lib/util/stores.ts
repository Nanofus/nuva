import { type Writable, writable } from "svelte/store";
import { LOCALSTORAGE_AUTH_KEY } from "$lib/config";
import { browser } from "$app/environment";
import type { AuthInfo, PostOptions } from "$lib/util/types";

export const loginInfo: Writable<AuthInfo | null> = writable(
  browser
    ? localStorage.getItem(LOCALSTORAGE_AUTH_KEY)
      ? JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH_KEY) as string)
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
