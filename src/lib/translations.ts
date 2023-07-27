const TRANSLATIONS_FI = {
	siteName: 'Klaanon',
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
	components: {
		commentForm: {
			emptyComment: 'Kommentti ei voi olla tyhjä'
		},
		commentList: {
			post: 'Postaus',
			date: 'Päiväys',
			commenter: 'Kommentoija'
		},
		comment: {
			editUrl: 'https://klaanon.fi/wp/wp-admin/comment.php?action=editcomment&c='
		},
		footer: {
			copyright: '© Klaanon',
			feedback: 'Palaute',
			feedbackLink: 'https://discord.com/channels/1043556208700833792/1131238873024966809'
		},
		header: {
			subheader: 'Bio-Klaanin yhteinen tarina'
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
			noValidationError: 'Postauksen HTML:ssä ei virheitä!',
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
			emptyField: 'Laitapa hakukenttään edes jotain.',
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
			guideUrl: '/posts/muotoiluopas',
			soundtracks: 'Soundtrackit',
			soundtracksUrl: 'https://arkisto.klaanon.fi/soundtracks/',
			write: 'Kirjoita',
			writeUrl: 'https://klaanon.fi/wp/wp-admin/edit.php',
			login: 'Kirjaudu',
			profile: 'Profiili'
		}
	},
	settings: {
		user: 'Käyttäjä',
		volume: 'Äänenvoimakkuus'
	},
	errors: {
		e404: 'Sivua ei löytynyt',
		e500: 'Jotain meni pieleen'
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
};

export const t = TRANSLATIONS_FI;
