import type { Hierarchical, PostMeta } from "$lib/util/types";
import { globalConfig, localConfig } from "$lib/util/config";
import { browser } from "$app/environment";
import { scrolledToBottom } from "$lib/util/stores";

export const toastSettings = {
  error: {
    theme: {
      "--toastBackground": "var(--error-background)",
    },
    initial: 0,
    dismissable: true,
  },
  success: {
    theme: {
      "--toastBackground": "var(--success-background)",
    },
    dismissable: false,
  },
  info: {
    theme: {
      "--toastBackground": "var(--info-background)",
    },
    dismissable: false,
  },
};

export const filterExcludedCategories = (posts: PostMeta[]) =>
  posts.filter(
    (post) =>
      !post.categories
        .map((cat) => cat.slug)
        .some((slug) => globalConfig.categoriesExcludedFromAllPosts.includes(slug)),
  );

export const objectsToHierarchy = (arr: Hierarchical[]) => {
  const arrMap = new Map(arr.map((item: Hierarchical) => [item._id, item]));
  const tree: Hierarchical[] = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    if (item._parentId) {
      const parentItem = arrMap.get(item._parentId);

      if (parentItem) {
        const { children } = parentItem;

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

export const handleViewportResize = () => {
  if (!browser) return;
  const scroller = document.scrollingElement as HTMLElement;
  document
    .querySelector<HTMLElement>(":root")
    ?.style.setProperty("--scrollbar-width", `${window.innerWidth - scroller.clientWidth}px`);
  if (!window.visualViewport) return;
  document
    .querySelector<HTMLElement>(":root")
    ?.style.setProperty(
      "--bleed-buffer",
      `${
        Math.round((window.visualViewport.width + Number.EPSILON) * 100) / 100 -
        scroller.clientWidth
      }px`,
    );
};

export const handleScrolledToBottom = () => {
  if (!browser) {
    return;
  }

  const documentHeight = document.body.scrollHeight;
  const currentScroll = window.scrollY + window.innerHeight;
  scrolledToBottom.set(currentScroll + localConfig.bottomScrollThreshold > documentHeight);
};

export const getPageTitle = (title: string) =>
  title ? `${title} – ${globalConfig.siteName}` : globalConfig.siteName;

export const getPageUrl = (route: string) => `${globalConfig.baseUrl}/${route}`;

export const formatSecondsToMMSS = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsRemainder = Math.floor(seconds % 60);
  return `${minutes}:${secondsRemainder < 10 ? "0" : ""}${secondsRemainder}`;
};

export const stripHtml = (html: string) => {
  return html.replace(/<(.|\n)*?>/g, "");
};

export const getRandomBannerUrl = (seed = 0) =>
  `url("/images/banners/banner-${
    ((new Date().getMinutes() + seed) % globalConfig.bannerCount) + 1
  }.png")`;

const globalObjectName = <keyof Window>localConfig.globalObjectName;

export const initGlobalScope = () => {
  if (!browser || window[globalObjectName]) {
    return;
  }

  window[globalObjectName] = <never>{};
  window[globalObjectName].saveSetting = saveSetting;
  window[globalObjectName].loadSetting = loadSetting;
};

export const cleanGlobalScope = () => {
  if (!browser) {
    return;
  }

  if (window[globalObjectName]["onPostDestroy"]) {
    window[globalObjectName]["onPostDestroy"]();
  }

  delete window[globalObjectName];
};

export const createBaseSettings = () => {
  if (browser && !localStorage.getItem(localConfig.localStorageSettingsKey)) {
    localStorage.setItem(
      localConfig.localStorageSettingsKey,
      JSON.stringify({
        volume: localConfig.defaultVolume,
      }),
    );
  }
};

export const saveSetting = (key: string, value: any) => {
  if (browser) {
    const settings = JSON.parse(localStorage.getItem(localConfig.localStorageSettingsKey)!);
    settings[key] = value;
    localStorage.setItem(localConfig.localStorageSettingsKey, JSON.stringify(settings));
  }
};

export const loadSetting = (key: string) => {
  if (browser) {
    if (localStorage.getItem(localConfig.localStorageSettingsKey)) {
      return JSON.parse(localStorage.getItem(localConfig.localStorageSettingsKey)!)[key];
    }
  }

  return null;
};
