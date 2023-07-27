import type { Hierarchical, PostMeta } from "$lib/util/types";
import {
	BANNER_COUNT,
	BASE_PATH,
	BOTTOM_SCROLL_THRESHOLD,
	CATEGORIES_EXCLUDED_FROM_ALL_POSTS,
	DEFAULT_VOLUME,
	GLOBAL_OBJECT_NAME,
	LOCALSTORAGE_SETTINGS_KEY,
	SITE_NAME,
	SITE_NAME_DELIMITER,
} from "$lib/config";
import { browser } from "$app/environment";
import { scrolledToBottom } from "$lib/util/stores";

export class CodeError extends Error {
	private readonly code: number;

	constructor(message: string, code: number) {
		super(message);
		this.code = code;
	}
}

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
				.some((slug) => CATEGORIES_EXCLUDED_FROM_ALL_POSTS.includes(slug))
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

export const handleScrolledToBottom = () => {
	if (!browser) {
		return;
	}

	const documentHeight = document.body.scrollHeight;
	const currentScroll = window.scrollY + window.innerHeight;
	scrolledToBottom.set(currentScroll + BOTTOM_SCROLL_THRESHOLD > documentHeight);
};

export const getPageTitle = (title: string) =>
	title ? `${title} ${SITE_NAME_DELIMITER} ${SITE_NAME}` : SITE_NAME;

export const getPageUrl = (slug: string) => `${BASE_PATH}/${slug}`;

export const formatSecondsToMMSS = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const secondsRemainder = Math.floor(seconds % 60);
	return `${minutes}:${secondsRemainder < 10 ? "0" : ""}${secondsRemainder}`;
};

export const getRandomBannerUrl = (seed = 0) =>
	`url("/images/banners/banner-${((new Date().getMinutes() + seed) % BANNER_COUNT) + 1}.png")`;

export const initGlobalScope = () => {
	if (!browser) {
		return;
	}

	if (window[GLOBAL_OBJECT_NAME]) {
		return;
	}

	// @ts-expect-error Let's assign to window anyway
	window[GLOBAL_OBJECT_NAME] = {};
	window[GLOBAL_OBJECT_NAME].saveSetting = saveSetting;
	window[GLOBAL_OBJECT_NAME].loadSetting = loadSetting;
};

export const cleanGlobalScope = () => {
	if (!browser) {
		return;
	}

	if (window[GLOBAL_OBJECT_NAME].onPostDestroy) {
		window[GLOBAL_OBJECT_NAME].onPostDestroy();
	}

	delete window[GLOBAL_OBJECT_NAME];
};

export const createBaseSettings = () => {
	if (browser && !localStorage.getItem(LOCALSTORAGE_SETTINGS_KEY)) {
		localStorage.setItem(
			LOCALSTORAGE_SETTINGS_KEY,
			JSON.stringify({
				volume: DEFAULT_VOLUME,
			})
		);
	}
};

export const saveSetting = (key: string, value: any) => {
	if (browser) {
		const settings = JSON.parse(localStorage.getItem(LOCALSTORAGE_SETTINGS_KEY)!);
		settings[key] = value;
		localStorage.setItem(LOCALSTORAGE_SETTINGS_KEY, JSON.stringify(settings));
	}
};

export const loadSetting = (key: string) => {
	if (browser) {
		if (localStorage.getItem(LOCALSTORAGE_SETTINGS_KEY)) {
			return JSON.parse(localStorage.getItem(LOCALSTORAGE_SETTINGS_KEY)!)[key];
		}
	}

	return null;
};
