import type { Localization } from '$lib/util/types';
import { globalConfig } from '$lib/util/config';

const translations: { [key: string]: Localization } = {
  'en-US': {
    common: {
      loadMore: 'Load more',
      edit: 'Edit',
      reply: 'Reply',
      comment: 'Comment',
      send: 'Send',
      close: 'Close',
      commentSingular: 'comment',
      commentPlural: 'comments'
    },
    toasts: {
      welcome: 'Welcome,',
      commentSent: 'Comment sent.',
      commentFailed: 'Sending comment failed.',
      loginFailed: 'Login failed.',
      loggedOut: 'You logged out.'
    },
    components: {
      commentForm: {
        emptyComment: 'Comment cannot be empty.'
      },
      commentList: {
        post: 'Post',
        date: 'Date',
        commenter: 'Commenter'
      },
      footer: {
        feedback: 'Feedback'
      },
      login: {
        fillBothFields: 'Fill both fields.',
        cantUseWithoutJs: 'Not usable without JavaScript.',
        login: 'Login',
        logout: 'Logout',
        username: 'Username',
        password: 'Password'
      },
      postContent: {
        validationError: 'Error in post HTML. See console for details.',
        noValidationError: 'Post HTML is valid.',
        scriptError: 'Error in post scripts. See console for details.',
        errorsCountSingular: 'error',
        errorsCountPlural: 'errors',
        notMobileFriendly: 'This post is not suitable for mobile reading.'
      },
      postList: {
        title: 'Title',
        date: 'Date',
        author: 'Poster'
      },
      search: {
        emptyField: 'Search field cannot be empty.',
        search: 'Search',
        searchTerms: 'Search terms'
      },
      navigation: {
        frontPage: 'Front Page',
        posts: 'Releases',
        tags: 'Tags',
        categories: 'Categories',
        search: 'Search',
        guide: 'Formatting Guide',
        soundtracks: 'Soundtracks',
        write: 'Write',
        login: 'Login',
        profile: 'Profile'
      }
    },
    settings: {
      user: 'User',
      volume: 'Audio Volume'
    },
    errors: {
      e401: 'Authentication failed.',
      e403: 'No access.',
      e404: 'Page not found.',
      e500: 'Something went wrong.'
    },
    webhooks: {
      newComment: 'New comment: '
    },
    pages: {
      index: {
        title: 'Front Page',
        newestReleases: 'Newest Releases',
        newestComments: 'Newest Comments'
      },
      error: {
        title: 'Error'
      },
      posts: {
        title: 'All Releases'
      },
      post: {
        noAccess: "Post not found or you don't have access to it."
      },
      tags: {
        title: 'Tags'
      },
      tag: {
        title: 'Tag'
      },
      search: {
        title: 'Search'
      },
      searchResults: {
        title: 'Search'
      },
      categories: {
        title: 'Categories'
      },
      category: {
        title: 'Category'
      },
      author: {
        title: 'Author'
      },
      profile: {
        title: 'Profile'
      }
    }
  },
  'fi-FI': {
    common: {
      loadMore: 'Lataa lisää',
      edit: 'Muokkaa',
      reply: 'Vastaa',
      comment: 'Kommentoi',
      send: 'Lähetä',
      close: 'Sulje',
      commentSingular: 'kommentti',
      commentPlural: 'kommenttia'
    },
    toasts: {
      welcome: 'Tervetuloa,',
      commentSent: 'Kommentti lähetetty.',
      commentFailed: 'Kommentin lähetys epäonnistui.',
      loginFailed: 'Kirjautuminen epäonnistui.',
      loggedOut: 'Kirjauduit ulos.'
    },
    components: {
      commentForm: {
        emptyComment: 'Kommentti ei voi olla tyhjä.'
      },
      commentList: {
        post: 'Postaus',
        date: 'Päiväys',
        commenter: 'Kommentoija'
      },
      footer: {
        feedback: 'Palaute'
      },
      login: {
        fillBothFields: 'Täytä molemmat kentät.',
        cantUseWithoutJs: 'Ei käytettävissä ilman JavaScriptia.',
        login: 'Kirjaudu sisään',
        logout: 'Kirjaudu ulos',
        username: 'Käyttäjätunnus',
        password: 'Salasana'
      },
      postContent: {
        validationError: 'Virhe postauksen HTML:ssä. Katso konsolista lisätietoja.',
        noValidationError: 'Postauksen HTML on kunnossa!',
        scriptError: 'Virhe postauksen skripteissä. Katso konsolista lisätietoja.',
        errorsCountSingular: 'virhe',
        errorsCountPlural: 'virhettä',
        notMobileFriendly: 'Tämä postaus ei sovi mobiililla luettavaksi.'
      },
      postList: {
        title: 'Otsikko',
        date: 'Päiväys',
        author: 'Postaaja'
      },
      search: {
        emptyField: 'Hakukenttä ei voi olla tyhjä.',
        search: 'Hae',
        searchTerms: 'Hakusanat'
      },
      navigation: {
        frontPage: 'Etusivu',
        posts: 'Julkaisut',
        tags: 'Tagit',
        categories: 'Kategoriat',
        search: 'Haku',
        guide: 'Muotoiluopas',
        soundtracks: 'Soundtrackit',
        write: 'Kirjoita',
        login: 'Kirjaudu',
        profile: 'Profiili'
      }
    },
    settings: {
      user: 'Käyttäjä',
      volume: 'Äänenvoimakkuus'
    },
    errors: {
      e401: 'Autentikaatio epäonnistui.',
      e403: 'Pääsy estetty.',
      e404: 'Sivua ei löytynyt',
      e500: 'Jotain meni pieleen'
    },
    webhooks: {
      newComment: 'Uusi kommentti: '
    },
    pages: {
      index: {
        title: 'Etusivu',
        newestReleases: 'Uusimmat julkaisut',
        newestComments: 'Uusimmat kommentit'
      },
      error: {
        title: 'Virhe'
      },
      posts: {
        title: 'Kaikki julkaisut'
      },
      post: {
        noAccess: 'Postausta ei löytynyt tai sinulla ei ole pääsyä siihen.'
      },
      tags: {
        title: 'Tagit'
      },
      tag: {
        title: 'Tagi'
      },
      search: {
        title: 'Haku'
      },
      searchResults: {
        title: 'Haku'
      },
      categories: {
        title: 'Kategoriat'
      },
      category: {
        title: 'Kategoria'
      },
      author: {
        title: 'Kirjoittaja'
      },
      profile: {
        title: 'Profiili'
      }
    }
  }
};

export const t = translations[globalConfig.locale];
