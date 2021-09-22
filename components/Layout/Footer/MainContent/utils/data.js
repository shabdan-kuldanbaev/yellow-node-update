import { ROUTES } from 'utils/constants';

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
    type: 'usaAddress',
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
    type: 'company',
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
      {
        subtitle: 'UI/UX design services',
        path: ROUTES.designServices.path,
        type: 'navigation',
      },
    ],
    type: 'sevices',
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
    type: 'belarusAddress',
  },
  {
    title: '\xa0',
    links: [
      {
        title: 'Poland',
        subtitle: 'Warszawa 00-8P55 \nGrzybowska 62',
      },
    ],
    type: 'polandAddress',
  },
  {
    title: '\xa0',
    links: [
      {
        title: 'Ukraine',
        subtitle: 'Kyiv 01024 \nKruglouniversytetska St. 7',
      },
    ],
    type: 'ukraineAddress',
  },
];
