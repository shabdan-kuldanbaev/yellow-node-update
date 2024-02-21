// destructuring doesn't work poperly with process.env
/* eslint-disable prefer-destructuring */

import { routes } from 'utils/routes';

export const SEARCH_ARTICLES_LIMIT = 50;
export const HOMEPAGE_ARTICLES_LIMIT = 3;
export const ARTICLES_NUMBER_PER_PAGE = 11;
export const ARTICLES_NUMBER_PER_PERSON_PAGE = 7;
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

export const ACCESS_TO_CONTENTFUL_BLOG = {
  space: process.env.NEXT_PUBLIC_CONTENTFUL_BLOG_SPACE,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_BLOG_ENV,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_BLOG_TOKEN,
};

export const ACCESS_TO_CONTENTFUL_BLOG_PREVIEW = {
  space: process.env.NEXT_PUBLIC_CONTENTFUL_BLOG_SPACE,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_BLOG_ENV,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_BLOG_PREVIEW_TOKEN,
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
  aboutCompany: {
    title: 'Company',
    slug: 'about-company',
  },
};

export const TAGS_TYPE = {
  dark: 'dark',
  light: 'light',
  category: 'category',
};

export const NAV_LINKS = [
  Object.values(NON_INTERACTIVE_LINKS)[0],
  routes.portfolio,
  routes.softwareDevelopmentPrice,
  routes.blog,
  Object.values(NON_INTERACTIVE_LINKS)[1],
  routes.contact,
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
  bounce: 'bounce',
  counter: 'counter',
  zoomOut: 'zoomOut',
};

export const CATEGORY_TAGS = Object.entries(routes.blog.categories).reduce(
  (acc, [_, { slug, title }]) => {
    acc[slug] = title;

    return acc;
  },
  {},
);

export const CATEGORY_SLUGS = Object.entries(routes.blog.categories).reduce(
  (acc, [key, { slug }]) => {
    acc[key] = slug;

    return acc;
  },
  [],
);

export const FEEDBACK_FORM_FIELDS = {
  name: 'name',
  email: 'email',
  description: 'description',
  isSendNDAChecked: 'isSendNDAChecked',
  projectBudget: 'projectBudget',
  attachments: 'attachments',
  clientId: 'clientId',
  source: 'source',
  medium: 'medium',
  phone: 'phone',
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
  arrowNarrowDown: 'arrowNarrowDown',
  arrow: 'arrow1',
  bookmarkArrow: 'bookmarkArrow',
  bookmarkIcon: 'bookmarkIcon',
  bookOpenFilled: 'bookOpenFilled',
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
  instagramFilled: 'instagramFilled',
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
  rocketFilled: 'rocketFilled',
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
  appDevelopmentTableSection: 'app-development-table-section',
  feedback: 'feedback',
  parallax: 'case-study-parallax',
  softwarePriceForm: 'software-price-form',
  wireframes: 'case-study-wireframe',
};

export const WHY_US_TYPE = {
  intro: 'case-study-intro',
  parallax: 'case-study-parallax',
  svgList: 'svg-display',
  imageSection: 'app-development-image',
  feedback: 'feedback',
  process: 'case-study-process',
  imagesSection: 'case-study-image',
  challenges: 'case-study-challenges',
  tabs: 'app-development-tabs-section',
  gallery: 'app-development-gallery',
  results: 'case-study-results',
};

export const HOMEPAGE_SLOGAN = 'WE CREATE\nAI-ENABLED SOFTWARE';

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
  process: 'case-study-process',
  cardsWithOverlay: 'cards-with-overlay',
  cards: 'cards',
  processWithArrays: 'app-development-process',
};

