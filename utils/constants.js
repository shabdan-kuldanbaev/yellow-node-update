// destructuring doesn't work poperly with process.env
/* eslint-disable prefer-destructuring */

import React from 'react';
import { routes } from 'utils/routes';

// TODO: After refactoring all pages, remove this variable and check for pages
export const REFACTORED_CASE_STUDIES_PAGES = [
  'stickerbox',
  'fireaway',
  'fairy',
  'seven-pm-thursday',
  'fernwayer',
  'hotel-data-cloud',
];

export const SEARCH_ARTICLES_LIMIT = 50;
export const HOMEPAGE_ARTICLES_LIMIT = 5;
export const ARTICLES_NUMBER_PER_PAGE = 11;
export const HOMEPAGE_BLOG_CURRENT_PAGE = 1;
export const ARTICLE_PHOTO_GALLERY_IMAGES_PER_LINE = 3;
export const ROUTES = { ...routes };

export const ACCESS_TO_CONTENTFUL = {
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENV,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN,
};

export const ACCESS_TO_CONTENTFUL_PREVIEW = {
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENV,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN,
  isPreview: true,
};

export const PAGES = Object.entries(routes).reduce((acc, [key, { slug }]) => {
  acc[key] = slug;

  return acc;
}, {});

export const NON_INTERACTIVE_LINKS = {
  whatWeDo: {
    title: 'What we do',
    slug: 'what-we-do',
  },
};

export const TAGS_TYPE = {
  dark: 'dark',
  light: 'light',
  category: 'category',
};

export const NAV_LINKS = [
  ...Object.values(NON_INTERACTIVE_LINKS),
  ...Object.values(routes).filter(({ slug }) => slug && ![
    routes.homepage.slug,
    routes.article.slug,
    routes.project.slug,
    routes.notFound.slug,
    routes.customChatApp.slug,
    routes.customMobileApp.slug,
    routes.customWebApp.slug,
    routes.fintechDevelopment.slug,
    routes.discoveryPhase.slug,
    routes.erpDevelopment.slug,
    routes.designServices.slug,
    routes.developmentServices.slug,
    routes.androidDevelopmentServices.slug,
    routes.cloudDevelopment.slug,
    routes.mvpDevelopment.slug,
    routes.lendingSoftwareDevelopment.slug,
    routes.mlDevelopment.slug,
    routes.devOpsDevelopment.slug,
    routes.aiDevelopment.slug,
    routes.crossPlatformDevelopmentServices.slug,
    routes.dataScienceDevelopment.slug,
    routes.tradingSoftwareDevelopment.slug,
    routes.prototypingServices.slug,
    routes.signatureGenerator.slug,
    routes.privacyPolicy.slug,
    routes.termsAndConditions.slug,
    routes.cookiesPolicy.slug,
    routes.lendingSoftwareDevelopment.slug,
  ].includes(slug)),
];

export const BLOCKS_SLUGS = {
  homepagePreviewProjects: 'homepage-preview-projects',
  worksPagePreviewProjects: 'works-page-preview-projects',
  imageCarousel: 'image-carousel',
  companyPageWhatMakesSpecial: 'company-page-what-makes-us-special',
  compnayPageManagementTeam: 'company-page-management-team',
  contactPageCompanyPhoto: 'contact-page-company-photo',
  processPageProcessPreview: 'process-page-process-preview',
  companyReviews: 'company-reviews',
};

export const ANIMATED_TYPE = {
  isReveal: 'isReveal',
  isFade: 'isFade',
  isCustom: 'isCustom',
  isJSON: 'isJSON',
  isParallaxSpring: 'isParallaxSpring',
  gsap: 'gsap',
  imageZoom: 'imageZoom',
  expandByHeight: 'expandByHeight',
  isCSS: 'isCSS',
};

export const CATEGORY_TAGS = Object.entries(routes.blog.categories).reduce((acc, [_, { slug, title }]) => {
  acc[slug] = title;

  return acc;
}, {});

export const CATEGORY_SLUGS = Object.entries(routes.blog.categories).reduce((acc, [key, { slug }]) => {
  acc[key] = slug;

  return acc;
}, []);

export const FEEDBACK_FORM_FIELDS = {
  name: 'name',
  email: 'email',
  description: 'description',
  isSendNDAChecked: 'isSendNDAChecked',
  projectBudget: 'projectBudget',
  attachments: 'attachments',
  clientId: 'clientId',
};

