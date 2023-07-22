import type { Hierarchical, PostMeta } from "$lib/types";
import {
  BANNER_COUNT,
  BASE_PATH,
  CATEGORIES_EXCLUDED_FROM_ALL_POSTS,
  DEFAULT_VOLUME,
  GLOBAL_OBJECT_NAME,
  LOCALSTORAGE_SETTINGS_KEY,
  SITE_NAME,
  SITE_NAME_DELIMITER
} from "$lib/config";
import { browser } from "$app/environment";

export const toastThemes = {
  error: {
    theme: {
      "--toastBackground": "var(--error-background)"
    }
  },
  success: {
    theme: {
      "--toastBackground": "var(--success-background)"
    }
  },
  info: {
    theme: {
      "--toastBackground": "var(--info-background)"
    }
  }
};

export const filterExcludedCategories = (posts: PostMeta[]) => {
  return posts.filter(post => !post.categories
    .map(cat => cat.slug)
    .some(slug => CATEGORIES_EXCLUDED_FROM_ALL_POSTS.includes(slug))
  );
};

export const objectsToHierarchy = (arr: Hierarchical[]) => {
  let arrMap = new Map(arr.map((item: Hierarchical) => [item._id, item]));
  let tree: Hierarchical[] = [];

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];

    if (item._parentId) {
      let parentItem = arrMap.get(item._parentId);

      if (parentItem) {
        let { children } = parentItem;

        if (children) {
          parentItem.children.push(item);
        } else {
          parentItem.children = [item];
        }
      }
    } else {
      tree.push(item);
    }
  }

  return tree;
};

export const getPageTitle = (title: string) => {
  return title ? `${title} ${SITE_NAME_DELIMITER} ${SITE_NAME}` : SITE_NAME;
};

export const getPageUrl = (slug: string) => {
  return `${BASE_PATH}/${slug}`;
};

export const formatSecondsToMMSS = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsRemainder = Math.floor(seconds % 60);
  return `${minutes}:${secondsRemainder < 10 ? "0" : ""}${secondsRemainder}`;
};

export const getRandomBannerUrl = (seed = 0) => {
  return `url("/images/banners/banner-${((new Date().getMinutes() + seed) % BANNER_COUNT) + 1}.png")`;
};

export const initGlobalScope = () => {
  if (!browser) return;
  if (window[GLOBAL_OBJECT_NAME]) return;
  // @ts-ignore
  window[GLOBAL_OBJECT_NAME] = {};
  window[GLOBAL_OBJECT_NAME]["saveSetting"] = saveSetting;
  window[GLOBAL_OBJECT_NAME]["loadSetting"] = loadSetting;
};
export const cleanGlobalScope = () => {
  if (!browser) return;
  if (window[GLOBAL_OBJECT_NAME].onPostDestroy) window[GLOBAL_OBJECT_NAME].onPostDestroy();
  delete window[GLOBAL_OBJECT_NAME];
};

export const createBaseSettings = () => {
  if (browser && !localStorage.getItem(LOCALSTORAGE_SETTINGS_KEY)) {
    localStorage.setItem(LOCALSTORAGE_SETTINGS_KEY, JSON.stringify({
      volume: DEFAULT_VOLUME
    }));
  }
};

export const saveSetting = (key: string, value: any) => {
  if (browser) {
    const settings = JSON.parse(<string>localStorage.getItem(LOCALSTORAGE_SETTINGS_KEY));
    settings[key] = value;
    localStorage.setItem(LOCALSTORAGE_SETTINGS_KEY, JSON.stringify(settings));
  }
};

export const loadSetting = (key: string) => {
  if (browser) {
    if (localStorage.getItem(LOCALSTORAGE_SETTINGS_KEY)) {
      return JSON.parse(<string>localStorage.getItem(LOCALSTORAGE_SETTINGS_KEY))[key];
    }
  }
  return null;
};
