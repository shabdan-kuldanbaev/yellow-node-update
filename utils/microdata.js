import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import {
  ROUTES,
  IMAGES,
  CONTACTS_DATA,
} from 'utils/constants';
import { rootUrl } from 'utils/helper';

function pageUrl(pagePath = '') {
  return `${rootUrl}${pagePath}`;
}

const context = 'https://schema.org';
const logoUrl = `${rootUrl}${IMAGES.roundLogo}`;

const {
  email,
  telephoneNumbers,
  socialMedia,
} = CONTACTS_DATA;

const publisherMicrodata = {
  '@type': 'Organization',
  name: 'Yellow Systems',
  logo: {
    '@type': 'ImageObject',
    url: logoUrl,
  },
};

const SERVICE_CATEGORY = {
  fintech: 'Fintech Development Services',
};

const addressMicrodata = [
  {
    '@type': 'PostalAddress',
    addressCountry: 'USA',
    addressRegion: 'St San Francisco',
    streetAddress: '415 Mission Street',
  },
  {
    '@type': 'PostalAddress',
    addressCountry: 'Israel',
    addressRegion: 'Tel Aviv',
    streetAddress: 'Ahad Ha\'Am 9',
  },
  {
    '@type': 'PostalAddress',
    addressCountry: 'Argentina',
    addressRegion: 'Buenos Aires',
    streetAddress: 'Av. Corrientes 1312',
  },
  {
    '@type': 'PostalAddress',
    addressCountry: 'Poland',
    addressRegion: 'Warszawa 00-8P55',
    streetAddress: 'Grzybowska 62',
  },
];

const navigationMicrodata = [
  {
    '@context': context,
    '@type': 'SiteNavigationElement',
    name: 'About Us | Yellow',
    url: pageUrl(ROUTES.company.path),
  },
  {
    '@context': context,
    '@type': 'SiteNavigationElement',
    name: 'Works | Yellow',
    url: pageUrl(ROUTES.portfolio.path),
  },
  {
    '@context': context,
    '@type': 'SiteNavigationElement',
    name: 'Blog | Yellow',
    url: pageUrl(ROUTES.blog.path),
  },
  {
    '@context': context,
    '@type': 'SiteNavigationElement',
    name: 'Contact Us',
    url: pageUrl(ROUTES.contact.path),
  },
];

const nameMicrodata = {
  name: 'Yellow',
  alternateName: 'Yellow Systems',
};

const professionalServiceMicrodata = {
  address: addressMicrodata,
  '@context': context,
  '@type': 'ProfessionalService',
  ...nameMicrodata,
  url: pageUrl(ROUTES.company.path),
  sameAs: socialMedia.map((item) => item.link),
  priceRange: '$$-$$$$',
  telephone: telephoneNumbers,
  email,
};

const OFFERS = {
  [ROUTES.lendingSoftwareDevelopment]: [
    {
      name: 'P2P lending solutions development',
      description: 'Empower your P2P lending platform with our top-notch software development services, '
      + 'designed to enhance user experience and maximize profitability.',
    }, {
      name: 'Crowdfunding platforms development',
      description: 'Transform your crowdfunding vision into reality with our expert software development '
      + 'services that deliver seamless and secure platforms tailored to your unique needs.',
    }, {
      name: 'Credit risk reporting',
      description: 'Optimize your credit risk management strategy with our comprehensive credit risk reporting '
      + 'software, designed to provide accurate insights and actionable recommendations.',
    }, {
      name: 'Mortgage solutions development ',
      description: 'Streamline the mortgage process and improve customer experience with our customized '
      + 'software development solutions for mortgage lenders and brokers.',
    }, {
      name: 'Document management software development',
      description: 'Efficiently manage your documents with our robust and scalable software development '
      + 'solutions that automate document processing, storage, and retrieval.',
    }, {
      name: 'Loans management software development',
      description: 'Take control of your loan portfolio with our flexible and secure software development '
      + 'solutions that streamline loan origination, servicing, and collections. ',
    },
  ],
};

const CATEGORY = {
  [ROUTES.lendingSoftwareDevelopment]: SERVICE_CATEGORY.fintech,
};

const authorMicrodata = ({ author: { fullName, position } }) => ({
  '@type': 'Person',
  name: fullName,
  jobTitle: position,
});

const getServiceOutput = (output) => ({
  '@type': 'Thing',
  name: output,
});

const getOfferCatalog = (name, offers) => ({
  '@type': 'OfferCatalog',
  name,
  itemListElement: offers.map((offer) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      ...offer,
    },
  })),
});