export const IMAGES = {
  roundLogo: '/images/common/logo/yellow_logo.svg',
  logoWhite: '/images/common/logo/logoWhite.svg',
  unpinFile: '/images/common/upload/unpin.svg',
  dashedLine: '/images/common/dashedLine.png',
  advantagesIcons: {
    ai: '/images/home/advantages/ai.svg',
    chats: '/images/home/advantages/chats.svg',
    cloud: '/images/home/advantages/cloud.svg',
    mobile: '/images/home/advantages/mobile.svg',
  },
  reviewsImages: {
    Ian: '/images/home/reviews/1.png',
    Jim: '/images/home/reviews/2.png',
    Sandro: '/images/home/reviews/3.png',
    Jerry: '/images/home/reviews/4.png',
  },
};

export const SVG_IMAGES_TYPES = {
  arrowRight: 'arrowRight',
  arrow: 'arrow1',
  bookmarkArrow: 'bookmarkArrow',
  bookmarkIcon: 'bookmarkIcon',
  nearbyArrow: 'nearbyArrow',
  chevronDown: 'chevronDown',
  appstore: 'appstore',
  blackFillAppstore: 'blackFillAppstore',
  blackLogo: 'blackLogo',
  defaultLogo: 'defaultLogo',
  whiteLogo: 'whiteLogo',
  blackYellowText: 'blackYellowText',
  whiteYellowText: 'whiteYellowText',
  arrowNarrowUp: 'arrowNarrowUp',
  mediumFilledWhite: 'mediumFilledWhite',
  linkedinFilledWhite: 'linkedinFilledWhite',
  twitterFilledWhite: 'twitterFilledWhite',
  behanceFilled: 'behanceFilled',
  behanceFilledWhite: 'behanceFilledWhite',
  mediumFilled: 'mediumFilled',
  instagramFilled: 'InstagramFilled',
  instagramFilledWhite: 'instagramFilledWhite',
  dribbbleFilledWhite: 'dribbbleFilledWhite',
  dribbbleFilled: 'dribbbleFilled',
  searchLg: 'searchLg',
  closeSvg: 'xClose',
  attachment: 'attachment',
  opensenseTitleBorder: 'opensenseTitleBorder',
  checkMark: 'checkMark',
  check: 'check',
  iPhone: 'iPhone',
  iPad: 'iPad',
  arrowDown: 'arrowDown',
  youtubeFilledWhite: 'youtubeFilledWhite',
};

export const APP_DEVELOPMENT_TYPES = {
  appDevelopmentPageIntro: 'app-development-page-intro',
  appDevelopmentCards: 'app-development-cards',
  appDevelopmentCheckList: 'app-development-check-list',
  appDevelopmentSvgList: 'app-development-svg-list',
  appDevelopmentGallery: 'app-development-gallery',
  appDevelopmentFAQ: 'app-development-faq',
  appDevelopmentSlider: 'app-development-slider',
  appDevelopmentImageSection: 'app-development-image',
  appDevelopmentReviews: 'app-development-reviews',
  appDevelopmentImagesList: 'app-development-images-list',
  appDevelopmentNumberedList: 'app-development-numbered-list',
  appDevelopmentProcess: 'app-development-process',
  appDevelopmentBlog: 'app-development-blog',
  appDevelopmentCheckSocial: 'app-development-check-social',
  appDevelopmentRelatedServices: 'app-development-related-services',
  svgDisplayWithSelector: 'svg-display-with-selector',
  cardsWithOverlay: 'cards-with-overlay',
  appDevelopmentAppFeatures: 'app-development-app-features',
  appDevelopmentAppFeaturesPromo: 'app-development-app-features-promo',
  appDevelopmentPlainTextSection: 'app-development-plain-text',
  appDevelopmentBookmarkCard: 'app-development-bookmark-card',
  appDevelopmentTabsSection: 'app-development-tabs-section',
  processOverlay: 'app-development-process-overlay',
  appDevelopmentSliderCards: 'app-development-slider-cards-section',
  appDevelopmentDownloadSection: 'app-development-download-section',
  feedback: 'feedback',
  parallax: 'case-study-parallax',
};

export const HOMEPAGE_SLOGAN = 'WE CREATE\nFANTASTIC SOFTWARE';

