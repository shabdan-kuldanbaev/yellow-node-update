import { ROUTES } from 'utils/constants';
import { context, getPageUrl } from './utils';
import { logoUrl } from './data';

// TODO: Replace with actual data ASAP
export const deprecatedData = {
  [ROUTES.softwareDevelopmentPrice.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'Pricing: Hire a Team for Your Project | Yellow',
    description: `Calculate how much money you will need to build your software.
    We only bill for the time actually spent on work, so it's easy to manage the budget. No extra fees.`,
    image: logoUrl,
  },

  [ROUTES.penetrationTesting.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'Penetration testing  | Yellow',
    description: 'Use penetration testing to make sure your software solution is safe for your users. '
    + 'Yellow will provide you with penetration testing services.',
    image: logoUrl,
  },

  [ROUTES.customMobileApp.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'Custom mobile app development company | Yellow',
    description: 'The best talents for Mobile App Development are here. Hire an experienced team to work on your idea.',
    image: logoUrl,
  },

  [ROUTES.iosDevelopmentServices.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'iOS Mobile App Development Company | Yellow',
    description: 'Yellow can provide you with iOS development services. If you want to create an iPhone or '
    + 'iPad app, we are here to help.',
    image: logoUrl,
  },

  [ROUTES.androidDevelopmentServices.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'Custom Android App Development Company | Yellow',
    description: 'Yellow is ready to provide you with Android development services to bring your idea to life.',
    image: logoUrl,
  },

  [ROUTES.prototypingServices.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'Mobile App Prototyping Services | Yellow',
    description: 'Prototyping is an important stage in mobile app development. Complete it with Yellow!',
    image: logoUrl,
  },

  [ROUTES.customWebApp.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'Web Application Development Services | Yellow',
    description: 'Our team is ready to provide you with web development services. '
    + 'We are working with websites, PWAs, chatting applications, and landing pages.',
    image: logoUrl,
  },

  [ROUTES.crowdfundingPlatform.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'Crowdfunding Platform Development Company | Yellow',
    description: 'Yellow is ready to provide you with crowdfunding platform development services. '
    + 'High quality, realistic budget estimate, fast speed.',
    image: logoUrl,
  },

  [ROUTES.fintechDevelopment.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'Fintech Software Development Services | Yellow',
    description: "The fintech industry is booming and doesn't seem to stop. Let's see how your "
    + 'idea can take the slice of pie?',
    image: logoUrl,
  },

  [ROUTES.designServices.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'UI/UX design services | Yellow',
    description: 'Visual content matters, that is where UI/UX design comes into play.Users love good-looking '
    + 'software. Make mobile your app or website captivating with Yellow.',
    image: logoUrl,
  },

  [ROUTES.discoveryPhase.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'Project Discovery Phase in Custom Software Development | Yellow',
    description: 'Discovery phase of a project is an important part of software development. '
    + 'Learn more about how Yellow runs a discovery phase to benefit your business.',
  },

  [ROUTES.eWalletAppDevelopment.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'E-Wallet App Development Company | Yellow',
    description: 'Mobile e-wallet app development services for any industry and any business scale.',
    image: logoUrl,
  },

  [ROUTES.bankingSoftwareDevelopmentCompany.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'Banking Software Development Company | Yellow',
    description: 'We provide companies and organizations big and small with outstanding banking software '
    + 'development. Check out what we can do for you.',
    image: logoUrl,
  },

  [ROUTES.deliveryQualityInYellow.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'What Makes Yellow a Good Software Development Partner | Yellow',
    description: 'Delivery quality standards we follow to build a perfect project for YOU.',
    image: logoUrl,
  },

  [ROUTES.pwaDevelopmentServices.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'PWA Development Services | Yellow',
    description: 'Yellow is combining web and mobile worlds and creates progressive web '
    + 'apps that function smoothly on all devices.',
    image: logoUrl,
  },

  [ROUTES.paymentGatewayDevelopment.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'Payment Software Gateway Development Company | Yellow',
    description: 'Yellow is a leading Payment Gateway Development company, providing customized '
      + 'solutions to enhance transaction security and accuracy. Read more about our services now.',
    image: logoUrl,
  },

  [ROUTES.crossPlatformDevelopmentServices.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'Cross-Platform App Development Services | Yellow',
    description: 'Your cross-platform application will rock the stage and Yellow is ready to make it happen.',
    image: logoUrl,
  },

  [ROUTES.devOpsDevelopment.slug]: {
    '@context': context,
    '@type': 'WebPage',
    name: 'DevOps Development Company | Yellow',
    description: 'If your company wants to integrate DevOps service into its processes and get all '
    + 'the benefits this technology offers, Yellow is ready to lend a hand!',
    image: logoUrl,
  },
};
