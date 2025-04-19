import type { ClientConfig } from '$lib/types';

export const clientConfig: ClientConfig = {
  bottomScrollThreshold: 100,
  localStorageAuthKey: 'auth',
  localStorageSettingsKey: 'settings',
  defaultVolume: 50,
  musicFadeSpeed: 1,
  locale: 'fi-FI',
  siteName: 'Klaanon',
  subHeader: 'Bio-Klaanin yhteinen tarina',
  copyright: '© Klaanon',
  urls: {
    soundtracks: 'https://arkisto.klaanon.fi/soundtracks/',
    writingGuide: '/posts/muotoiluopas',
    commentEdit: 'https://wp.klaanon.fi/wp/wp-admin/comment.php?action=editcomment&c=',
    postEdit: 'https://wp.klaanon.fi/wp/wp-admin/post.php?post={ID}&action=edit',
    writing: 'https://wp.klaanon.fi/wp/wp-admin/edit.php',
    feedback: 'https://discord.com/channels/1043556208700833792/1131238873024966809',
    about: 'https://klaanon.fi/posts/meista'
  },
  externalStylesheets: [
    'https://meri.klaanon.fi/fonts/fontit.css',
    'https://meri.klaanon.fi/fonts/font_class.css'
  ],
  baseUrl: 'https://klaanon.fi',
  defaultFeaturedImage: 'https://s3.eu-north-1.amazonaws.com/meri.klaanon.fi/matorotbs/kaupunki_pelkaa_minua_olen_nahnyt_sen_naamion_alle+%E2%80%93+kopio.png',
  banners: [
    'https://meri.klaanon.fi/snowie/Oheiset/bigger-rastas-10-w.png'
  ],
  defaultYearFeaturedImage: 'https://meri.klaanon.fi/matorotbs/Saalistajat/sotaomppuromaani2.png',
  years: [
    {
      year: 2025,
      featuredImage: 'https://meri.klaanon.fi/matorotbs/Saalistajat/sotaomppuromaani2.png'
    },
    {
      year: 2024,
      featuredImage: null
    },
    {
      year: 2023,
      featuredImage: null
    },
    {
      year: 2022,
      featuredImage: null
    },
    {
      year: 2021,
      featuredImage: null
    },
    {
      year: 2020,
      featuredImage: null
    },
    {
      year: 2019,
      featuredImage: null
    },
    {
      year: 2018,
      featuredImage: null
    },
    {
      year: 2017,
      featuredImage: null
    },
    {
      year: 2016,
      featuredImage: null
    },
    {
      year: 2015,
      featuredImage: null
    },
    {
      year: 2014,
      featuredImage: null
    },
    {
      year: 2013,
      featuredImage: null
    },
    {
      year: 2012,
      featuredImage: null
    },
    {
      year: 2011,
      featuredImage: null
    },
    {
      year: 2010,
      featuredImage: null
    }
  ]
};
