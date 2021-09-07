import { ROUTES, SVG_IMAGES_TYPES } from 'utils/constants';

export const footerData = [
  {
    title: 'Contact us in USA',
    links: [
      {
        subtitle: '44 Tehama St San Francisco,\nCA 94105',
      },
      {
        subtitle: '+1 (415) 670-90-70',
        path: 'tel:+14156709070',
        type: 'phone',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        subtitle: ROUTES.portfolio.title,
        path: ROUTES.portfolio.path,
        type: 'navigation',
      },
      {
        subtitle: ROUTES.process.title,
        path: ROUTES.process.path,
        type: 'navigation',
      },
      {
        subtitle: ROUTES.blog.title,
        path: ROUTES.blog.path,
        type: 'navigation',
      },
    ],
  },
  {
    title: 'Services',
    links: [
      {
        subtitle: 'Web app development',
        path: ROUTES.customWebApp.path,
        type: 'navigation',
      },
      {
        subtitle: 'Mobile app development',
        path: ROUTES.customMobileApp.path,
        type: 'navigation',
      },
      {
        subtitle: 'Custom chat app development',
        path: ROUTES.customChatApp.path,
        type: 'navigation',
      },
    ],
  },
  {
    title: 'Find us in Europe',
    links: [
      {
        title: 'Belarus',
        subtitle: '5-303 Nemiga St. Minsk 220030',
      },
      {
        subtitle: '+375 (29) 311-52-49',
        path: 'tel:+375293115249',
        type: 'phone',
      },
      {
        subtitle: 'hi@yellow.systems',
        path: 'mailto:hi@yellow.systems',
        type: 'email',
      },
    ],
  },
  {
    title: '\xa0',
    links: [
      {
        title: 'Poland',
        subtitle: 'Warszawa 00-8P55 \nGrzybowska 62',
      },
    ],
  },
  {
    title: '\xa0',
    links: [
      {
        title: 'Ukraine',
        subtitle: 'Kyiv 01024 \nKruglouniversytetska St. 7',
      },
    ],
  },
];

// export const UsaContacts = {
//   address: '44 Tehama St San Francisco, CA 94105',
//   telephone: '+1 (415) 670-90-70',
// };

// export const EuropeContacts = [
//   {
//     country: 'Belarus',
//     address: '5-303 Nemiga St. Minsk 220030',
//     telephone: '+375 (29) 311-52-49',
//     email: 'hi@yellow.systems',
//   },
//   {
//     country: 'Poland',
//     address: 'Warszawa 00-8P55 Grzybowska 62',
//   },
//   {
//     country: 'Ukraine',
//     address: 'Kyiv 02000 Bilomorska St',
//   },
// ];

// export const footerLinks = [
//   {
//     title: 'Company',
//     links: [
//       {
//         title: ROUTES.portfolio.title,
//         slug: ROUTES.portfolio.path,
//       },
//       {
//         title: ROUTES.process.title,
//         slug: ROUTES.process.path,
//       },
//       {
//         title: ROUTES.blog.title,
//         slug: ROUTES.blog.path,
//       },
//     ],
//   },
//   {
//     title: 'Services',
//     links: [
//       {
//         title: 'Web app development',
//         slug: ROUTES.customWebApp.path,
//       },
//       {
//         title: 'Mobile app development',
//         slug: ROUTES.customMobileApp.path,
//       },
//       {
//         title: 'Custom chat app development',
//         slug: ROUTES.customChatApp.path,
//       },
//     ],
//   },
// ];

export const socialMedia = [
  {
    title: 'LinkedIn',
    type: SVG_IMAGES_TYPES.linkedinRoundBlack,
    link: '//www.linkedin.com/company/yellow-systems',
  },
  {
    title: 'Twitter',
    type: SVG_IMAGES_TYPES.twitterRoundBlack,
    link: '//mobile.twitter.com/yellow_systems',
  },
  {
    title: 'Dribble',
    type: SVG_IMAGES_TYPES.dribbleRoundBlack,
    link: '//dribbble.com/yellow_systems',
  },
  {
    title: 'Medium',
    type: SVG_IMAGES_TYPES.mediumRoundBlack,
    link: '//medium.com/@yellow',
  },
  {
    title: 'Instagram',
    type: SVG_IMAGES_TYPES.instaRoundBlack,
    link: '//www.instagram.com/yellow.systems',
  },
];
