import { ROUTES } from 'utils/constants';

export const footerData = [
  {
    title: 'Find us',
    links: [
      {
        title: 'In USA',
        subtitle: '44 Tehama St San Francisco,\nCA 94105',
      },
      {
        subtitle: '+1 (415) 670-90-70',
        path: 'tel:+14156709070',
        type: 'phone',
      },
      {
        title: 'In Israel',
        subtitle: 'Ahad Ha’Am 9\nTel Aviv',
      },
      {
        title: 'In Argentina',
        subtitle: 'Av. Corrientes 1312, C1043 ABN\nBuenos Aires',
      },
      {
        title: 'In Poland',
        subtitle: 'Warszawa 00-8P55 \nGrzybowska 62',
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
      {
        subtitle: 'iOS app development services',
        path: ROUTES.developmentServices.path,
        type: 'navigation',
      },
      {
        subtitle: 'Android app development services',
        path: ROUTES.androidDevelopmentServices.path,
        type: 'navigation',
      },
      {
        subtitle: 'MVP development services',
        path: ROUTES.mvpDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'Fintech software development Services',
        path: ROUTES.fintechDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'Cloud-based app development services',
        path: ROUTES.cloudDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'Machine learning development services',
        path: ROUTES.mlDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'DevOps development services',
        path: ROUTES.devOpsDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'AI software development services',
        path: ROUTES.aiDevelopment.path,
        type: 'navigation',
      },
    ],
    type: 'services',
  },
];