const getPlace = (address) => ({
  '@type': 'Place',
  address,
});

const getServiceChannel = (serviceUrl) => ({
  '@type': 'ServiceChannel',
  serviceUrl,
  name: 'Ready to get started?',
  description: 'Fill in this form orsend us an e-mail',
  servicePhone: {
    '@type': 'ContactPoint',
    telephone: '+1 (302) 213-37-98',
    name: 'Yellow Sales Contact Point',
    description: 'Yellow Sales phone number',
    contactType: 'sales',
    availableLanguage: {
      '@type': 'Language',
      name: 'English',
      alternateName: 'en',
    },
  },
});

const getServiceMicrodata = (route) => ({
  '@context': context,
  '@type': 'Service',
  provider: publisherMicrodata,
  name: route.title,
  alternateName: `${route.title} | Yellow`,
  description: route.description,
  providerMobility: 'dynamic',
  category: CATEGORY[route],
  serviceType: route.title,
  availableChannel: getServiceChannel(pageUrl(route.path)),
  areaServed: getPlace(addressMicrodata),
  serviceOutput: getServiceOutput(route.title),
  hasOfferCatalog: getOfferCatalog(route.title, OFFERS[route]),
});

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
  homepage: () => ([
    {
      '@context': context,
      '@type': 'WebSite',
      ...nameMicrodata,
      description: '✔ We provide software development services for startups and businesses. ✔ Reach out for a free consultation!',
      url: rootUrl,
      mainEntityOfPage: rootUrl,
      author: publisherMicrodata,
    },
    {
      '@context': context,
      '@type': 'LocalBusiness',
      ...nameMicrodata,
      description: '✔ We provide software development services for startups and businesses. ✔ Reach out for a free consultation!',
      address: addressMicrodata,
      url: rootUrl,
      image: logoUrl,
      telephone: telephoneNumbers,
      priceRange: '$$-$$$$',
    },
    professionalServiceMicrodata,
    ...navigationMicrodata,
  ]),
  contact: () => ([
    {
      '@context': context,
      '@type': 'ContactPage',
      name: 'Contacts | Yellow',
      description: 'Do you have an awesome idea? Reach us for a free consultation on how to build a great software product for your business!',
      url: pageUrl(ROUTES.contact.path),
      image: logoUrl,
    },
    professionalServiceMicrodata,
  ]),
  company: () => ([
    {
      '@context': context,
      '@type': 'AboutPage',
      name: 'About Us | Yellow',
      description: '✔ Meet the team behind our web and mobile apps. ✔ Skilled techies and great people. Yellow - we are the people!',
      url: pageUrl(ROUTES.company.path),
      sameAs: socialMedia.map((item) => item.link),
      image: logoUrl,
      breadcrumb: 'Homepage > Company',
    },
    professionalServiceMicrodata,
  ]),
  customChatApp: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Chat app development company | Chat app developers | Yellow',
    description: `Yellow has more than 5+ years of dedication to the development of chat apps.
                  ✔ 10+ successfully delivered chat apps. ✔ Let's get in touch!`,
    breadcrumb: 'Homepage > Custom chat app development company',
    image: logoUrl,
  }),
  customMobileApp: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Custom mobile app development company | Yellow',
    description: 'The best talents for Mobile App Development are here. Hire an experienced team to work on your idea.',
    breadcrumb: 'Homepage > Custom mobile app development company',
    image: logoUrl,
  }),
  customIOSApp: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'iOS Mobile App Development Company | Yellow',
    description: 'Yellow can provide you with iOS development services. If you want to create an iPhone or iPad app, we are here to help.',
    breadcrumb: 'Homepage > iOS App Development Services',
    image: logoUrl,
  }),
  customAndroidApp: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Custom Android App Development Company | Yellow',
    description: 'Yellow is ready to provide you with Android development services to bring your idea to life.',
    breadcrumb: 'Homepage > Android App Development Services',
    image: logoUrl,
  }),
  prototypingServices: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Mobile App Prototyping Services | Yellow',
    description: 'Prototyping is an important stage in mobile app development. Complete it with Yellow!',
    breadcrumb: 'Homepage > Mobile App Prototyping Services',
    image: logoUrl,
  }),
  customWebApp: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Web Application Development Services',
    description: `Our team is ready to provide you with web development services.
                  We are working with websites, PWAs, chatting applications, and landing pages.`,
    breadcrumb: 'Homepage > Web Application Development Services',
    image: logoUrl,
  }),
  fintechDevelopment: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Fintech Software Development Services',
    description: 'Build a successul fintech solution',
    breadcrumb: 'Homepage > Fintech Software Development Services',
    image: logoUrl,
  }),
  erpDevelopment: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Custom ERP Software Development Services ',
    description: 'Custom ERP software development services will help you achieve flexibility and manage your business more consciously.',
    breadcrumb: 'Homepage > Custom ERP Software Development Services ',
    image: logoUrl,
  }),
  designServices: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'UI/UX design services',
    description: `Visual content matters, that is where UI/UX design comes into play.
                  Users love good-looking software. Make mobile your app or website captivating with Yellow.`,
    breadcrumb: 'Homepage > UI/UX design services',
    image: logoUrl,
  }),
  discoveryPhase: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Project Discovery Phase in Custom Software Development',
    description: 'Discovery phase of a project is an important part of software development. '
    + 'Learn more about how Yellow runs a discovery phase to benefit your business.',
    breadcrumb: 'Homepage > Project Discovery Phase in Custom Software Development',
  }),
  mvpDevelopment: () => ([
    {
      '@context': context,
      '@type': 'WebPage',
      name: 'MVP App Development Services | Yellow',
      description: 'A minimum viable product will help you get enough feedback to determine whether you should '
      + 'continue a given project. Yellow is ready to help with your MVP development.',
      breadcrumb: 'Homepage > MVP App Development Services',
      image: logoUrl,
    },
    getServiceMicrodata(ROUTES.mvpDevelopment),
  ]),
  lendingSoftwareDevelopment: () => ([
    {
      '@context': context,
      '@type': 'WebPage',
      name: 'Lending Software Development Services | Yellow',
      description: 'Loan lending app development services for your business. We are ready to help you realize your idea.',
      breadcrumb: 'Lending Software Development Services | Yellow',
      image: logoUrl,
    },
    getServiceMicrodata(ROUTES.lendingSoftwareDevelopment),
  ]),
  cloudDevelopment: () => ([
    {
      '@context': context,
      '@type': 'WebPage',
      name: 'Cloud Application Development Services | Yellow',
      description: 'If your application needs a strong cloud backup, Yellow is ready to help you with cloud app development.',
      breadcrumb: 'Homepage > Cloud Application Development Services',
      image: logoUrl,
    }, {
      '@context': context,
      '@type': 'Service',
      name: 'Cloud Application Development Services',
      alternateName: 'Cloud app development | Yellow',
      description: 'If your application needs a strong cloud backup, Yellow is ready to help you with cloud app development.',
      provider: publisherMicrodata,
    },
  ]),
  crossPlatformDevelopmentServices: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Cross-Platform App Development Services | Yellow',
    description: 'Your cross-platform application will rock the stage and Yellow is ready to make it happen.',
    breadcrumb: 'Homepage > Cross-Platform App Development Services',
    image: logoUrl,
  }),
  mlDevelopment: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'Machine Learning App Development Company | Yellow',
    description: 'If you want to boost your business with a machine learning solution, Yellow is here to back you up',
    breadcrumb: 'Homepage > Machine Learning Development Services',
    image: logoUrl,
  }),
  devOpsDevelopment: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'DevOps Development Company | Yellow',
    description: 'If your company wants to integrate DevOps service into its processes and get all '
    + 'the benefits this technology offers, Yellow is ready to lend a hand!',
    breadcrumb: 'Homepage > DevOps Development Company',
    image: logoUrl,
  }),
  aiDevelopment: () => ({
    '@context': context,
    '@type': 'WebPage',
    name: 'AI Software Development Services: Best Choice for Your Business | Yellow',
    description: 'Yellow is an AI software development company that can provide you with top-notch artificial intelligence application development.',
    breadcrumb: 'Homepage > AI Software development services',
    image: logoUrl,
  }),
  tradingSoftwareDevelopment: () => ([
    {
      '@context': context,
      '@type': 'WebPage',
      name: 'Custom Trading Software Development Company | Yellow',
      description: 'If you plan to start trading software development, we can help. Let’s discuss your idea in detail.',
      breadcrumb: 'Homepage > Custom Trading Software Development Company',
      image: logoUrl,
    },
    {
      '@context': context,
      '@type': 'Service',
      name: 'Custom Trading Software Development Services',
      alternateName: 'Custom Trading Software Development Services | Yellow',
      description: 'If you plan to start trading software development, we can help. Let’s discuss your idea in detail.',
      provider: publisherMicrodata,
    },
  ]),
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
