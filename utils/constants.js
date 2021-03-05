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
