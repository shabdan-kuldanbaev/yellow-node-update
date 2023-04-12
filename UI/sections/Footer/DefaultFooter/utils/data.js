import { ROUTES, SVG_IMAGES_TYPES } from 'utils/constants';

export const mainContent = [
  {
    title: 'Services',
    links: [
      {
        subtitle: 'Web development',
        path: ROUTES.customWebApp.path,
        type: 'navigation',
      },
      {
        subtitle: 'Crowdfunding Platform Development Company',
        path: ROUTES.crowdfundingPlatform.path,
        type: 'navigation',
      },
      {
        subtitle: 'Mobile development',
        path: ROUTES.customMobileApp.path,
        type: 'navigation',
      },
      {
        subtitle: 'iOS app development',
        path: ROUTES.developmentServices.path,
        type: 'navigation',
      },
      {
        subtitle: 'Android app development',
        path: ROUTES.androidDevelopmentServices.path,
        type: 'navigation',
      },
      {
        subtitle: 'Cross-platform \n development company',
        path: ROUTES.crossPlatformDevelopmentServices.path,
        type: 'navigation',
      },
      {
        subtitle: 'UX/UI design',
        path: ROUTES.designServices.path,
        type: 'navigation',
      },
      {
        subtitle: 'MVP development',
        path: ROUTES.mvpDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'DevOps',
        path: ROUTES.devOpsDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'Cloud development',
        path: ROUTES.cloudDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'Software prototyping',
        path: ROUTES.prototypingServices.path,
        type: 'navigation',
      },
    ],
    type: 'services',
  },
  {
    title: 'Fintech',
    links: [
      {
        subtitle: 'Fintech software development',
        path: ROUTES.fintechDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'Trading platform development',
        path: ROUTES.tradingSoftwareDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'Lending software development',
        path: ROUTES.lendingSoftwareDevelopment.path,
        type: 'navigation',
      },
    ],
    type: 'fintech',
  },
  {
    title: 'Expertise',
    links: [
      {
        subtitle: 'Chat development',
        path: ROUTES.customChatApp.path,
        type: 'navigation',
      },
      {
        subtitle: 'Mobile development',
        path: ROUTES.customMobileApp.path,
        type: 'navigation',
      },
      {
        subtitle: 'ERP development',
        path: ROUTES.erpDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'Machine learning development',
        path: ROUTES.mlDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'AI software development',
        path: ROUTES.aiDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'Data science development',
        path: ROUTES.dataScienceDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'Discovery phase',
        path: ROUTES.discoveryPhase.path,
        type: 'navigation',
      },
    ],
    type: 'expertise',
  },
];

export const addresses = [
  {
    title: 'In USA',
    text: '44 Tehama St San Francisco, \n CA 94105',
    pathText: '+1 (302) 213-37-98',
    path: 'tel:+14156709070',
    type: 'phone',
  },
  {
    title: 'In Argentina',
    text: 'Av. Corrientes 1312,\n C1043 ABN \n Buenos Aires',
  },
  {
    title: 'In Poland',
    text: 'Warszawa 00-8P55 \n Grzybowska 62',
  },
  {
    title: 'In Israel',
    text: 'Ahad Ha’Am 9 \n Tel Aviv',
  },
];

export const companyLinks = [
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
  {
    subtitle: ROUTES.deliveryQualityInYellow.title,
    path: ROUTES.deliveryQualityInYellow.path,
    type: 'navigation',
  },
];

export const socialMedia = [
  {
    title: 'LinkedIn',
    type: SVG_IMAGES_TYPES.linkedinFilledWhite,
    link: 'https://www.linkedin.com/company/yellow-systems',
  },
  {
    title: 'Twitter',
    type: SVG_IMAGES_TYPES.twitterFilledWhite,
    link: 'https://mobile.twitter.com/yellow_systems',
  },
  {
    title: 'Dribble',
    type: SVG_IMAGES_TYPES.dribbbleFilledWhite,
    link: 'https://dribbble.com/yellow_systems',
  },
  {
    title: 'Behance',
    type: SVG_IMAGES_TYPES.behanceFilledWhite,
    link: 'https://www.behance.net/yellow_systems',
  },
  {
    title: 'YouTube',
    type: SVG_IMAGES_TYPES.youtubeFilledWhite,
    link: 'https://www.youtube.com/@yellowsystems9900',
  },
  {
    title: 'Instagram',
    type: SVG_IMAGES_TYPES.instagramFilledWhite,
    link: 'https://www.instagram.com/yellow.systems/',
  },
];
