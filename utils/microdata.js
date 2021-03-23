import { ROUTES, IMAGES_WITHOUT_CDN } from 'utils/constants';
import { rootUrl } from 'utils/helper';

const logoUrl = `${rootUrl}${IMAGES_WITHOUT_CDN.roundLogo}`;
const pageUrl = (pagePath = '') => `${rootUrl}${pagePath}`;
const publisherMicrodata = {
  '@type': 'Organization',
  name: 'Yellow Systems',
  logo: {
    '@type': 'ImageObject',
    url: logoUrl,
  },
};
const context = 'https://schema.org';

export const microdata = {
  article: ({
    metaTitle,
    title,
    publishedAt,
    updatedAt,
    headImage,
    articleBody,
  }) => ({
    '@context': context,
    '@type': 'BlogPosting',
    headline: metaTitle,
    name: title,
    mainEntityOfPage: '',
    datePublished: publishedAt,
    dateModified: updatedAt,
    image: headImage,
    articleBody,
    publisher: publisherMicrodata,
    about: {
      '@type': 'Article',
      datePublished: publishedAt,
      dateModified: updatedAt,
      headline: metaTitle,
      image: headImage,
      publisher: publisherMicrodata,
    },
  }),
  homepage: () => ({
    '@context': context,
    '@type': 'WebSite',
    '@id': pageUrl(),
    name: 'Software Development for Startups | Yellow',
    description: '✔ We provide software development services for startups and businesses. ✔ Reach out for a free consultation!',
    url: rootUrl,
    author: {
      '@type': 'Organization',
      name: 'Yellow Systems',
      logo: logoUrl,
    },
  }),
  contact: () => ({
    '@context': context,
    '@type': 'Organization',
    '@id': pageUrl(ROUTES.contact.path),
    name: 'Contacts | Yellow',
    description: 'Do you have an awesome idea? Reach us for a free consultation on how to build a great software product for your business!',
    url: pageUrl(ROUTES.contact.path),
    logo: logoUrl,
    email: 'hi@yellow.systems',
    telephone: [
      '+1 415 670 9070',
      '+375 29 311 52 49',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Belarus, Minsk',
      postalCode: '220030',
      streetAddress: '5-303 Nemiga street',
    },
  }),
};
