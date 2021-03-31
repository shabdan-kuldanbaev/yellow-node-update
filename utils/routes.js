const rootBlogPath = '/blog';

const dynamicBlogPaths = {
  root: rootBlogPath,
  slug: `${rootBlogPath}/[slug]`,
  page: `${rootBlogPath}/[slug]/[page]`,
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

export const routes = {
  homepage: {
    title: 'Home',
    path: '/',
    dynamicPath: '/',
    slug: 'homepage',
  },
  portfolio: {
    title: 'Portfolio',
    path: '/portfolio',
    dynamicPath: '/portfolio',
    slug: 'portfolio',
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

      if (!category || !Number.isNaN(category)) {
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
