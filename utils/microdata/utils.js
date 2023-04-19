import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { PHONE_NUMBER } from 'utils/constants/contacts';
import { rootUrl } from 'utils/helper';

function getServiceOutput(output) {
  return {
    '@type': 'Thing',
    name: output,
  };
}

function getOfferCatalog(name, offers) {
  return {
    '@type': 'OfferCatalog',
    name,
    itemListElement: offers.map((offer) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        ...offer,
      },
    })),
  };
}

function getServiceChannel(serviceUrl) {
  return {
    '@type': 'ServiceChannel',
    serviceUrl,
    name: 'Ready to get started?',
    description: 'Fill in this form orsend us an e-mail',
    servicePhone: {
      '@type': 'ContactPoint',
      telephone: PHONE_NUMBER.us,
      name: 'Yellow Sales Contact Point',
      description: 'Yellow Sales phone number',
      contactType: 'sales',
      availableLanguage: {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en',
      },
    },
  };
}

function getPlace(address) {
  return {
    '@type': 'Place',
    address,
  };
}

function getAuthor({ author: { fullName, position } }) {
  return {
    '@type': 'Person',
    name: fullName,
    jobTitle: position,
  };
}

function getAboutArticle({
  metaTitle,
  headImage,
  author,
  organisationMicrodata,
  publishedAt,
  updatedAt,
}) {
  return {
    '@type': 'Article',
    headline: metaTitle,
    image: headImage,
    author: getAuthor({ author }),
    publisher: organisationMicrodata,
    datePublished: publishedAt,
    dateModified: updatedAt,
  };
}

export const context = 'https://schema.org';

export function getPageUrl(pagePath = '') {
  return `${rootUrl}${pagePath}`;
}

export function getFaqMicrodata({ faqList }) {
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
}

export function getBreadcrumbsMicrodata(breadcrumbsList = []) {
  const items = breadcrumbsList.map((breadcrumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: breadcrumb.title,
    item: getPageUrl(breadcrumb.to),
  }));

  return ({
    '@context': context,
    '@type': 'BreadcrumbList',
    itemListElement: items,
  });
}

export function getArticleMicrodata({
  metaTitle,
  title,
  publishedAt,
  updatedAt,
  headImage,
  articleBody,
  author,
  organisationMicrodata,
}) {
  return {
    '@context': context,
    '@type': 'BlogPosting',
    headline: metaTitle,
    name: title,
    datePublished: publishedAt,
    dateModified: updatedAt,
    image: headImage,
    articleBody,
    publisher: organisationMicrodata,
    author: getAuthor({ author }),
    about: getAboutArticle({
      metaTitle,
      headImage,
      author,
      organisationMicrodata,
      publishedAt,
      updatedAt,
    }),
  };
}

export function getServiceMicrodata(page, {
  organisationMicrodata,
  category,
  addresses,
  offers,
}) {
  return {
    '@context': context,
    '@type': 'Service',
    provider: organisationMicrodata,
    name: page.title,
    alternateName: `${page.title} | Yellow`,
    description: page.description,
    providerMobility: 'dynamic',
    category,
    serviceType: page.title,
    availableChannel: getServiceChannel(getPageUrl(page.path)),
    areaServed: getPlace(addresses),
    serviceOutput: getServiceOutput(page.title),
    hasOfferCatalog: getOfferCatalog(page.title, offers),
  };
}
