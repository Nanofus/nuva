import { type Writable, writable } from "svelte/store";
import { LOCALSTORAGE_AUTH_KEY } from "$lib/config";
import { browser } from "$app/environment";
import type { AuthData, PostOptions } from "$lib/util/types";

export const auth: Writable<AuthData> = writable(
  browser
    ? localStorage.getItem(LOCALSTORAGE_AUTH_KEY)
      ? JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH_KEY)!)
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
