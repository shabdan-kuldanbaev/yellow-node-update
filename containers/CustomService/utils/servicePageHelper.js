import { PAGES } from 'utils/constants';
import { microdata } from 'utils/microdata';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';

export const getServicePageInfo = (pathname) => {
  switch (pathname) {
  case PAGES.androidDevelopmentServices:
    return {
      pageMicrodata: microdata.customAndroidApp(),
      breadcrumbs: pagesBreadcrumbs.androidDevelopmentServices(),
    };

  case PAGES.developmentServices:
    return {
      pageMicrodata: microdata.customIOSApp(),
      breadcrumbs: pagesBreadcrumbs.developmentServices(),
    };

  case PAGES.customChatApp:
    return {
      pageMicrodata: microdata.customChatApp(),
      breadcrumbs: pagesBreadcrumbs.customChatApp(),
    };

  case PAGES.customMobileApp:
    return {
      pageMicrodata: microdata.customMobileApp(),
      breadcrumbs: pagesBreadcrumbs.customMobileApp(),
    };

  case PAGES.customWebApp:
    return {
      pageMicrodata: microdata.customWebApp(),
      breadcrumbs: pagesBreadcrumbs.customWebApp(),
    };

  case PAGES.designServices:
    return {
      pageMicrodata: microdata.designServices(),
      breadcrumbs: pagesBreadcrumbs.designServices(),
    };

  case PAGES.mvpDevelopment:
    return {
      pageMicrodata: microdata.mvpDevelopment(),
      breadcrumbs: pagesBreadcrumbs.mvpDevelopment(),
    };

  default:
    return {
      pageMicrodata: null,
      breadcrumbs: null,
    };
  }
};