export const HOMEPAGE_SECTION_TYPES = {
  text: 'text',
  cards: 'cards',
  cardsWithOverlay: 'cards-with-overlay',
  svgDisplay: 'svg-display',
  svgDisplayWithSelector: 'svg-display-with-selector',
  porfolio: 'portfolio',
  reviews: 'reviews',
  blog: 'blog',
  photos: 'photos',
  feedback: 'feedback',
};

export const CONTACTS_DATA = {
  email: 'hi@yellow.systems',
  telephoneNumbers: [
    '+1 (302) 213-37-98',
    '+375 (29) 311-52-49',
  ],
  city: 'Minsk',
  country: 'Belarus',
  postalCode: '220030',
  streetAddress: '5-303 Nemiga street',
  socialMedia: [
    {
      title: 'LinkedIn',
      type: 'linkedInOultined',
      link: 'https://www.linkedin.com/company/yellow-systems',
    },
    {
      title: 'Twitter',
      type: 'twitterOutlined',
      link: 'https://mobile.twitter.com/yellow_systems',
    },
    {
      title: 'Behance',
      type: 'behanceOutlined',
      link: 'https://www.behance.net/yellow_systems',
    },
    {
      title: 'Medium',
      type: 'mediumOutlined',
      link: 'https://yellow.medium.com/',
    },
    {
      title: 'Instagram',
      type: 'instagramOutlined',
      link: 'https://www.instagram.com/yellow.systems/',
    },
  ],
};

export const DEFAULT_DATE_FORMAT = 'MMMM D, YYYY';

export const HEADER_HEIGHT = 66;

export const CASE_STUDIES_TYPES = {
  intro: 'case-study-intro',
  projectIdea: 'case-study-project-idea',
  challenges: 'case-study-challenges',
  specialChallenges: 'case-study-special',
  wireframe: 'case-study-wireframe',
  appFeatures: 'case-study-app-features',
  image: 'case-study-image',
  results: 'case-study-results',
  parallax: 'case-study-parallax',
  design: 'case-study-design',
  features: 'case-study-features',
  story: 'case-study-story',
  caseStudyEvent: 'case-study-event',
  fullscreenImage: 'case-study-fullscreen-image',
  works: 'case-study-how-it-works',
  challengesSlider: 'case-study-challenges-slider',
  processOverlay: 'case-study-process-overlay',
  challengesSpecialSlider: 'case-study-special-slider',
  prototype: 'case-study-prototype',
  feedback: 'feedback',
};

export const ARTICLE_PREVIEW_TYPES = {
  related: 'related',
  blog: 'blog',
  search: 'search',
};

export const CASE_STUDIES = {
  fernwayer: 'fernwayer',
  dindon: 'dindon',
  stickerbox: 'stickerbox',
  hotelDataCloud: 'hotel-data-cloud',
  sevenPmThursday: 'seven-pm-thursday',
  fairy: 'fairy',
  tell: 'tell',
  openSense: 'open-sense',
  writerChromeExtension: 'writer-chrome-extension',
  separateUs: 'separate-us',
  natp: 'natp',
  driveFocus: 'drive-focus',
  cashChat: 'cash-chat',
  travelTrivia: 'travel-trivia',
  beautonomy: 'beautonomy',
  smartcenter: 'smartcenter',
  telemojo: 'telemojo',
  ubiChat: 'ubichat',
  meatEater: 'meateater',
  fireaway: 'fireaway',
  famlicious: 'famlicious',
  bionorica: 'bionorica',
  fusionMarkets: 'fusion-markets',
  blackBird: 'blackbird',
  mobileFintechApp: 'fintech-app-for-credit-score',
  goodPsychics: 'marketplace-for-clairvoyant-services',
  mlInRealEstate: 'machine-learning-in-real-estate',
  humankind: 'humankind',
  balzano: 'software-for-mri-interpretation',
  cinnabar: 'cinnabar',
  mobileBankApplication: 'mobile-bank-application',
};

export const CASE_STUDIES_SLUGS = Object.entries(CASE_STUDIES).reduce((acc, [key, value], index) => {
  acc[index] = value;

  return acc;
}, []);

