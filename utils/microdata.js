import {
  ROUTES,
  IMAGES,
  CONTACTS_DATA,
} from 'utils/constants';
import { rootUrl } from 'utils/helper';

const context = 'https://schema.org';
const logoUrl = `${rootUrl}${IMAGES.roundLogo}`;
const publisherMicrodata = {
  '@type': 'Organization',
  name: 'Yellow Systems',
  logo: {
    '@type': 'ImageObject',
    url: logoUrl,
  },
};
const authorMicrodata = ({ author: { fullName, position } }) => ({
  '@type': 'Person',
  name: fullName,
  jobTitle: position,
});
const {
  email,
  telephoneNumbers,
  country,
  city,
  postalCode,
  streetAddress,
} = CONTACTS_DATA;

function pageUrl(pagePath = '') {
  return `${rootUrl}${pagePath}`;
}

export const microdata = {
  article: ({
    metaTitle,
    title,
    publishedAt,
    updatedAt,
    headImage,
    articleBody,
    author,
  }) => ({
    '@context': context,
    '@type': 'BlogPosting',
    headline: metaTitle,
    name: title,
    datePublished: publishedAt,
    dateModified: updatedAt,
    image: headImage,
    articleBody,
    publisher: publisherMicrodata,
    author: authorMicrodata({ author }),
    about: {
      '@type': 'Article',
      datePublished: publishedAt,
      dateModified: updatedAt,
      headline: metaTitle,
      image: headImage,
      publisher: publisherMicrodata,
      author: authorMicrodata({ author }),
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
    email,
    telephone: telephoneNumbers,
    address: {
      '@type': 'PostalAddress',
      addressLocality: `${country}, ${city}`,
      postalCode,
      streetAddress,
    },
  }),
  breadcrumbs: ({ breadcrumbsList }) => {
    const items = breadcrumbsList.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      item: {
        '@id': `${rootUrl}${breadcrumb.to}`,
        name: breadcrumb.title,
      },
    }));

    return ({
      '@context': context,
      '@type': 'BreadcrumbList',
      itemListElement:
      [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': rootUrl,
            name: 'Home',
          },
        },
        ...items,
      ],
    });
  },
  faq: ({ faqList }) => {
    const mainEntity = faqList.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    }));

    return ({
      '@context': context,
      '@type': 'FAQPage',
      mainEntity,
    });
  },
};
