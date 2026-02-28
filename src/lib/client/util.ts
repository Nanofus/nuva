import type { HierarchicalWithDate } from '$lib/types';
import { clientConfig } from '$lib/client/config';
import { browser } from '$app/environment';
import { scrolledToBottom } from '$lib/client/stores';

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

export const handleViewportResize = () => {
  if (!browser) return;
  let scrollbarWidth;
  try {
    scrollbarWidth = viewport.segments[0].width - visualViewport.width;
  } catch (e) {
    scrollbarWidth = 0;
    console.warn("The %cViewport%c interface is not supported.", "background-color: rgba(0,0,0,0.25)", "");
  } finally {
    document
      .querySelector<HTMLElement>(':root')
      ?.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }
  /*
  const scroller = document.scrollingElement as HTMLElement;
  document
    .querySelector<HTMLElement>(':root')
    ?.style.setProperty('--scrollbar-width', `${window.innerWidth - scroller.clientWidth}px`);
  if (!window.visualViewport) return;
  */
  /*
    document
      .querySelector<HTMLElement>(':root')
      ?.style.setProperty(
        '--bleed-buffer',
        `${Math.round((window.visualViewport.width + Number.EPSILON) * 100) / 100 - scroller.clientWidth}px`
      );
  */
};

export const handleScrolledToBottom = () => {
  if (!browser) {
    return;
  }

  const documentHeight = document.body.scrollHeight;
  const currentScroll = window.scrollY + window.innerHeight;
  scrolledToBottom.set(currentScroll + clientConfig.bottomScrollThreshold > documentHeight);
};

export const getPageTitle = (title: string) =>
  title ? `${title} – ${clientConfig.siteName}` : clientConfig.siteName;

export const getPageUrl = (route: string) => `${clientConfig.baseUrl}/${route}`;

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
  `url("${clientConfig.banners[Math.floor((new Date().getMinutes() + seed) * clientConfig.banners.length) % clientConfig.banners.length]}")`;

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
  if (browser && !localStorage.getItem(clientConfig.localStorageSettingsKey)) {
    localStorage.setItem(
      clientConfig.localStorageSettingsKey,
      JSON.stringify({
        volume: clientConfig.defaultVolume
      })
    );
  }
};

export const saveSetting = (key: string, value: any) => {
  if (browser) {
    const settings = JSON.parse(localStorage.getItem(clientConfig.localStorageSettingsKey)!);
    settings[key] = value;
    localStorage.setItem(clientConfig.localStorageSettingsKey, JSON.stringify(settings));
  }
};

export const loadSetting = (key: string) => {
  if (browser) {
    if (localStorage.getItem(clientConfig.localStorageSettingsKey)) {
      return JSON.parse(localStorage.getItem(clientConfig.localStorageSettingsKey)!)[key];
    }
  }

  return null;
};

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
