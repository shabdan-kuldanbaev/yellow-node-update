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

export const PAGES = Object.entries(routes).reduce((acc, [key, { slug }]) => {
  acc[key] = slug;

  return acc;
}, {});

export const NAV_LINKS = Object.values(routes).filter(({ slug }) => ![
  routes.homepage.slug,
  routes.article.slug,
  routes.project.slug,
  routes.notFound.slug,
].includes(slug));

export const BLOCKS_SLUGS = {
  homepagePreviewProjects: 'homepage-preview-projects',
  worksPagePreviewProjects: 'works-page-preview-projects',
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
  expandByHeight: 'expandByHeight',
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
  fernwayer: {
    wireframes: {
      first: '/images/row-2.png',
      second: '/images/row.png',
    },
    iphone: '/images/iPhone.png',
    map: '/images/map.png',
    pictures: '/images/pictures.png',
    screens: '/images/screens.png',
    editStory: '/images/editStory.png',
    experienceCard: '/images/ExperienceCard.png',
    chart: '/images/chart.png',
    chat: '/images/chat.png',
    experience: '/images/Experiences.png',
    experienceCalendar: '/images/ExperiencesCalendar.png',
    result: '/images/result.png',
    background: '/images/fernwayerBg.png',
    logo: '/images/fernwayerLogo.png',
    image: '/images/fernwayerImage.png',
  },
  stickerBox: {
    image: '/images/stickerBox.png',
    logo: '/images/stickerBoxLogo.png',
    chart: '/images/stickerboxTechnologies.png',
    wireframes: {
      first: '/images/stickerBoxWireframe1.png',
      second: '/images/stickerBoxWireframe2.png',
    },
    facesegment: '/images/facesegment.png',
    additionalFeatures: '/images/additionalFeatures.png',
    sync: '/images/sync.png',
    result: '/images/resultSt.png',
  },
};

export const CONTACTS_DATA = {
  email: 'hi@yellow.systems',
  telephoneNumbers: [
    '+1 415 670 9070',
    '+375 29 311 52 49',
  ],
  city: 'Minsk',
  country: 'Belarus',
  postalCode: '220030',
  streetAddress: '5-303 Nemiga street',
};

export const SVG_IMAGES_TYPES = {
  appstore: 'appstore',
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
};

export const DEFAULT_DATE_FORMAT = 'DD MMMM, YYYY';

export const HEADER_HEIGHT = 66;

export const CASE_STUDIES_TYPES = {
  projectIdea: 'projectIdea',
  intro: 'intro',
  team: 'team',
  challenges: 'challengesAndSolutions',
  challengesWithWireframe: 'challengesWithWireframe',
  specialChallenges: 'specialChallengesAndSolutions',
  wireframe: 'wireframe',
  appFeatures: 'appFeatures',
  image: 'image',
  results: 'results',
};

export const ARTICLE_PREVIEW_TYPES = {
  related: 'related',
};
