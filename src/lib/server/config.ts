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
        url: 'https://discord.com/api/webhooks/1135971231879938168/RZALlCnkru8bnsyC59Gusc5-FyrrZx3Fyi0YDQL5L9L6BTUwvo-x49DdrV19OB02LAJh',
        contentText: '<@&427145052276391937>',
        color: 9364469,
        icon: 'https://klaanon.fi/favicon.png'
      }
    ],
    newComment: [
      {
        url: 'https://discord.com/api/webhooks/1135971231879938168/RZALlCnkru8bnsyC59Gusc5-FyrrZx3Fyi0YDQL5L9L6BTUwvo-x49DdrV19OB02LAJh',
        contentText: '',
        color: 9760685,
        icon: 'https://klaanon.fi/favicon.png'
      }
    ]
  }
};