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
  softwareDevelopmentPrice: {
    title: 'Pricing',
    path: '/pricing',
    dynamicPath: '/pricing',
    slug: 'pricing',
  },
  blog: {
    title: 'Insights',
    slug: 'blog',
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
        title: 'Fintech',
        slug: 'fintech',
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
  softwareQualityAssuranceServices: {
    title: 'Software Development Price',
    path: '/software-quality-assurance-services',
    dynamicPath: '/software-quality-assurance-services',
    slug: 'software-quality-assurance-services',
  },
  customChatApp: {
    title: 'Custom chat app development company',
    path: '/chat-app-development-company',
    dynamicPath: '/chat-app-development-company',
    slug: 'chat-app-development-company',
  },
  penetrationTesting: {
    title: 'Penetration Testing Services to Secure Your Business',
    path: '/penetration-testing',
    dynamicPath: '/penetration-testing',
    slug: 'penetration-testing',
  },
  customMobileApp: {
    title: 'Custom mobile app development company',
    path: '/mobile-app-development-company',
    dynamicPath: '/mobile-app-development-company',
    slug: 'mobile-app-development-company',
  },
  customWebApp: {
    title: 'Web Application Development Services',
    path: '/web-app-development-company',
    dynamicPath: '/web-app-development-company',
    slug: 'web-app-development-company',
  },
  crowdfundingPlatform: {
    title: 'Crowdfunding Platform Development Company',
    path: '/crowdfunding-platform-development-company',
    dynamicPath: '/crowdfunding-platform-development-company',
    slug: 'crowdfunding-platform-development-company',
  },
  designServices: {
    title: 'UI/UX design services',
    path: '/ui-ux-services',
    dynamicPath: '/ui-ux-services',
    slug: 'ui-ux-services',
  },
  iosDevelopmentServices: {
    title: 'iOS App Development Services',
    path: '/ios-mobile-app-development-services',
    dynamicPath: '/ios-mobile-app-development-services',
    slug: 'ios-mobile-app-development-services',
  },
  androidDevelopmentServices: {
    title: 'Android App Development Services',
    path: '/android-mobile-app-development-services',
    dynamicPath: '/android-mobile-app-development-services',
    slug: 'android-mobile-app-development-services',
  },
  mvpDevelopment: {
    title: 'MVP App Development Services',
    path: '/mvp-app-development-company',
    dynamicPath: '/mvp-app-development-company',
    slug: 'mvp-app-development-company',
    description: 'A minimum viable product will help you get enough feedback to determine whether '
      + 'you should continue a given project. We are ready to help with your MVP development.',
  },
  lendingSoftwareDevelopment: {
    title: 'Lending Software Development Services',
    path: '/lending-software-development',
    dynamicPath: '/lending-software-development',
    slug: 'lending-software-development',
    description: 'Revolutionize lending with our cutting-edge software development solutions for financial institutions.',
  },
  paymentGatewayDevelopment: {
    title: 'Payment Software Gateway Development Company',
    path: '/payment-gateway-development-company',
    dynamicPath: '/payment-gateway-development-company',
    slug: 'payment-gateway-development-company',
    description: 'Yellow is a leading Payment Gateway Development company, providing customized solutions to enhance '
      + 'transaction security and accuracy. Read more about our services now.',
  },
  cloudDevelopment: {
    title: 'Cloud Application Development Services',
    path: '/cloud-based-app-development-services',
    dynamicPath: '/cloud-based-app-development-services',
    slug: 'cloud-based-app-development-services',
    description: 'If your application needs a strong cloud backup, Yellow is ready to help you with cloud app development.',
  },
  crossPlatformDevelopmentServices: {
    title: 'Cross-Platform Mobile App Development Company',
    path: '/cross-platform-development-services',
    dynamicPath: '/cross-platform-development-services',
    slug: 'cross-platform-development-services',
  },
  mlDevelopment: {
    title: 'Machine Learning Development Company',
    path: '/machine-learning-development-services',
    dynamicPath: '/machine-learning-development-services',
    slug: 'machine-learning-development-services',
    description: 'If you want to boost your business with custom machine learning software development, Yellow is here to back you up.',
  },
  erpDevelopment: {
    title: 'Custom ERP Software Development Services',
    path: '/enterprise-resource-planning-software-services',
    dynamicPath: '/enterprise-resource-planning-software-services',
    slug: 'enterprise-resource-planning-software-services',
    description: 'Custom ERP software development services will help you achieve flexibility and manage your business more consciously.',
  },
  devOpsDevelopment: {
    title: 'DevOps Development Company that Helps You Grow',
    path: '/devops-development-services',
    dynamicPath: '/devops-development-services',
    slug: 'devops-development-services',
  },
  discoveryPhase: {
    title: 'Project Discovery Phase in Custom Software Development',
    path: '/discovery-phase-services',
    dynamicPath: '/discovery-phase-services',
    slug: 'discovery-phase-services',
    description: 'Discovery phase of a project is an important part of software development. Learn more about how '
    + 'to run a discovery phase and its benefits to your business.',
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
    description: 'Yellow is an AI software development company that can provide '
    + 'you with top-notch artificial intelligence application development.',
  },
  dataScienceDevelopment: {
    title: 'Data Science Development Services',
    path: '/data-science-development-company',
    dynamicPath: '/data-science-development-company',
    slug: 'data-science-development-company',
    descripition: 'If you are looking for a partner that will help you analyze, process, and structure '
    + 'your data, data science specialists at Yellow are here for you.',
  },
  tradingSoftwareDevelopment: {
    title: 'Custom Trading Platform Development Services',
    path: '/trading-software-development',
    dynamicPath: '/trading-software-development',
    slug: 'trading-software-development',
    description: 'Proficient trading software development services to create robust apps and platforms that boost business performance.',
  },
  prototypingServices: {
    title: 'Mobile App Prototyping Services',
    path: '/prototyping-services',
    dynamicPath: '/prototyping-services',
    slug: 'prototyping-services',
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
  eWalletAppDevelopment: {
    title: 'E-Wallet App Development Company',
    path: '/e-wallet-app-development-company',
    dynamicPath: '/e-wallet-app-development-company',
    slug: 'e-wallet-app-development',
  },
  bankingSoftwareDevelopmentCompany: {
    title: 'Banking Software Development Company',
    path: '/banking-software-development-company',
    dynamicPath: '/banking-software-development-company',
    slug: 'banking-software-development-company',
  },
  deliveryQualityInYellow: {
    title: 'Yellow’s Delivery Quality Standards',
    path: '/delivery-quality-in-yellow',
    dynamicPath: '/delivery-quality-in-yellow',
    slug: 'delivery-quality-in-yellow',
  },
  pwaDevelopmentServices: {
    title: 'PWA Development Services',
    path: '/pwa-development-services',
    dynamicPath: '/pwa-development-services',
    slug: 'pwa-development-services',
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