export const PAGES_WITH_DARK_HEADER = [
  ROUTES.project.getRoute(CASE_STUDIES.balzano).path,
  ROUTES.project.getRoute(CASE_STUDIES.fernwayer).path,
  ROUTES.project.getRoute(CASE_STUDIES.dindon).path,
  ROUTES.project.getRoute(CASE_STUDIES.stickerbox).path,
  ROUTES.project.getRoute(CASE_STUDIES.sevenPmThursday).path,
  ROUTES.project.getRoute(CASE_STUDIES.fairy).path,
  ROUTES.project.getRoute(CASE_STUDIES.natp).path,
  ROUTES.project.getRoute(CASE_STUDIES.driveFocus).path,
  ROUTES.project.getRoute(CASE_STUDIES.cashChat).path,
  ROUTES.project.getRoute(CASE_STUDIES.travelTrivia).path,
  ROUTES.project.getRoute(CASE_STUDIES.meatEater).path,
  ROUTES.project.getRoute(CASE_STUDIES.fireaway).path,
  ROUTES.project.getRoute(CASE_STUDIES.fusionMarkets).path,
  ROUTES.project.getRoute(CASE_STUDIES.blackBird).path,
  ROUTES.project.getRoute(CASE_STUDIES.mobileFintechApp).path,
  ROUTES.project.getRoute(CASE_STUDIES.goodPsychics).path,
  ROUTES.project.getRoute(CASE_STUDIES.mlInRealEstate).path,
  ROUTES.project.getRoute(CASE_STUDIES.cinnabar).path,
  ROUTES.project.getRoute(CASE_STUDIES.mobileBankApplication).path,
  ROUTES.project.getRoute(CASE_STUDIES.hotelDataCloud).path,
  ROUTES.customWebApp.path,
  ROUTES.homepage.path,
  ROUTES.developmentServices.path,
  ROUTES.fintechDevelopment.path,
  ROUTES.erpDevelopment.path,
  ROUTES.mvpDevelopment.path,
  ROUTES.androidDevelopmentServices.path,
  ROUTES.cloudDevelopment.path,
  ROUTES.mlDevelopment.path,
  ROUTES.prototypingServices.path,
];

export const CASE_STUDIES_PAGES_WITH_DEFAULT_HEADER = [
  CASE_STUDIES.openSense,
  CASE_STUDIES.beautonomy,
  CASE_STUDIES.bionorica,

  // TODO: Temporarily solution, doesnt fit design
  CASE_STUDIES.famlicious,
];

export const PAGES_WITH_TRANSPARENT_HEADER = [
  ROUTES.homepage.path,
  ROUTES.customWebApp.path,
  ROUTES.developmentServices.path,
  ROUTES.androidDevelopmentServices.path,
  ROUTES.mvpDevelopment.path,
  ROUTES.cloudDevelopment.path,
  ROUTES.mlDevelopment.path,
  ROUTES.fintechDevelopment.path,
  ROUTES.erpDevelopment.path,
  ROUTES.devOpsDevelopment.path,
  ROUTES.dataScienceDevelopment.path,
  ROUTES.aiDevelopment.path,
  ROUTES.crossPlatformDevelopmentServices.path,
  ROUTES.prototypingServices.path,
];

export const CASE_STUDIES_WITH_TRANSPARENT_HEADER = CASE_STUDIES_SLUGS.filter((path) => !CASE_STUDIES_PAGES_WITH_DEFAULT_HEADER.includes(path));

export const SUB_NAVIGATION_KEYS = {
  services: 'services',
  expertise: 'expertise',
  fintech: 'fintech',
};

export const SUB_NAVIGATION_ITEMS = {
  [NON_INTERACTIVE_LINKS.whatWeDo.slug]: [
    {
      title: 'Services',
      key: SUB_NAVIGATION_KEYS.services,
    },
    {
      title: 'Expertise',
      key: SUB_NAVIGATION_KEYS.expertise,
    },
    {
      title: 'Fintech',
      key: SUB_NAVIGATION_KEYS.fintech,
    },
  ],
};

