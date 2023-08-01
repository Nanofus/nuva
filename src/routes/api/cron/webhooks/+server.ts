export const GET = async () => {
  const response = fetch(import.meta.env.VITE_WEBHOOK_NEW_POST, {
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
      username: "Klaanon",
      attachments: [],
    }),
  });
  console.log(response);
  return new Response();
};
