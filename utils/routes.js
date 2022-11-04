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
  route,
  page = '1',
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
  fromRoot: (slug) => (slug === 'homepage' ? '' : `/${slug}`),
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
      portfolioRoutes,
      page,
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
      blogRoutes,
      page,
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
  mlDevelopment: {
    title: 'Machine Learning App Development Company',
    path: '/machine-learning-development-services',
    dynamicPath: '/machine-learning-development-services',
    slug: 'machine-learning-development-services',
  },
  erpDevelopment: {
    title: 'Custom ERP Software Development Services',
    path: '/enterprise-resource-planning-software-services',
    dynamicPath: '/enterprise-resource-planning-software-services',
    slug: 'enterprise-resource-planning-software-services',
  },
  devOpsDevelopment: {
    title: 'DevOps Development Company',
    path: '/devops-development-services',
    dynamicPath: '/devops-development-services',
    slug: 'devops-development-services',
  },
  signatureGenerator: {
    title: 'Signature Generator',
    path: '/signature-generator',
    dynamicPath: '/signature-generator',
    slug: 'signature-generator',
  },
  fintechDevelopment: {
    title: 'Fintech Software Development Services',
    path: '/fintech-software-development-services',
    dynamicPath: '/fintech-software-development-services',
    slug: 'fintech-software-development-services',
  },
  aiDevelopment: {
    title: 'AI Software Development Services',
    path: '/artificial-intelligence-development-services',
    dynamicPath: '/artificial-intelligence-development-services',
    slug: 'artificial-intelligence-development-services',
  },
  privacyPolicy: {
    title: 'Yellow Systems Privacy Policy',
    path: '/privacy-policy',
    dynamicPath: '/privacy-policy',
    slug: 'privacy-policy',
  },
  termsAndConditions: {
    title: 'Terms and Conditions',
    path: '/terms-and-conditions',
    dynamicPath: '/terms-and-conditions',
    slug: 'terms-and-conditions',
  },
  cookiesPolicy: {
    title: 'Cookies Policy',
    path: '/cookies-policy',
    slug: 'cookies-policy',
  },
  notFound: {
    title: '404 | Yellow',
    path: '/not-found',
    dynamicPath: '/not-found',
    slug: 'not-found',
  },
};
