import type { Config, LocalConfig } from "$lib/util/types";

export const localConfig: LocalConfig = {
  bottomScrollThreshold: 100,
  localStorageAuthKey: "auth",
  localStorageSettingsKey: "settings",
  globalObjectName: "globals",
  defaultVolume: 50,
  musicFadeSpeed: 1,
};

export const globalConfig: Config = {
  apiPath: "https://klaanon.fi/wp/graphql",
  maxPerFetch: 100,
  latestPostsPerFetch: 20,
  latestCommentsPerFetch: 10,
  locale: "fi-FI",
  siteName: "Klaanon",
  subHeader: "Bio-Klaanin yhteinen tarina",
  copyright: "© Klaanon",
  categoriesExcludedFromAllPosts: ["meta", "muu-roska"],
  bannerCount: 1,
  soundtracksUrl: "https://arkisto.klaanon.fi/soundtracks/",
  writingGuideUrl: "/posts/muotoiluopas",
  commentEditUrl: "https://klaanon.fi/wp/wp-admin/comment.php?action=editcomment&c=",
  writingUrl: "https://klaanon.fi/wp/wp-admin/edit.php",
  feedbackUrl: "https://discord.com/channels/1043556208700833792/1131238873024966809",
};
