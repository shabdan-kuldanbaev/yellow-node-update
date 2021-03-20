import { isNumeric } from 'utils/helper';

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
  pageSlug: (page) => ({
    path: `${rootBlogPath}/${page}`,
    dynamicPath: dynamicBlogPaths.slug,
  }),
  categorySlug: (category) => ({
    path: `${rootBlogPath}/${category}`,
    dynamicPath: dynamicBlogPaths.slug,
  }),
  categoryPageSlug: (category, page) => ({
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
    getPath: (category, page = '1') => {
      const {
        root,
        pageSlug,
        categorySlug,
        categoryPageSlug,
      } = blogRoutes;

      if (category === 'latest') {
        return root();
      }

      if (!category || isNumeric(category)) {
        if (+page === 1) return root();

        return pageSlug(page);
      }

      if (category && +page === 1) {
        return categorySlug(category);
      }

      return categoryPageSlug(category, page);
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
    path: (slug) => `/blog/${slug}`,
    dynamicPath: '/blog/[slug]',
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
