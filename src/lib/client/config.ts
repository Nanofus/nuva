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
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2025.png'
    },
    {
      year: 2024,
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2024.png'
    },
    {
      year: 2023,
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2023.png'
    },
    {
      year: 2022,
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2022.png'
    },
    {
      year: 2021,
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2021.png'
    },
    {
      year: 2020,
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2020.png'
    },
    {
      year: 2019,
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2019.png'
    },
    {
      year: 2018,
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2018.png'
    },
    {
      year: 2017,
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2017.png'
    },
    {
      year: 2016,
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2016.png'
    },
    {
      year: 2015,
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2015.png'
    },
    {
      year: 2014,
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2014.png'
    },
    {
      year: 2013,
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2013.png'
    },
    {
      year: 2012,
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2012.png'
    },
    {
      year: 2011,
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2011.png'
    },
    {
      year: 2010,
      featuredImage: 'https://meri.klaanon.fi/bio-klaani/nuva/bannerit/2010.png'
    }
  ]
};
