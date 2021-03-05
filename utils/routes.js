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
    getPath: (category, page = '1') => (!category || isNumeric(category)
      ? `/blog/${page}`
      : `/blog/${category}/${page}`),
    dynamicPath: '/blog',
    dynamicPathWithPage: '/blog/[slug]',
    dynamicPathWithCategory: '/blog/[slug]/[page]',
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