export const SECTION_TYPES = {
  intro: 'case-study-intro',
  caseProcess: 'case-study-process',
  images: 'case-study-image',
  tabs: 'app-development-tabs-section',
  parallax: 'case-study-parallax',
  photos: 'photos',
  review: 'app-development-reviews',
  appDevelopmentCards: 'app-development-cards',
  appDevelopmentProcess: 'app-development-process',
  appDevelopmentSvgList: 'app-development-svg-list',
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
  cedar: 'cedar-valley-farms',
  mobileBudgetingApp: 'mobile-budgeting-app',
  forexTradingPlatform: 'forex-trading-platform',
  crowdfundingPlatform: 'crowdfunding-platform',
  metapix: 'cctv-footage-analytics',
  carbonSpace: 'analytics-for-carbon-tracking',
  p2pLoans: 'web-p2p-lending-platform',
  chatSolutions: 'web-chat-for-mediums',
  kitchenEquipment: 'kitchen-equipment-customizer',
  radioPlato: 'mobile-music-app',
  clairvoyantServices: 'clairvoyant-directory-upgrade',
  digitalWallet: 'digital-wallet-for-ios',
  erp: 'enterprise-resource-planning-system',
  hawkin: 'medical-software-for-musculoskeletal-rehabilitation',
  hyve: 'restaurant-asset-management-tool',
  paymentGateway: 'custom-payment-gateway',
};

export const CASE_STUDIES_SLUGS = Object.entries(CASE_STUDIES).reduce(
  (acc, [key, value], index) => {
    acc[index] = value;

    return acc;
  },
  [],
);

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
  ROUTES.project.getRoute(CASE_STUDIES.ubiChat).path,
  ROUTES.project.getRoute(CASE_STUDIES.writerChromeExtension).path,
  ROUTES.project.getRoute(CASE_STUDIES.telemojo).path,
  ROUTES.project.getRoute(CASE_STUDIES.smartcenter).path,
  ROUTES.project.getRoute(CASE_STUDIES.cedar).path,
  ROUTES.project.getRoute(CASE_STUDIES.mobileBudgetingApp).path,
  ROUTES.project.getRoute(CASE_STUDIES.forexTradingPlatform).path,
  ROUTES.project.getRoute(CASE_STUDIES.kitchenEquipment).path,
  ROUTES.project.getRoute(CASE_STUDIES.radioPlato).path,
  ROUTES.project.getRoute(CASE_STUDIES.clairvoyantServices).path,
  ROUTES.project.getRoute(CASE_STUDIES.erp).path,
  ROUTES.project.getRoute(CASE_STUDIES.hyve).path,
  ROUTES.project.getRoute(CASE_STUDIES.paymentGateway).path,
  ROUTES.customWebApp.path,
  ROUTES.homepage.path,
  ROUTES.whyUs.path,
  ROUTES.iosDevelopmentServices.path,
  ROUTES.fintechDevelopment.path,
  ROUTES.softwareQualityAssuranceServices.path,
  ROUTES.erpDevelopment.path,
  ROUTES.mvpDevelopment.path,
  ROUTES.androidDevelopmentServices.path,
  ROUTES.cloudDevelopment.path,
  ROUTES.mlDevelopment.path,
  ROUTES.prototypingServices.path,
  ROUTES.penetrationTesting.path,
  ROUTES.pwaDevelopmentServices.path,
  ROUTES.softwareDevelopmentColumbus.path,
  ROUTES.softwareDevelopmentWashington.path,
  ROUTES.softwareDevelopmentOklahoma.path,
  ROUTES.softwareDevelopmentNashville.path,
  ROUTES.softwareDevelopmentOmaha.path,
  ROUTES.softwareDevelopmentMiami.path,
  ROUTES.softwareDevelopmentMinneapolis.path,
  ROUTES.softwareDevelopmentTulsa.path,
  ROUTES.softwareDevelopmentNewOrleans.path,
  ROUTES.bookCall.path,
];

export const CASE_STUDIES_PAGES_WITH_DEFAULT_HEADER = [];

