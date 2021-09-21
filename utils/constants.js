import { routes } from 'utils/routes';

export const HOMEPAGE_ARTICLES_LIMIT = 5;
export const ARTICLES_NUMBER_PER_PAGE = 11;
export const HOMEPAGE_BLOG_CURRENT_PAGE = 1;
export const ARTICLE_PHOTO_GALLERY_IMAGES_PER_LINE = 3;
export const ROUTES = { ...routes };

export const ACCESS_TO_CONTENTFUL = {
  space: process.env.CONTENTFUL_SPACE,
  environment: process.env.CONTENTFUL_ENV,
  accessToken: process.env.CONTENTFUL_TOKEN,
};

export const ACCESS_TO_CONTENTFUL_PREVIEW = {
  space: process.env.CONTENTFUL_SPACE,
  environment: process.env.CONTENTFUL_ENV,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
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

export const NAV_LINKS = [
  ...Object.values(NON_INTERACTIVE_LINKS),
  ...Object.values(routes).filter(({ slug }) => ![
    routes.homepage.slug,
    routes.article.slug,
    routes.project.slug,
    routes.notFound.slug,
    routes.customChatApp.slug,
    routes.customMobileApp.slug,
    routes.customWebApp.slug,
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
  chatAppPageIntro: 'chat-app-page-intro',
  chatAppPageExperiance: 'chat-app-page-experience',
  chatAppPageTypesOfChat: 'chat-app-page-types-of-chat',
  chatAppPageAdvantages: 'chat-app-page-advantages',
  chatAppPageFeatures: 'chat-app-page-chat-features',
  chatAppPageTechnologies: 'chat-app-page-technologies',
  chatAppPageDevelopersAdvantages: 'chat-app-page-developers-advantages',
  chatAppPageOurWork: 'chat-app-page-our-work',
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

export const CATEGORY_TAGS = Object.entries(routes.blog.categories).reduce((acc, [key, { slug, title }]) => {
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
  arrow: 'arrowSvg',
  behance: 'behanceSvg',
  checkMark: 'checkMarkSvg',
  dribble: 'dribbleSvg',
  instagram: 'instagramSvg',
  logoWhite: 'logoWhite',
  searchSvg: 'searchSvg',
  yellowLogoSvg: 'yellowLogoSvg',
  unpinSvg: 'unpinSvg',
  closeSvg: 'closeSvg',
  scrollIconSvg: 'scrollIconSvg',
  esquirePartner: 'esquirePartner',
  productHuntPartner: 'productHuntPartner',
  techCrunchPartner: 'techCrunchPartner',
  theWeekPartner: 'theWeekPartner',
  timePartner: 'timePartner',
  famliciousReview: 'famliciousReview',
  natmReview: 'natmReview',
  oppsitesReview: 'oppsitesReview',
  separateReview: 'separateReview',
  dribbleIcon: 'dribbleIcon',
  instaIcon: 'instaIcon',
  linkedinIcon: 'linkedinIcon',
  mediumIcon: 'mediumIcon',
  bookmarkArrow: 'bookmarkArrow',
  bookmarkIcon: 'bookmarkIcon',
  nearbyArrow: 'nearbyArrow',
  yellowCheckMark: 'yellowCheckMark',
  yellowLogo: 'yellowLogo',
  yellowLogoText: 'yellowLogoText',
  appstore: 'appstore',
  blackFillAppstore: 'blackFillAppstore',
  linkedinRoundWhite: 'linkedinRoundWhite',
  twitterRoundWhite: 'twitterRoundWhite',
  behanceRoundWhite: 'behanceRoundWhite',
  mediumRoundWhite: 'mediumRoundWhite',
  instaRoundWhite: 'instaRoundWhite',
  linkedinRoundBlack: 'linkedinRoundBlack',
  twitterRoundBlack: 'twitterRoundBlack',
  dribbleRoundBlack: 'dribbleRoundBlack',
  mediumRoundBlack: 'mediumRoundBlack',
  instaRoundBlack: 'instaRoundBlack',
  opensenseTitleBorder: 'opensenseTitleBorder',
  tellTeamUnderline: 'tellTeamUnderline',
  visitSite: 'visitSite',
  arrowDown: 'arrowDown',
  arrowUp: 'arrowUp',
};

export const APP_DEVELOPMENT_ICONS = {
  // mobile app page, development services section
  iOSAppDevelopment: 'iOSAppDevelopment',
  androidAppDevelopment: 'androidAppDevelopment',
  enterpriseMobileAppDevelopment: 'enterpriseMobileAppDevelopment',
  mobileUXDesign: 'mobileUXDesign',
  // mobile app page, benefits section
  profitsRaise: 'profitsRaise',
  standOutFrom: 'standOutFrom',
  increasedRecognition: 'increasedRecognition',
  costReduction: 'costReduction',
  processAutomation: 'processAutomation',
  customerEngagement: 'customerEngagement',
  // mobile app page, mobile app types section
  mobileChats: 'mobileChats',
  socialMedia: 'socialMedia',
  fitness: 'fitness',
  travel: 'travel',
  dating: 'dating',
  artificialIntelligence: 'artificialIntelligence',
  // icons for svg list sections
  titledReactNative: 'titledReactNative',
  titledSwift: 'titledSwift',
  titledJava: 'titledJava',
  titledFirebase: 'titledFirebase',
  titledKotlin: 'titledKotlin',
  titledObjectiveC: 'titledObjectiveC',
  titledPostgre: 'titledPostgre',
  twilio: 'twilio',
  pubnub: 'pubnub',
  react: 'react',
  java: 'java',
  firebase: 'firebase',
  webRtc: 'webRtc',
  swift: 'swift',
  kotlin: 'kotlin',
  postgreSql: 'postgreSql',
  objC: 'objC',
  techCrunch: 'techCrunch',
  time: 'time',
  productHunt: 'productHunt',
  esquire: 'esquire',
  theWeek: 'theWeek',
  // chat app page, types of chat section
  communication: 'communication',
  sales: 'sales',
  customerService: 'customerService',
  // chat app page, developers advantages section
  provenExperience: 'provenExperience',
  highQualityCode: 'highQualityCode',
  recommended: 'recommended',
  greatDesign: 'greatDesign',
  // web app page, web development services
  customWebDevelopment: 'customWebDevelopment',
  headlessCMSDevelopment: 'headlessCMSDevelopment',
  mvpDevelopment: 'mvpDevelopment',
  pwaDevelopment: 'pwaDevelopment',
  webDesign: 'webDesign',
  supportMaintenance: 'supportMaintenance',
  // web app page, benefits of custom web development services
  adaptability: 'adaptability',
  security: 'security',
  scalability: 'scalability',
  easeOfMaintenance: 'easeOfMaintenance',
  // web app page, industries we serve
  eLearning: 'eLearning',
  retail: 'retail',
  // web app page, technologies we use
  titledReact: 'titledReact',
  titledVue: 'titledVue',
  titledNest: 'titledNest',
  titledAws: 'titledAws',
  titledExpress: 'titledExpress',
  titledNuxt: 'titledNuxt',
  // web app page, why choose yellow
  businessFirstApproach: 'businessFirstApproach',
  productLab: 'productLab',
  contentfulPartner: 'contentfulPartner',
};

export const APP_DEVELOPMENT_TYPES = {
  appDevelopmentPageIntro: 'app-development-page-intro',
  appDevelopmentCards: 'app-development-cards',
  appDevelopmentSmallCards: 'app-development-small-cards',
  appDevelopmentCheckList: 'app-development-check-list',
  appDevelopmentSvgList: 'app-development-svg-list',
  appDevelopmentGallery: 'app-development-gallery',
  appDevelopmentFAQ: 'app-development-faq',
  appDevelopmentSlider: 'app-development-slider',
  appDevelopmentImageSection: 'app-development-image',
  appDevelopmentReviews: 'app-development-reviews',
};

export const CONTACTS_DATA = {
  email: 'hi@yellow.systems',
  telephoneNumbers: [
    '+1 (415) 670-90-70',
    '+375 (29) 311-52-49',
  ],
  city: 'Minsk',
  country: 'Belarus',
  postalCode: '220030',
  streetAddress: '5-303 Nemiga street',
  socialMedia: [
    {
      title: 'LinkedIn',
      type: SVG_IMAGES_TYPES.linkedinRoundWhite,
      link: '//www.linkedin.com/company/yellow-systems',
    },
    {
      title: 'Twitter',
      type: SVG_IMAGES_TYPES.twitterRoundWhite,
      link: '//mobile.twitter.com/yellow_systems',
    },
    {
      title: 'Behance',
      type: SVG_IMAGES_TYPES.behanceRoundWhite,
      link: '',
    },
    {
      title: 'Medium',
      type: SVG_IMAGES_TYPES.mediumRoundWhite,
      link: '//medium.com/@yellow',
    },
    {
      title: 'Instagram',
      type: SVG_IMAGES_TYPES.instaRoundWhite,
      link: '//www.instagram.com/yellow.systems',
    },
  ],
};

export const DEFAULT_DATE_FORMAT = 'DD MMMM, YYYY';

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
};

export const ARTICLE_PREVIEW_TYPES = {
  related: 'related',
  blog: 'blog',
  search: 'search',
};

export const CASE_STUDIES = {
  fernwayer: 'fernwayer',
  stickerbox: 'stickerbox',
  sevenPmThursday: 'seven-pm-thursday',
  fairy: 'fairy',
  tell: 'tell',
  openSense: 'open-sense',
  separateUs: 'separate-us',
  natp: 'natp',
  driveFocus: 'drive-focus',
  cashChat: 'cash-chat',
  travelTrivia: 'travel-trivia',
};

export const CASE_STUDIES_SLUGS = Object.entries(CASE_STUDIES).reduce((acc, [key, value], index) => {
  acc[index] = value;

  return acc;
}, []);

export const PAGES_WITH_DARK_HEADER = [
  ROUTES.project.getRoute(CASE_STUDIES.fernwayer).path,
  ROUTES.project.getRoute(CASE_STUDIES.stickerbox).path,
  ROUTES.project.getRoute(CASE_STUDIES.sevenPmThursday).path,
  ROUTES.project.getRoute(CASE_STUDIES.fairy).path,
  ROUTES.project.getRoute(CASE_STUDIES.natp).path,
  ROUTES.project.getRoute(CASE_STUDIES.driveFocus).path,
  ROUTES.project.getRoute(CASE_STUDIES.cashChat).path,
  ROUTES.project.getRoute(CASE_STUDIES.travelTrivia).path,
  ROUTES.customWebApp.path,
  ROUTES.homepage.path,
];

export const PAGES_WITH_TRANSPARENT_HEADER = [
  ...CASE_STUDIES_SLUGS,
  ROUTES.homepage.path,
  ROUTES.customWebApp.path,
];

export const SUB_NAVIGATION_LINKS = {
  [NON_INTERACTIVE_LINKS.whatWeDo.slug]: [
    {
      title: 'Web app development',
      subtitle: 'Your website will rock the stage',
      slug: ROUTES.customWebApp.path,
    },
    {
      title: 'Mobile app development',
      subtitle: 'Building mobile apps for all platforms',
      slug: ROUTES.customMobileApp.path,
    },
    {
      title: 'Custom chat app development',
      subtitle: 'Instant communication rules',
      slug: ROUTES.customChatApp.path,
    },
  ],
};

export const LINKS_WITH_SUB_NAVIGATION = [NON_INTERACTIVE_LINKS.whatWeDo.slug];
