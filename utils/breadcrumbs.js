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
  article: (title, slug) => ([
    {
      title: ROUTES.blog.title,
      to: ROUTES.blog.path,
    },
    {
      title,
      to: ROUTES.article.getRoute(slug),
    },
  ]),
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
};
