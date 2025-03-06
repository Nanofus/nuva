import type { Hierarchical, PostMeta } from '$lib/util/types';
import { getConfig, localConfig } from '$lib/util/config';
import { browser } from '$app/environment';
import { scrolledToBottom } from '$lib/util/stores';

export const toastSettings = {
  error: {
    theme: {
      '--toastBackground': 'var(--error-background)'
    },
    initial: 0,
    dismissable: true
  },
  success: {
    theme: {
      '--toastBackground': 'var(--success-background)'
    },
    dismissable: false
  },
  info: {
    theme: {
      '--toastBackground': 'var(--info-background)'
    },
    dismissable: false
  }
};

export const filterExcludedCategories = (posts: PostMeta[]) =>
  posts.filter(
    (post) =>
      !post.categories
        .map((cat) => cat.slug)
        .some((slug) => getConfig().categoriesExcludedFromAllPosts.includes(slug))
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
    .querySelector<HTMLElement>(':root')
    ?.style.setProperty('--scrollbar-width', `${window.innerWidth - scroller.clientWidth}px`);
  if (!window.visualViewport) return;
  document
    .querySelector<HTMLElement>(':root')
    ?.style.setProperty(
      '--bleed-buffer',
      `${Math.round((window.visualViewport.width + Number.EPSILON) * 100) / 100 - scroller.clientWidth}px`
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
  title ? `${title} – ${getConfig().siteName}` : getConfig().siteName;

export const getPageUrl = (route: string) => `${getConfig().baseUrl}/${route}`;

export const formatSecondsToMMSS = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secondsRemainder = Math.floor(seconds % 60);
  return `${minutes}:${secondsRemainder < 10 ? '0' : ''}${secondsRemainder}`;
};

export const stripHtml = (html: string) => {
  return html.replace(/<(.|\n)*?>/g, '');
};

// Uses minutes so that the banner does not change after hydration
export const getRandomBannerUrl = (seed = 0) =>
  `url("${getConfig().banners[Math.floor((new Date().getMinutes() + seed) * getConfig().banners.length) % getConfig().banners.length]}")`;

export const initGlobalScope = () => {
  if (!browser || window.nuvaGlobal) {
    return;
  }
  window.nuvaGlobal = {
    onPostDestroy: undefined,
    saveSetting: saveSetting,
    loadSetting: loadSetting
  };
};

export const cleanGlobalScope = () => {
  if (!browser) {
    return;
  }
  if (window.nuvaGlobal && window.nuvaGlobal.onPostDestroy) {
    window.nuvaGlobal.onPostDestroy();
  }
  delete window.nuvaGlobal;
};

export const createBaseSettings = () => {
  if (browser && !localStorage.getItem(localConfig.localStorageSettingsKey)) {
    localStorage.setItem(
      localConfig.localStorageSettingsKey,
      JSON.stringify({
        volume: localConfig.defaultVolume
      })
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

type HierarchicalWithDate = {
  date: Date;
} & Hierarchical;
export const recursivelyConvertDates = (arr: HierarchicalWithDate[]) => {
  return arr.map((item) => {
    if (item.date) {
      item.date = new Date(item.date);
    }
    if (item.children) {
      item.children = recursivelyConvertDates(<HierarchicalWithDate[]>item.children);
    }
    return item;
  });
};
