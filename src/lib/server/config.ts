import type { ServerConfig } from '$lib/types';

export const serverConfig: ServerConfig = {
  graphqlApi: 'https://wp.klaanon.fi/wp/graphql',
  maxPerFetch: 2500,
  latestPostsPerFetch: 20,
  latestCommentsPerFetch: 10,
  categoriesExcludedFromAllPosts: [
    'meta',
    'muu-roska'
  ],
  webhooks: {
    newPost: [
      {
        url: import.meta.env.VITE_WEBHOOK_URL,
        contentText: '<@&427145052276391937>',
        color: 9364469,
        icon: 'https://klaanon.fi/favicon.png'
      }
    ],
    newComment: [
      {
        url: import.meta.env.VITE_WEBHOOK_URL,
        contentText: '',
        color: 9760685,
        icon: 'https://klaanon.fi/favicon.png'
      }
    ]
  }
};