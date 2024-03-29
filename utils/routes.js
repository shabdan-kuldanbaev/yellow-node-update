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
const rootPersonPath = '/person';
const dynamicBlogPaths = getDynamicPaths(rootBlogPath);
const dynamicPortfolioPaths = getDynamicPaths(rootPortfolioPath);
const dynamicPersonPaths = getDynamicPaths(rootPersonPath);
const blogRoutes = createPageRoutes(rootBlogPath, dynamicBlogPaths);
const portfolioRoutes = createPageRoutes(rootPortfolioPath, dynamicPortfolioPaths);
const personRoutes = createPageRoutes(rootPersonPath, dynamicPersonPaths);

export const serviceDevelopmentRoutes = {
  eWalletAppDevelopment: {
    title: 'E-Wallet App Development Company',
    path: '/e-wallet-app-development',
    dynamicPath: '/e-wallet-app-development',
    slug: 'e-wallet-app-development',
  },
  bankingSoftwareDevelopmentCompany: {
    title: 'Banking Software Development Company',
    path: '/banking-software-development-company',
    dynamicPath: '/banking-software-development-company',
    slug: 'banking-software-development-company',
  },
  pwaDevelopmentServices: {
    title: 'PWA Development Services',
    path: '/pwa-development-services',
    dynamicPath: '/pwa-development-services',
    slug: 'pwa-development-services',
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
  billingSoftwareDevelopment: {
    title: 'Billing Software Development Services Company',
    path: '/billing-software-development-services',
    dynamicPath: '/billing-software-development-services',
    slug: 'billing-software-development-services',
    description: 'If you want to create brand-new billing software, partner with Yellow and build a top-tier solution.',
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
  aiSoftwareDevelopmentServices: {
    title: 'AI Software development services',
    path: '/ai-software-development-services',
    dynamicPath: '/ai-software-development-services',
    slug: 'ai-software-development-services',
  },
  generativeAiDevelopment: {
    title: 'Generative AI Development',
    path: '/generative-AI-services',
    slug: 'generative-AI-services',
  },
  deepLearning: {
    title: 'Deep Learning',
    path: '/deep-learning',
    slug: 'deep-learning',
  },
  aiChatbotDevelopmentServices: {
    title: 'AI Chatbot Development Services',
    path: '/ai-chatbot-development-services',
    slug: 'ai-chatbot-development-services',
  },
  aiStaffAugmentationServices: {
    title: 'AI Staff Augmentation Services',
    path: '/ai-staff-augmentation-services',
    slug: 'ai-staff-augmentation-services',
  },
  aiConsulting: {
    title: 'AI Consulting Services',
    path: '/ai-consulting-services',
    slug: 'ai-consulting-services',
  },
};

export const regionalDevelopmentRoutes = {
  softwareDevelopmentColumbus: {
    title: 'Custom Software Development Company in Columbus, Ohio',
    path: '/software-development-columbus',
    dynamicPath: '/software-development-columbus',
    slug: 'software-development-columbus',
  },
  softwareDevelopmentNashville: {
    title: 'Custom Software Development Company in Nashville, TN',
    path: '/software-development-nashville',
    dynamicPath: '/software-development-nashville',
    slug: 'software-development-nashville',
  },
  softwareDevelopmentOklahoma: {
    title: 'Software Development Company in Oklahoma City',
    path: '/software-development-oklahoma',
    dynamicPath: '/software-development-oklahoma',
    slug: 'software-development-oklahoma',
  },
  softwareDevelopmentRaleigh: {
    title: 'Custom Software Development in Raleigh',
    path: '/software-development-raleigh',
    dynamicPath: '/software-development-raleigh',
    slug: 'software-development-raleigh',
  },
  softwareDevelopmentWashington: {
    title: 'Custom Software Development Company in Washington, D.C.',
    path: '/software-development-washington',
    dynamicPath: '/software-development-washington',
    slug: 'software-development-washington',
  },
  softwareDevelopmentOmaha: {
    title: 'Custom Software Development Services In Omaha',
    path: '/software-development-omaha',
    dynamicPath: '/software-development-omaha',
    slug: 'software-development-omaha',
  },
  softwareDevelopmentMiami: {
    title: 'Custom Software Development Services In Miami',
    path: '/software-development-miami',
    dynamicPath: '/software-development-miami',
    slug: 'software-development-miami',
  },
  softwareDevelopmentMinneapolis: {
    title: 'Custom Software Development In Minneapolis, Minnesota',
    path: '/software-development-minneapolis',
    dynamicPath: '/software-development-minneapolis',
    slug: 'software-development-minneapolis',
  },
  softwareDevelopmentTulsa: {
    title: 'Custom Software Development In Tulsa',
    path: '/software-development-tulsa',
    dynamicPath: '/software-development-tulsa',
    slug: 'software-development-tulsa',
  },
  softwareDevelopmentNewOrleans: {
    title: 'Custom Software Development In New Orleans',
    path: '/software-development-new-orleans',
    dynamicPath: '/software-development-new-orleans',
    slug: 'software-development-new-orleans',
  },
};

export const legalInfoRoutes = {
  cookiesPolicy: {
    title: 'Cookies Policy',
    path: '/legal/cookies-policy',
    slug: 'cookies-policy',
  },
  privacyPolicy: {
    title: 'Yellow Systems Privacy Policy',
    path: '/legal/privacy-policy',
    slug: 'privacy-policy',
  },
  termsAndConditions: {
    title: 'Terms and Conditions',
    path: '/legal/terms-and-conditions',
    slug: 'terms-and-conditions',
  },
};

export const aboutRoutes = {
  homepage: {
    title: 'Home',
    path: '/',
    dynamicPath: '/',
    slug: 'homepage',
  },
  bookCall: {
    title: '',
    path: '/book-a-call',
    dynamicPath: '/book-a-call',
    slug: 'book-a-call',
  },
  company: {
    title: 'Company',
    path: '/company',
    dynamicPath: '/company',
    slug: 'company',
  },
  whyUs: {
    title: 'Why Us',
    path: '/why-us',
    dynamicPath: '/why-us',
    slug: 'why-us',
  },
  contact: {
    title: 'Contact Us',
    path: '/contact',
    dynamicPath: '/contact',
    slug: 'contact',
  },
  process: {
    title: 'Process',
    path: '/process',
    dynamicPath: '/process',
    slug: 'process',
  },
  deliveryQualityInYellow: {
    title: 'Yellow\'s Delivery Quality Standards',
    path: '/delivery-quality-in-yellow',
    dynamicPath: '/delivery-quality-in-yellow',
    slug: 'delivery-quality-in-yellow',
  },
  softwareDevelopmentPrice: {
    title: 'Pricing',
    path: '/pricing',
    dynamicPath: '/pricing',
    slug: 'pricing',
  },
};

export const technicalRoutes = {
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

export const blogPagesRoutes = {
  blog: {
    title: 'Insights',
    slug: 'blog',
    path: rootBlogPath,
    // TODO think a better solution
    getRoute: (tag, page = 1) => {
      const params = new URLSearchParams();

      if (tag) {
        params.set('category', tag);
      }

      if (page > 1) {
        params.set('page', page);
      }

      return { path: `/blog?${params.toString()}` };
    },
    dynamicPath: {
      ...dynamicBlogPaths,
    },
    categories: [
      {
        title: 'Latest',
        slug: '',
      },
      {
        title: 'AI',
        slug: 'artificial-intelligence',
      },
      {
        title: 'How we work',
        slug: 'how-we-work',
      },
      {
        title: 'Software development',
        slug: 'software-development',
      },
      {
        title: 'Chats',
        slug: 'software-chat',
      },
      {
        title: 'Fintech',
        slug: 'fintech',
      },
      {
        title: 'News',
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
  person: {
    title: 'Person',
    slug: 'person',
    getRoute: (person, page = 1) => {
      const params = new URLSearchParams();

      if (page > 1) {
        params.set('page', page);
      }

      return { path: `/person/${person}?${params.toString()}` };
    },
    dynamicPath: {
      ...dynamicPersonPaths,
    },
  },
};

export const worksRoutes = {
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
  },
  project: {
    title: 'Project',
    getRoute: (slug) => ({
      path: !!slug && `/works/${slug}`,
      dynamicPath: !!slug && '/works/[project]',
    }),
    slug: 'project',
  },
};

export const routes = {
  ...serviceDevelopmentRoutes,
  ...regionalDevelopmentRoutes,
  ...legalInfoRoutes,
  ...aboutRoutes,
  ...technicalRoutes,
  ...blogPagesRoutes,
  ...worksRoutes,

  fromRoot: (slug) => (slug === 'homepage' ? '' : `/${slug}`),
};
