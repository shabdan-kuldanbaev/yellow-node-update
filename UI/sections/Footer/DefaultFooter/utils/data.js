import { ROUTES } from 'utils/constants';
import { SOCIAL_MEDIA } from 'utils/constants/contacts';

export const mainContent = [
  {
    title: 'Services',
    type: 'services',
    links: [
      {
        subtitle: 'Web development',
        path: ROUTES.customWebApp.path,
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
        subtitle: 'Quality assurance',
        path: ROUTES.softwareQualityAssuranceServices.path,
        type: 'navigation',
      },
      {
        subtitle: 'Penetration testing',
        path: ROUTES.penetrationTesting.path,
        type: 'navigation',
      },
      {
        subtitle: 'Cloud development',
        path: ROUTES.cloudDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'PWA development',
        path: ROUTES.pwaDevelopmentServices.path,
        type: 'navigation',
      },
      {
        subtitle: 'Software prototyping',
        path: ROUTES.prototypingServices.path,
        type: 'navigation',
      },
    ],
  },
  {
    title: 'Fintech',
    type: 'fintech',
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
      {
        subtitle: 'E-wallet app development',
        path: ROUTES.eWalletAppDevelopment.path,
        type: 'navigation',
      },
      {
        subtitle: 'Banking software development',
        path: ROUTES.bankingSoftwareDevelopmentCompany.path,
        type: 'navigation',
      },
      {
        subtitle: 'Crowdfunding platform development',
        path: ROUTES.crowdfundingPlatform.path,
        type: 'navigation',
      },
    ],
  },
  {
    title: 'Expertise',
    type: 'expertise',
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
];

export const socialMedia = Object.values(SOCIAL_MEDIA).filter((item) => item.id !== 'medium');