export const PAGES_WITH_TRANSPARENT_HEADER = [
  ROUTES.homepage.path,
  ROUTES.customWebApp.path,
  ROUTES.iosDevelopmentServices.path,
  ROUTES.androidDevelopmentServices.path,
  ROUTES.softwareQualityAssuranceServices.path,
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
  ROUTES.pwaDevelopmentServices.path,
  ROUTES.softwareDevelopmentColumbus.path,
  ROUTES.softwareDevelopmentWashington.path,
  ROUTES.softwareDevelopmentOklahoma.path,
  ROUTES.softwareDevelopmentNashville.path,
  ROUTES.softwareDevelopmentRaleigh.path,
  ROUTES.softwareDevelopmentOmaha.path,
  ROUTES.softwareDevelopmentMiami.path,
  ROUTES.softwareDevelopmentMinneapolis.path,
  ROUTES.softwareDevelopmentTulsa.path,
  ROUTES.softwareDevelopmentNewOrleans.path,
  ROUTES.whyUs.path,
  ROUTES.bookCall.path,
  CASE_STUDIES.openSense,
  CASE_STUDIES.chatSolutions,
  CASE_STUDIES.kitchenEquipment,
  CASE_STUDIES.radioPlato,
  CASE_STUDIES.clairvoyantServices,
  CASE_STUDIES.hawkin,
  CASE_STUDIES.hyve,
  CASE_STUDIES.paymentGateway,
  ROUTES.company.path,
];

export const PAGES_WITH_GRAY_HEADER = [
  ROUTES.penetrationTesting.path,
  ROUTES.eWalletAppDevelopment.path,
  ROUTES.bankingSoftwareDevelopmentCompany.path,
  ROUTES.deliveryQualityInYellow.path,
  ROUTES.paymentGatewayDevelopment.path,
  ROUTES.billingSoftwareDevelopment.path,
];

export const CASE_STUDIES_WITH_TRANSPARENT_HEADER = CASE_STUDIES_SLUGS.filter(
  (path) => !CASE_STUDIES_PAGES_WITH_DEFAULT_HEADER.includes(path),
);

export const SUB_NAVIGATION_KEYS = {
  services: 'services',
  solutions: 'solutions',
};

export const SUB_NAVIGATION_ITEMS = {
  [NON_INTERACTIVE_LINKS.whatWeDo.slug]: [
    {
      title: 'Services',
      key: SUB_NAVIGATION_KEYS.services,
    },
    {
      title: 'Solutions',
      key: SUB_NAVIGATION_KEYS.solutions,
    },
  ],
};

export const SUB_NAVIGATION_LINKS = {
  [NON_INTERACTIVE_LINKS.whatWeDo.slug]: {
    [SUB_NAVIGATION_KEYS.services]: [
      {
        title: 'Artificial Intelligence',
        path: ROUTES.aiDevelopment.path,
        icon: 'faceRecognationFilled',
        marked: true,
      },
      {
        title: 'Web App',
        path: ROUTES.customWebApp.path,
        icon: 'monitor01Filled',
      },
      {
        title: 'Quality Assurance',
        path: ROUTES.softwareQualityAssuranceServices.path,
        icon: 'codeFilled',
      },
      {
        title: 'Penetration Testing',
        path: ROUTES.penetrationTesting.path,
        icon: 'bracketsEllipsesFilled',
      },
      {
        title: 'Mobile App',
        path: ROUTES.customMobileApp.path,
        icon: 'phoneFilled',
        items: [
          {
            title: 'Android',
            path: ROUTES.androidDevelopmentServices.path,
            icon: 'androidStudio1',
          },
          {
            title: 'IOS',
            path: ROUTES.iosDevelopmentServices.path,
            icon: 'appleLogo',
          },
          {
            title: 'Cross platform',
            path: ROUTES.crossPlatformDevelopmentServices.path,
            icon: 'monitor02',
          },
        ],
      },
      {
        title: 'UI/UX Design',
        path: ROUTES.designServices.path,
        icon: 'penToolFilled',
      },
    ],
    [SUB_NAVIGATION_KEYS.solutions]: [
      {
        title: 'Fintech',
        path: ROUTES.fintechDevelopment.path,
        icon: 'coinsStackedFilled',
        items: [
          {
            title: 'Banking Software',
            path: ROUTES.bankingSoftwareDevelopmentCompany.path,
          },
          {
            title: 'Trading Platforms',
            path: ROUTES.tradingSoftwareDevelopment.path,
          },
          {
            title: 'Lending Software',
            path: ROUTES.lendingSoftwareDevelopment.path,
          },
          {
            title: 'E-wallet Apps',
            path: ROUTES.eWalletAppDevelopment.path,
          },
          {
            title: 'Crowdfunding Platforms',
            path: ROUTES.crowdfundingPlatform.path,
          },
          {
            title: 'Billing Solutions',
            path: ROUTES.billingSoftwareDevelopment.path,
          },
          {
            title: 'Payment Gateway Software',
            path: ROUTES.paymentGatewayDevelopment.path,
          },
        ],
      },
      {
        title: 'Artificial Intelligence',
        path: ROUTES.aiDevelopment.path,
        icon: 'faceRecognationFilled',
        items: [
          {
            title: 'Machine Learning',
            path: ROUTES.mlDevelopment.path,
          },
          {
            title: 'Data Science',
            path: ROUTES.dataScienceDevelopment.path,
          },
        ],
      },
      {
        title: 'Expertise',
        icon: 'starFilled',
        items: [
          {
            title: 'Custom Chats',
            path: ROUTES.customChatApp.path,
          },
          {
            title: 'ERP Software',
            path: ROUTES.erpDevelopment.path,
          },
          {
            title: 'Discovery Phase',
            path: ROUTES.discoveryPhase.path,
          },
          {
            title: 'Minimal Viable Product',
            path: ROUTES.mvpDevelopment.path,
          },
        ],
      },
    ],
  },
  [NON_INTERACTIVE_LINKS.aboutCompany.slug]: [
    {
      title: 'About us',
      path: ROUTES.company.path,
    },
    {
      title: 'Why us',
      path: ROUTES.whyUs.path,
    },
    {
      title: 'Delivery Quality Standards',
      path: ROUTES.deliveryQualityInYellow.path,
    },
  ],
};

