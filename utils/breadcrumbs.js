import { isNumeric } from 'utils/helper';
import { CATEGORY_TAGS, ROUTES } from 'utils/constants';

export const pagesBreadcrumbs = {
  blog: (category) => {
    const breadcrumbs = [
      {
        title: ROUTES.blog.title,
        to: ROUTES.blog.path,
      },
    ];

    if (category && !isNumeric(category)) {
      breadcrumbs.push({
        title: CATEGORY_TAGS[category],
        to: ROUTES.blog.getRoute(category),
      });
    }

    return breadcrumbs;
  },
  article: (title, slug) => {
    const breadcrumbs = [
      {
        title: ROUTES.blog.title,
        to: ROUTES.blog.path,
      },
    ];

    if (title && slug) {
      breadcrumbs.push({
        title,
        to: ROUTES.article.getRoute(slug),
      });
    }

    return breadcrumbs;
  },
  company: () => ([
    {
      title: ROUTES.company.title,
      to: ROUTES.company.path,
    },
  ]),
  contact: () => ([
    {
      title: ROUTES.contact.title,
      to: ROUTES.contact.path,
    },
  ]),
  portfolio: () => ([
    {
      title: ROUTES.portfolio.title,
      to: ROUTES.portfolio.path,
    },
  ]),
  process: () => ([
    {
      title: ROUTES.process.title,
      to: ROUTES.process.path,
    },
  ]),
  customChatApp: () => ([
    {
      title: ROUTES.customChatApp.title,
      to: ROUTES.customChatApp.path,
    },
  ]),
  customMobileApp: () => ([
    {
      title: ROUTES.customMobileApp.title,
      to: ROUTES.customMobileApp.path,
    },
  ]),
  customWebApp: () => ([
    {
      title: ROUTES.customWebApp.title,
      to: ROUTES.customWebApp.path,
    },
  ]),
  designServices: () => ([
    {
      title: ROUTES.designServices.title,
      to: ROUTES.designServices.path,
    },
  ]),
  developmentServices: () => ([
    {
      title: ROUTES.developmentServices.title,
      to: ROUTES.developmentServices.path,
    },
  ]),
  androidDevelopmentServices: () => ([
    {
      title: ROUTES.androidDevelopmentServices.title,
      to: ROUTES.androidDevelopmentServices.path,
    },
  ]),
  mvpDevelopment: () => ([
    {
      title: ROUTES.mvpDevelopment.title,
      to: ROUTES.mvpDevelopment.path,
    },
  ]),
  cloudDevelopment: () => ([
    {
      title: ROUTES.cloudDevelopment.title,
      to: ROUTES.cloudDevelopment.path,
    },
  ]),
  mlDevelopment: () => ([
    {
      title: ROUTES.mlDevelopment.title,
      to: ROUTES.mlDevelopment.path,
    },
  ]),
  privacyPolicy: () => ([
    {
      title: ROUTES.privacyPolicy.title,
      to: ROUTES.privacyPolicy.path,
    },
  ]),
  termsAndConditions: () => ([
    {
      title: ROUTES.termsAndConditions.title,
      to: ROUTES.termsAndConditions.path,
    },
  ]),
};
