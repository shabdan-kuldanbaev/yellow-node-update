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
    routes.designServices.slug,
    routes.developmentServices.slug,
    routes.androidDevelopmentServices.slug,
    routes.cloudDevelopment.slug,
    routes.mvpDevelopment.slug,
    routes.mlDevelopment.slug,
    routes.signatureGenerator.slug,
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
  twitterDark: 'twitterDark',
  linkedInDark: 'linkedInDark',
  instagramDark: 'instagramDark',
  yellowLogoWithBg: 'yellowLogoWithBg',
  arrow: 'arrow1',
  behance: 'behance',
  checkMark: 'checkMark',
  dribble: 'dribble',
  instagram: 'instagram',
  logoWhite: 'logoWhite',
  searchSvg: 'search',
  yellowLogoSvg: 'yellowLogo',
  unpinSvg: 'unpin',
  closeSvg: 'close',
  scrollIconSvg: 'scrollIcon',
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
  behanceRoundBlack: 'behanceRoundBlack',
  dribbleRoundBlack: 'dribbleRoundBlack',
  mediumRoundBlack: 'mediumRoundBlack',
  instaRoundBlack: 'instaRoundBlack',
  opensenseTitleBorder: 'opensenseTitleBorder',
  tellTeamUnderline: 'tellTeamUnderline',
  visitSite: 'visitSite',
  arrowDown: 'arrowDown',
  arrowUp: 'arrowUp',
  behanceBlackIcon: 'behanceBlackIcon',
  dribbleBlackIcon: 'dribbleBlackIcon',
  iPhone: 'iPhone',
  iPad: 'iPad',
  browser: 'browser',
  cross: 'cross',
  telegram: 'telegram',
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
  appDevelopmentImagesList: 'app-development-images-list',
  appDevelopmentNumberedList: 'app-development-numbered-list',
  appDevelopmentProcess: 'app-development-process',
  appDevelopmentBlog: 'app-development-blog',
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
      link: '//www.behance.net/yellow_systems',
    },
    {
      title: 'Medium',
      type: SVG_IMAGES_TYPES.mediumRoundWhite,
      link: '//yellow.medium.com/',
    },
    {
      title: 'Instagram',
      type: SVG_IMAGES_TYPES.instaRoundWhite,
      link: '//www.instagram.com/yellow.systems/',
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
};

export const CASE_STUDIES_SLUGS = Object.entries(CASE_STUDIES).reduce((acc, [key, value], index) => {
  acc[index] = value;

  return acc;
}, []);

export const PAGES_WITH_DARK_HEADER = [
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
  ROUTES.customWebApp.path,
  ROUTES.homepage.path,
  ROUTES.developmentServices.path,
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
];

export const CASE_STUDIES_WITH_TRANSPARENT_HEADER = CASE_STUDIES_SLUGS.filter((path) => !CASE_STUDIES_PAGES_WITH_DEFAULT_HEADER.includes(path));

export const SUB_NAVIGATION_LINKS = {
  [NON_INTERACTIVE_LINKS.whatWeDo.slug]: [
    {
      title: 'Web app development',
      subtitle: 'Your website will rock the stage',
      slug: ROUTES.customWebApp.path,
    },
    {
      title: 'Mobile app development',
      slug: ROUTES.customMobileApp.path,
      items: [
        { slug: ROUTES.developmentServices.path, title: 'iOS app development services' },
        { slug: ROUTES.androidDevelopmentServices.path, title: 'Android app development services' },
      ],
    },
    {
      title: 'Custom chat app development',
      subtitle: 'Instant communication rules',
      slug: ROUTES.customChatApp.path,
    },
    {
      title: 'UI/UX design services',
      subtitle: 'Beautiful, smart, efficient, logical',
      slug: ROUTES.designServices.path,
    },
    {
      title: 'MVP development services',
      subtitle: 'Minimum viable product for your idea',
      slug: ROUTES.mvpDevelopment.path,
    },
    {
      title: 'Cloud app development services',
      subtitle: 'No physical space is occupied',
      slug: ROUTES.cloudDevelopment.path,
    },
    {
      title: 'Machine learning development services',
      subtitle: 'Artificial intelligence at your service',
      slug: ROUTES.mlDevelopment.path,
    },
  ],
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
];

export const CONTACT_FORM_TITLES = {
  [PAGES.customMobileApp]: '',
  [PAGES.customChatApp]: '',
  [PAGES.customWebApp]: 'Contact Yellow for a free estimation',
  [PAGES.designServices]: 'Yellow is ready to give you a hand with UX/UI design',
  [PAGES.developmentServices]: '',
  [PAGES.androidDevelopmentServices]: 'We are ready to create an Android app with you',
  [PAGES.mvpDevelopment]: 'Still have questions? We are ready to answer them',
  [PAGES.cloudDevelopment]: 'The sky\'s the limit',
  [PAGES.mlDevelopment]: 'Do you have an idea of an ML solution? Get in touch with us!',
};

// eslint-disable-next-line
export const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

export const DEFAULT_WORK_TYPE = { slug: 'all', displayName: 'All' };

export const SWIPER_NAV_BUTTON_TYPES = {
  next: 'next',
  prev: 'prev',
};

export const REVEAL_ANIMATION_PROPS = {
  type: ANIMATED_TYPE.isCustom,
  translateY: '2.82352941em',
  opasityDuration: 1,
  transformDuration: 1,
};
