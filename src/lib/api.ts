export const getPostBySlug = async (slug: string) => {
    return (await fetch('https://klaanon.fi/wp/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query PostBySlug {
                postBy(slug: "${slug}") {
                    content
                    additionalFields {
                        authorgroup
                        featuredimage
                        initialletter
                        scripts
                        styles
                        theme
                    }
                }
            }
            `,
        }),
    })).json();
}
