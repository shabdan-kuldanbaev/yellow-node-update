const getDynamicPaths = (rootPath) => ({
  root: rootPath,
  slug: `${rootPath}/[slug]`,
  page: `${rootPath}/[slug]/[page]`,
});
const createPageRoutes = (rootPath, dynamicPaths) => ({
  root: () => ({
    path: rootPath,
    dynamicPath: rootPath,
  }),
  slug: (slug) => ({
    path: `${rootPath}/${slug}`,
    dynamicPath: dynamicPaths.slug,
  }),
  page: (category, page) => ({
    path: `${rootPath}/${category}/${page}`,
    dynamicPath: dynamicPaths.page,
  }),
});
const getPageRoute = (
  category,
  page = '1',
  route,
) => {
  if (category === '') {
    return route.root();
  }

  if (!category || !isNaN(category)) {
    if (+page === 1) return route.root();

    return route.slug(page);
  }

  if (category && +page === 1) {
    return route.slug(category);
  }

  return route.page(category, page);
};

const rootBlogPath = '/blog';
const rootPortfolioPath = '/works';
const dynamicBlogPaths = getDynamicPaths(rootBlogPath);
const dynamicPortfolioPaths = getDynamicPaths(rootPortfolioPath);
const blogRoutes = createPageRoutes(rootBlogPath, dynamicBlogPaths);
const portfolioRoutes = createPageRoutes(rootPortfolioPath, dynamicPortfolioPaths);

export const routes = {
  homepage: {
    title: 'Home',
    path: '/',
    dynamicPath: '/',
    slug: 'homepage',
  },
  portfolio: {
    title: 'Works',
    path: rootPortfolioPath,
    getRoute: (category, page = '1') => getPageRoute(
      category,
      page,
      portfolioRoutes,
    ),
    dynamicPath: {
      ...dynamicPortfolioPaths,
    },
    slug: 'works',
    categories: [
      {
        title: 'Online Video',
        slug: 'online-video',
      },
      {
        title: 'Real-Time Communication',
        slug: 'real-time-communication',
      },
      {
        title: 'DAM/MAM',
        slug: 'dam-mam',
      },
      {
        title: 'Computer Vision',
        slug: 'computer-vision',
      },
      {
        title: 'Content Management',
        slug: 'content-management',
      },
      {
        title: 'Business Intelligence',
        slug: 'business-intelligence',
      },
      {
        title: 'BPM/BPA',
        slug: 'bpm-bpa',
      },
      {
        title: 'CRM',
        slug: 'crm',
      },
      {
        title: 'eCommerce',
        slug: 'ecommerce',
      },
      {
        title: 'eLearning',
        slug: 'elearning',
      },
      {
        title: 'Adtech/Martech',
        slug: 'adtech-martech',
      },
      {
        title: 'FinTech',
        slug: 'fintech',
      },
      {
        title: 'IoT',
        slug: 'iot',
      },
    ],
  },
  project: {
    title: 'Project',
    getRoute: (slug) => ({
      path: !!slug && `/works/${slug}`,
      dynamicPath: !!slug && '/works/[project]',
    }),
    slug: 'project',
  },
  process: {
    title: 'Process',
    path: '/process',
    dynamicPath: '/process',
    slug: 'process',
  },
  blog: {
    title: 'Blog',
    path: rootBlogPath,
    // TODO think a better solution
    getRoute: (category, page = '1') => getPageRoute(
      category,
      page,
      blogRoutes,
    ),
    dynamicPath: {
      ...dynamicBlogPaths,
    },
    slug: 'blog',
    categories: [
      {
        title: 'Latest',
        slug: '',
      },
      {
        title: 'How we work',
        slug: 'how-we-work',
      },
      {
        title: 'Software Development',
        slug: 'software-development',
      },
      {
        title: 'Software Chat',
        slug: 'software-chat',
      },
      {
        title: 'Marketing',
        slug: 'marketing',
      },
      {
        title: 'Yellow',
        slug: 'yellow',
      },
    ],
  },
  article: {
    title: 'Article',
    getRoute: (slug) => ({
      path: !!slug && `/blog/${slug}`,
      dynamicPath: !!slug && '/blog/[slug]',
    }),
    slug: 'article',
  },
  company: {
    title: 'Company',
    path: '/company',
    dynamicPath: '/company',
    slug: 'company',
  },
  contact: {
    title: 'Contact Us',
    path: '/contact',
    dynamicPath: '/contact',
    slug: 'contact',
  },
  customChatApp: {
    title: 'Custom chat app development company',
    path: '/chat-app-development-company',
    dynamicPath: '/chat-app-development-company',
    slug: 'chat-app-development-company',
  },
  customMobileApp: {
    title: 'Custom mobile app development company',
    path: '/mobile-app-development-company',
    dynamicPath: '/mobile-app-development-company',
    slug: 'mobile-app-development-company',
  },
  customWebApp: {
    title: 'Custom web application development company',
    path: '/web-app-development-company',
    dynamicPath: '/web-app-development-company',
    slug: 'web-app-development-company',
  },
  designServices: {
    title: 'UI/UX design services',
    path: '/ui-ux-services',
    dynamicPath: '/ui-ux-services',
    slug: 'ui-ux-services',
  },
  developmentServices: {
    title: 'iOS App Development Services',
    path: '/ios-mobile-app-development-services',
    dynamicPath: '/ios-mobile-app-development-services',
    slug: 'ios-mobile-app-development-services',
  },
  androidDevelopmentServices: {
    title: 'Android mobile app development services',
    path: '/android-mobile-app-development-services',
    dynamicPath: '/android-mobile-app-development-services',
    slug: 'android-mobile-app-development-services',
  },
  mvpDevelopment: {
    title: 'MVP development services',
    path: '/mvp-app-development-company',
    dynamicPath: '/mvp-app-development-company',
    slug: 'mvp-app-development-company',
  },
  cloudDevelopment: {
    title: 'Cloud app development services',
    path: '/cloud-based-app-development-services',
    dynamicPath: '/cloud-based-app-development-services',
    slug: 'cloud-based-app-development-services',
  },
  signatureGenerator: {
    title: 'Signature Generator',
    path: '/signature-generator',
    dynamicPath: '/signature-generator',
    slug: 'signature-generator',
  },
  notFound: {
    title: '404 | Yellow',
    path: '/not-found',
    dynamicPath: '/not-found',
    slug: 'not-found',
  },
};
