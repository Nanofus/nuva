import type { Localization } from "$lib/util/types";

const translations: { [key: string]: Localization } = {
  "fi-FI": {
    common: {
      loadMore: "Lataa lisää",
      edit: "Muokkaa",
      reply: "Vastaa",
      comment: "Kommentoi",
      send: "Lähetä",
      close: "Sulje",
      commentSingular: "kommentti",
      commentPlural: "kommenttia",
    },
    toasts: {
      welcome: "Tervetuloa,",
      commentSent: "Kommentti lähetetty.",
      loginFailed: "Kirjautuminen epäonnistui.",
      loggedOut: "Kirjauduit ulos.",
    },
    components: {
      commentForm: {
        emptyComment: "Kommentti ei voi olla tyhjä.",
      },
      commentList: {
        post: "Postaus",
        date: "Päiväys",
        commenter: "Kommentoija",
      },
      footer: {
        feedback: "Palaute",
      },
      login: {
        fillBothFields: "Täytä molemmat kentät.",
        cantUseWithoutJs: "Ei käytettävissä ilman JavaScriptia.",
        login: "Kirjaudu sisään",
        logout: "Kirjaudu ulos",
        username: "Käyttäjätunnus",
        password: "Salasana",
      },
      postContent: {
        validationError: "Virhe postauksen HTML:ssä. Katso konsolista lisätietoja.",
        noValidationError: "Postauksen HTML:ssä ei virheitä!",
        scriptError: "Virhe postauksen skripteissä. Katso konsolista lisätietoja.",
        errorsCountSingular: "virhe",
        errorsCountPlural: "virhettä",
        notMobileFriendly: "Tämä postaus ei sovi mobiililla luettavaksi.",
      },
      postList: {
        title: "Otsikko",
        date: "Päiväys",
        author: "Postaaja",
      },
      search: {
        emptyField: "Laitapa hakukenttään edes jotain.",
        search: "Hae",
        searchTerms: "Hakusanat",
      },
      navigation: {
        frontPage: "Etusivu",
        posts: "Julkaisut",
        tags: "Tagit",
        categories: "Kategoriat",
        search: "Haku",
        guide: "Muotoiluopas",
        soundtracks: "Soundtrackit",
        write: "Kirjoita",
        login: "Kirjaudu",
        profile: "Profiili",
      },
    },
    settings: {
      user: "Käyttäjä",
      volume: "Äänenvoimakkuus",
    },
    errors: {
      e401: "Autentikaatio epäonnistui.",
      e403: "Pääsy estetty.",
      e404: "Sivua ei löytynyt",
      e500: "Jotain meni pieleen",
    },
    pages: {
      index: {
        title: "Etusivu",
        newestReleases: "Uusimmat julkaisut",
        newestComments: "Uusimmat kommentit",
      },
      error: {
        title: "Virhe",
      },
      posts: {
        title: "Kaikki julkaisut",
      },
      post: {
        noAccess: "Postausta ei löytynyt tai sinulla ei ole pääsyä siihen.",
      },
      tags: {
        title: "Tagit",
      },
      tag: {
        title: "Tagi",
      },
      search: {
        title: "Haku",
      },
      searchResults: {
        title: "Haku",
      },
      categories: {
        title: "Kategoriat",
      },
      category: {
        title: "Kategoria",
      },
      author: {
        title: "Kirjoittaja",
      },
      profile: {
        title: "Profiili",
      },
    },
  },
};

export const t = translations["fi-FI"];
