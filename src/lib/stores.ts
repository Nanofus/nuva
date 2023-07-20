import { writable } from "svelte/store";
import { LOCALSTORAGE_AUTH_KEY } from "$lib/config";
import { browser } from "$app/environment";

export const loginInfo = writable(
  browser
    ? localStorage.getItem(LOCALSTORAGE_AUTH_KEY)
      ? JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH_KEY) as string)
      : null
    : null
);

export const postOptions = writable<{
  bannerVisible: boolean;
  customBannerUrl: string | null;
  stickyMenu: boolean;
}>({
  bannerVisible: true,
  customBannerUrl: null,
  stickyMenu: false
});