export const LINKS_WITH_SUB_NAVIGATION = [NON_INTERACTIVE_LINKS.whatWeDo.slug];

export const LINKS_WITH_SUB_SMALL_NAVIGATION = [
  NON_INTERACTIVE_LINKS.aboutCompany.slug,
];

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
  PAGES.penetrationTesting,
  PAGES.softwareDevelopmentPrice,
  PAGES.eWalletAppDevelopment,
  PAGES.bankingSoftwareDevelopmentCompany,
  PAGES.deliveryQualityInYellow,
  PAGES.crowdfundingPlatform,
  PAGES.paymentGatewayDevelopment,
  PAGES.billingSoftwareDevelopment,
  PAGES.aiSoftwareDevelopmentServices,
];

export const DEFAULT_WORK_TYPE = { slug: 'all', displayName: 'All' };
export const DEFAULT_WORKS_LIMIT = 8;

export const WORK_TYPES = {
  all: 'All',
  mobile: 'Mobile development',
  uiUx: 'UI/UX design',
  chat: 'Chat development',
  web: 'Web development',
  aiMl: 'AI & ML',
};

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

export const BOUNCE_ANIMATION_PROPS = {
  type: ANIMATED_TYPE.bounce,
  right: 'right',
  duration: 1000,
  ssrFadeout: 'ssrFadeout',
};

export const PHONE_RESOLUTION = 568;
export const HORIZONTAL_MOBILE = 450;
export const DEFAULT_TABLET_RESOLUTION = 768;
export const BIG_TABLET_RESOLUTION = 1024;
export const FULL_HD_RESOLUTION = 1920;

export const DEV_HOSTS = ['www.yws-dev.xyz', 'yws-dev.xyz'];

export const CUSTOM_DOMAIN = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN;

export const IS_PROD = process.env.NEXT_PUBLIC_CURRENT_ENV === 'production';

export const INDEX_FILES = [
  '/index.asp',
  '/index.aspx',
  '/index.htm',
  '/index.html',
  '/index.php',
];

export const VALUABLE_ARTICLE_CATEGORIES_SLUGS = [
  'fintech',
  'yellow',
  'how-we-work',
  'software-development',
  'software-chat',
  'marketing',
];

export const PAGES_WITHOUT_INDEXING = [
  ROUTES.aiSoftwareDevelopmentServices.path,
];
