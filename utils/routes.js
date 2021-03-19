import { isNumeric } from 'utils/helper';

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
    path: '/blog',
    getPath: (category, page = '1') => {
      const rootBlogPath = '/blog';
      const dynamicBlogPath = {
        root: rootBlogPath,
        slug: `${rootBlogPath}/[slug]`,
        page: `${rootBlogPath}/[slug]/[page]`,
      };
      const route = {
        path: rootBlogPath,
        dynamicPath: dynamicBlogPath.root,
      };

      if (category === 'latest') {
        return route;
      }

      if (!category || isNumeric(category)) {
        if (+page === 1) {
          return route;
        }

        return {
          path: `${rootBlogPath}/${page}`,
          dynamicPath: dynamicBlogPath.slug,
        };
      }

      if (category && +page === 1) {
        return {
          path: `${rootBlogPath}/${category}`,
          dynamicPath: dynamicBlogPath.slug,
        };
      }

      return {
        path: `${rootBlogPath}/${category}/${page}`,
        dynamicPath: dynamicBlogPath.page,
      };
    },
    dynamicPath: {
      root: '/blog',
      slug: '/blog/[slug]',
      page: '/blog/[slug]/[page]',
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