export const SUB_NAVIGATION_LINKS = {
  [NON_INTERACTIVE_LINKS.whatWeDo.slug]: {
    [SUB_NAVIGATION_KEYS.services]: [
      {
        title: 'Mobile app development',
        subtitle: 'Quality solutions for smartphones and tablets',
        slug: ROUTES.customMobileApp.path,
      },
      {
        title: 'Web app development',
        subtitle: 'Your website will rock the stage',
        slug: ROUTES.customWebApp.path,
      },
      {
        title: 'MVP development services',
        subtitle: 'Minimum viable product for your idea',
        slug: ROUTES.mvpDevelopment.path,
      },
      {
        title: 'iOS app development services',
        subtitle: 'Native apps for iPhones and iPads',
        slug: ROUTES.developmentServices.path,
      },
      {
        title: 'Cloud-based app development services',
        subtitle: 'No physical space is occupied',
        slug: ROUTES.cloudDevelopment.path,
      },
      {
        title: 'Cloud-based app development services',
        subtitle: 'No physical space is occupied',
        slug: ROUTES.lendingSoftwareDevelopment.path,
      },
      {
        title: 'Prototyping services',
        subtitle: 'Start with a draft',
        slug: ROUTES.prototypingServices.path,
      },
      {
        title: 'Android app development services',
        subtitle: 'Powerful and intuitive Android apps',
        slug: ROUTES.androidDevelopmentServices.path,
      },
      {
        title: 'DevOps development services',
        subtitle: 'Connect your software development and IT teams',
        slug: ROUTES.devOpsDevelopment.path,
      },
      {
        title: 'UI/UX design services',
        subtitle: 'Beautiful, smart, efficient, logical',
        slug: ROUTES.designServices.path,
      },
      {
        title: 'Cross platform development services',
        subtitle: 'Lauch your app to all platforms at once',
        slug: ROUTES.crossPlatformDevelopmentServices.path,
      },
      {
        title: 'Lending Software Development Company',
        subtitle: 'Fast and secure lending process',
        slug: ROUTES.lendingSoftwareDevelopment.path,
      },
    ],
    [SUB_NAVIGATION_KEYS.expertise]: [
      {
        title: 'Custom chat app development',
        subtitle: 'Instant communication tules',
        slug: ROUTES.customChatApp.path,
      },
      {
        title: 'Machine learning development services',
        subtitle: 'Artificial intelligence at your service',
        slug: ROUTES.mlDevelopment.path,
      },

      {
        title: 'AI software development services',
        subtitle: 'Letting machines think',
        slug: ROUTES.aiDevelopment.path,
      },
      {
        title: 'ERP development services',
        subtitle: 'Top-tier solutions for enterprises',
        slug: ROUTES.erpDevelopment.path,
      },
      {
        title: 'Data science development services',
        subtitle: 'Getting insights to boost your business',
        slug: ROUTES.dataScienceDevelopment.path,
      },
    ],
    [SUB_NAVIGATION_KEYS.fintech]: [
      {
        title: 'Fintech software development Services',
        subtitle: 'Build a successul fintech solution',
        slug: ROUTES.fintechDevelopment.path,
      },
      {
        title: 'Trading platform development company',
        subtitle: 'The way to manage investments',
        slug: ROUTES.tradingSoftwareDevelopment.path,
      },
      {
        title: 'Lending Software Development Company',
        subtitle: 'Fast and secure lending process',
        slug: ROUTES.lendingSoftwareDevelopment.path,
      },
    ],
  },
};

export const LINKS_WITH_SUB_NAVIGATION = [NON_INTERACTIVE_LINKS.whatWeDo.slug];

export const ARTICLE_TABLE_TYPES = {
  simpleTable: 'Simple table',
  tableWithHeader: 'Table with header',
  tableWithTwoHeader: 'Table with two headers',
};

export const PAGES_WITH_DARK_BREADCRUMBS = [
  PAGES.customMobileApp,
  PAGES.customChatApp,
  PAGES.designServices,
  PAGES.discoveryPhase,
  PAGES.tradingSoftwareDevelopment,
  PAGES.lendingSoftwareDevelopment,
];

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export const DEFAULT_WORK_TYPE = { slug: 'all', displayName: 'All' };

export const SWIPER_NAV_BUTTON_TYPES = {
  next: 'next',
  prev: 'prev',
};

export const REVEAL_ANIMATION_PROPS = {
  type: ANIMATED_TYPE.isCustom,
  translateY: '2.8em',
  opasityDuration: 0.5,
  transformDuration: 0.7,
  transitionDelay: 50,
};

export const PHONE_RESOLUTION = 568;
export const HORIZONTAL_MOBILE = 450;
export const DEFAULT_TABLET_RESOLUTION = 768;
export const BIG_TABLET_RESOLUTION = 1024;
export const FULL_HD_RESOLUTION = 1920;

export const DEV_HOSTS = [
  'www.yws-dev.xyz',
  'yws-dev.xyz',
];

export const CUSTOM_DOMAIN = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN;

export const IS_PROD = process.env.NEXT_PUBLIC_CURRENT_ENV === 'production';

export const INDEX_FILES = [
  '/index.asp',
  '/index.aspx',
  '/index.htm',
  '/index.html',
  '/index.php',
];

export const EMAIL_LINK = 'hi@yellow.systems';
