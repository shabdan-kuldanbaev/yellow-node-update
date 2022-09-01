import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
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
    '@type': 'ContactPage',
    '@id': pageUrl(ROUTES.contact.path),
    name: 'Contacts | Yellow',
    description: 'Do you have an awesome idea? Reach us for a free consultation on how to build a great software product for your business!',
    url: pageUrl(ROUTES.contact.path),
    image: logoUrl,
  }),
  company: () => ({
    '@context': context,
	  '@type': 'AboutPage',
    '@id': pageUrl(ROUTES.company.path),
    name: 'Company | Yellow',
    description: '✔ Meet the team behind our web and mobile apps. ✔ Skilled techies and great people. Yellow - we are the people!',
    url: pageUrl(ROUTES.company.path),
    image: logoUrl,
  }),
  customChatApp: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Сhat app development company | Chat app developers | Yellow',
    description: `Yellow has more than 5+ years of dedication to the development of chat apps.
                  ✔ 10+ successfully delivered chat apps. ✔ Let's get in touch!`,
    breadcrumb: 'Homepage > Custom chat app development company',
  }),
  customMobileApp: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Custom mobile app development company | Yellow',
    description: 'The best talents for Mobile App Development are here. Hire an experienced team to work on your idea.',
    breadcrumb: 'Homepage > Custom mobile app development company',
  }),
  customIOSApp: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'iOS Mobile App Development Company | Yellow',
    description: 'Yellow can provide you with iOS development services. If you want to create an iPhone or iPad app, we are here to help.',
    breadcrumb: 'Homepage > iOS App Development Services',
  }),
  customAndroidApp: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Custom Android App Development Company | Yellow',
    description: 'Yellow is ready to provide you with Android development services to bring your idea to life.',
    breadcrumb: 'Homepage > Android App Development Services',
  }),
  customWebApp: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Custom web application development company',
    description: `Our team is ready to provide you with web development services.
                  We are working with websites, PWAs, chatting applications, and landing pages.`,
    breadcrumb: 'Homepage > Custom web application development company',
  }),
  designServices: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'UI/UX design services',
    description: `Visual content matters, that is where UI/UX design comes into play.
                  Users love good-looking software. Make mobile your app or website captivating with Yellow.`,
    breadcrumb: 'Homepage > UI/UX design services',
  }),
  mvpDevelopment: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'MVP development company | Yellow',
    description: 'A minimum viable product will help you get enough feedback to determine whether you should '
      + 'continue a given project. Yellow is ready to help with your MVP development.',
    breadcrumb: 'Homepage > MVP development services',
  }),
  cloudDevelopment: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Cloud app development company | Yellow',
    description: 'If your application needs a strong cloud backup, Yellow is ready to help you with cloud app development.',
    breadcrumb: 'Homepage > Cloud app development services',
  }),
  mlDevelopment: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Machine Learning App Development Company | Yellow',
    description: 'If you want to boost your business with a machine learning solution, Yellow is here to back you up',
    breadcrumb: 'Homepage > Machine Learning Development Services',
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
    const mainEntity = faqList.map(({
      question,
      answer,
      longAnswer,
    }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer || documentToPlainTextString(longAnswer),
      },
    }));

    return ({
      '@context': context,
      '@type': 'FAQPage',
      mainEntity,
    });
  },
};
