const rootBlogPath = '/blog';
const rootPortfolioPath = '/portfolio';

const dynamicBlogPaths = {
  root: rootBlogPath,
  slug: `${rootBlogPath}/[slug]`,
  page: `${rootBlogPath}/[slug]/[page]`,
};

const dynamicPortfolioPaths = {
  root: rootPortfolioPath,
  slug: `${rootPortfolioPath}/[slug]`,
  page: `${rootPortfolioPath}/[slug]/[page]`,
};

const blogRoutes = {
  root: () => ({
    path: rootBlogPath,
    dynamicPath: rootBlogPath,
  }),
  slug: (slug) => ({
    path: `${rootBlogPath}/${slug}`,
    dynamicPath: dynamicBlogPaths.slug,
  }),
  page: (category, page) => ({
    path: `${rootBlogPath}/${category}/${page}`,
    dynamicPath: dynamicBlogPaths.page,
  }),
};

const portfolioRoutes = {
  root: () => ({
    path: rootPortfolioPath,
    dynamicPath: rootPortfolioPath,
  }),
  slug: (slug) => ({
    path: `${rootPortfolioPath}/${slug}`,
    dynamicPath: dynamicPortfolioPaths.slug,
  }),
  page: (category, page) => ({
    path: `${rootPortfolioPath}/${category}/${page}`,
    dynamicPath: dynamicPortfolioPaths.page,
  }),
};

export const routes = {
  homepage: {
    title: 'Home',
    path: '/',
    dynamicPath: '/',
    slug: 'homepage',
  },
  portfolio: {
    title: 'Portfolio',
    path: rootPortfolioPath,
    getRoute: (category, page = '1') => {
      if (category === '') {
        return portfolioRoutes.root();
      }

      if (!category || !isNaN(category)) {
        if (+page === 1) return portfolioRoutes.root();

        return portfolioRoutes.slug(page);
      }

      if (category && +page === 1) {
        return portfolioRoutes.slug(category);
      }

      return portfolioRoutes.page(category, page);
    },
    dynamicPath: {
      ...dynamicPortfolioPaths,
    },
    slug: 'portfolio',
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
    getRoute: (category, page = '1') => {
      if (category === 'latest') {
        return blogRoutes.root();
      }

      if (!category || !isNaN(category)) {
        if (+page === 1) return blogRoutes.root();

        return blogRoutes.slug(page);
      }

      if (category && +page === 1) {
        return blogRoutes.slug(category);
      }

      return blogRoutes.page(category, page);
    },
    dynamicPath: {
      ...dynamicBlogPaths,
    },
    slug: 'blog',
    categories: [
      {
        title: 'Latest',
        slug: 'latest',
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
  notFound: {
    title: '404 | Yellow',
    path: '/not-found',
    dynamicPath: '/not-found',
    slug: 'not-found',
  },
};
