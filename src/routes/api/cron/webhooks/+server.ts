import { globalConfig } from "$lib/util/config";

export const GET = async () => {
  for (const hook in globalConfig.webhooks.newPost) {
    const response = fetch(hook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: null,
        embeds: [
          {
            title: "Testi-klaanon-osa",
            description: "Kepe yskäisi.",
            color: 5814783,
            author: {
              name: "Kerosiinipelle",
            },
          },
        ],
        username: globalConfig.siteName,
        attachments: [],
      }),
    });
    console.log(response);
  }
  return new Response();
};
