import { routes } from 'utils/routes';

export const DEFAULT_ARTICLES_LIMIT = 5;
export const CURRENT_PAGE_NUMBER = 1;
export const NUMBER_OF_IMAGES_PER_LINE = 3;
export const LIMIT = 5;
export const ROUTES = { ...routes };

export const ACCESS_TO_CONTENTFUL = {
  space: process.env.CONTENTFUL_SPACE,
  environment: process.env.CONTENTFUL_ENV,
  accessToken: process.env.CONTENTFUL_TOKEN,
};

export const PAGES = {
  ...Object.entries(routes).reduce((acc, [key, { slug }]) => {
    acc[key] = slug;

    return acc;
  }, {}),
};

export const NAV_LINKS = [
  ...Object.values(routes).filter(({ slug }) => ![
    routes.homepage.slug,
    routes.article.slug,
    routes.notFound.slug,
  ].includes(slug)),
];

export const BLOCKS_SLUGS = {
  homepagePreviewProjects: 'homepage-preview-projects',
  portfolioPagePreviewProjects: 'portfolio-page-preview-projects',
  imageCarousel: 'image-carousel',
  companyPageWhatMakesSpecial: 'company-page-what-makes-us-special',
  compnayPageManagementTeam: 'company-page-management-team',
  contactPageCompanyPhoto: 'contact-page-company-photo',
  contactPageContacts: 'contact-page-contacts',
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
};

export const CATEGORY_TAGS = {
  ...Object.entries(routes.blog.categories).reduce((acc, [key, { slug, title }]) => {
    acc[slug] = title;

    return acc;
  }, {}),
};

export const FEEDBACK_FORM_FIELDS = {
  fullName: 'fullName',
  email: 'email',
  projectDescription: 'projectDescription',
  isSendNDAChecked: 'isSendNDAChecked',
  projectBudget: 'projectBudget',
  files: 'files',
};

export const IMAGES_WITHOUT_CDN = {
  searchIcon: '/images/blog/search.svg',
  roundLogo: '/images/common/logo/yellow_logo.svg',
  closeIcon: '/images/common/close.svg',
  subscribeBlockBackground: '/images/common/subscribeBlock/background.jpg',
  scrollDownIcon: '/images/home/scrollIcon/scroll-down.svg',
  socialNetworksIcons: {
    instaIcon: '/images/layout/footer/insta.svg',
    linkedinIcon: '/images/layout/footer/linkedin.svg',
    mediumIcon: '/images/layout/footer/medium.svg',
    dribbbleIcon: '/images/layout/footer/dribbble.svg',
  },
  partnersIcons: {
    techCrunch: '/images/home/partners/tech-crunch.svg',
    time: '/images/home/partners/time.svg',
    productHunt: '/images/home/partners/product-hunt.svg',
    esquire: '/images/home/partners/esquire.svg',
    theWeek: '/images/home/partners/the-week.svg',
  },
  advantagesIcons: {
    ai: '/images/home/advantages/ai.svg',
    chats: '/images/home/advantages/chats.svg',
    cloud: '/images/home/advantages/cloud.svg',
    mobile: '/images/home/advantages/mobile.svg',
  },
  reviewsImages: {
    OppSites: '/images/home/reviews/oppsites.svg',
    Famlicious: '/images/home/reviews/famlicious.svg',
    Separate: '/images/home/reviews/separate.svg',
    Natp: '/images/home/reviews/natp.svg',
    Ian: '/images/home/reviews/1.png',
    Jim: '/images/home/reviews/2.png',
    Sandro: '/images/home/reviews/3.png',
    Jerry: '/images/home/reviews/4.png',
  },
};
