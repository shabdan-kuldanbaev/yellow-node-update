import { ROUTES } from 'utils/constants';
import {
  PHONE_NUMBER,
  PLACEMENT_DATA,
  SOCIAL_MEDIA,
} from 'utils/constants/contacts';

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
        subtitle: 'Crowdfunding platform development',
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
        path: ROUTES.iosDevelopmentServices.path,
        type: 'navigation',
      },
      {
        subtitle: 'Android app development',
        path: ROUTES.androidDevelopmentServices.path,
        type: 'navigation',
      },
      {
        subtitle: 'Cross-platform development',
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
    text: PLACEMENT_DATA.USA.join('\n'),
    pathText: PHONE_NUMBER.us,
    path: `tel:${PHONE_NUMBER.us}`,
    type: 'phone',
  },
  {
    title: 'In Argentina',
    text: PLACEMENT_DATA.Argentina.join('\n'),
  },
  {
    title: 'In Poland',
    text: PLACEMENT_DATA.Poland.join('\n'),
  },
  {
    title: 'In Israel',
    text: PLACEMENT_DATA.Israel.join('\n'),
  },
];

export const companyLinks = [
  {
    subtitle: ROUTES.deliveryQualityInYellow.title,
    path: ROUTES.deliveryQualityInYellow.path,
    type: 'navigation',
  },
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
];

export const socialMedia = Object.values(SOCIAL_MEDIA).filter((item) => item.id !== 'medium');
