import { ROUTES, IMAGES_WITHOUT_CDN } from 'utils/constants';
import { rootUrl } from 'utils/helper';

export const microdata = {
  article: ({
    metaTitle,
    title,
    publishedAt,
    updatedAt,
    headImage,
    articleBody,
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: metaTitle,
    name: title,
    mainEntityOfPage: '',
    datePublished: publishedAt,
    dateModified: updatedAt,
    image: headImage,
    articleBody,
    publisher: {
      '@type': 'Organization',
      name: 'Yellow Systems',
      logo: {
        '@type': 'ImageObject',
        url: `${rootUrl}${IMAGES_WITHOUT_CDN.roundLogo}`,
      },
    },
    about: {
      '@type': 'Article',
      datePublished: publishedAt,
      dateModified: updatedAt,
      headline: metaTitle,
      image: headImage,
      publisher: {
        '@type': 'Organization',
        name: 'Yellow Systems',
        logo: {
          '@type': 'ImageObject',
          url: `${rootUrl}${IMAGES_WITHOUT_CDN.roundLogo}`,
        },
      },
    },
  }),
  homepage: () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': rootUrl,
    name: 'Software Development for Startups | Yellow',
    description: '✔ We provide software development services for startups and businesses. ✔ Reach out for a free consultation!',
    url: rootUrl,
    author: {
      '@type': 'Organization',
      name: 'Yellow Systems',
      logo: `${rootUrl}${IMAGES_WITHOUT_CDN.roundLogo}`,
    },
  }),
  contact: () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${rootUrl}${ROUTES.contact.path}`,
    name: 'Contacts | Yellow',
    description: 'Do you have an awesome idea? Reach us for a free consultation on how to build a great software product for your business!',
    url: `${rootUrl}${ROUTES.contact.path}`,
    logo: `${rootUrl}${IMAGES_WITHOUT_CDN.roundLogo}`,
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
