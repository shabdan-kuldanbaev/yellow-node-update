export const ANIMATED_TYPE = {
  isReveal: 'isReveal',
  isFade: 'isFade',
  isCustom: 'isCustom',
  isJSON: 'isJSON',
  isParallaxSpring: 'isParallaxSpring',
  gsap: 'gsap',
  imageZoom: 'imageZoom',
};

export const TAGS_FOR_BLOG = {
  latest: {
    name: 'Latest', dynamicRouting: 'latest',
  },
  howWeWork: {
    name: 'How we work', dynamicRouting: 'how-we-work',
  },
  softwareDevelopment: {
    name: 'Software Development', dynamicRouting: 'software-development',
  },
  softwareChat: {
    name: 'Software Chat', dynamicRouting: 'software-chat',
  },
  marketing: {
    name: 'Marketing', dynamicRouting: 'marketing',
  },
  yellow: {
    name: 'Yellow', dynamicRouting: 'yellow',
  },
};

export const NUMBER_OF_IMAGES_PER_LINE = 3;
export const LIMIT = 5;

export const PAGES = {
  homepage: 'homepage',
  portfolio: 'portfolio',
  process: 'process',
  blog: 'blog',
  company: 'company',
  contact: 'contact',
  notFound: 'not-found',
};

export const DEFAULT_ARTICLES_LIMIT = 5;
export const CURRENT_PAGE_NUMBER = 1;

export const ACCESS_TO_CONTENTFUL = {
  space: process.env.CONTENTFUL_SPACE,
  environment: process.env.CONTENTFUL_ENV,
  accessToken: process.env.CONTENTFUL_TOKEN,
};

export const ROUTES = {
  homepage: '/',
  portfolio: '/portfolio',
  process: '/process',
  blog: '/blog?category=latest&page=1',
  article: (slug) => `/blog/${slug}`,
  company: '/company',
  contact: '/contact',
};
