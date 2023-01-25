import { PAGES } from 'utils/constants';
import { microdata } from 'utils/microdata';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';

export const getServicePageInfo = (pathname) => {
  switch (pathname) {
  case PAGES.cloudDevelopment:
    return {
      pageMicrodata: microdata.cloudDevelopment(),
      breadcrumbs: pagesBreadcrumbs.cloudDevelopment(),
    };

  case PAGES.crossPlatformDevelopmentServices:
    return {
      pageMicrodata: microdata.crossPlatformDevelopmentServices(),
      breadcrumbs: pagesBreadcrumbs.crossPlatformDevelopmentServices(),
    };

  case PAGES.androidDevelopmentServices:
    return {
      pageMicrodata: microdata.customAndroidApp(),
      breadcrumbs: pagesBreadcrumbs.androidDevelopmentServices(),
    };

  case PAGES.prototypingServices:
    return {
      pageMicrodata: microdata.prototypingServices(),
      breadcrumbs: pagesBreadcrumbs.prototypingServices(),
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

  case PAGES.mlDevelopment:
    return {
      pageMicrodata: microdata.mlDevelopment(),
      breadcrumbs: pagesBreadcrumbs.mlDevelopment(),
    };

  case PAGES.fintechDevelopment:
    return {
      breadcrumbs: pagesBreadcrumbs.fintechDevelopment(),
    };

  case PAGES.discoveryPhase:
    return {
      breadcrumbs: pagesBreadcrumbs.discoveryPhase(),
    };

  case PAGES.erpDevelopment:
    return {
      breadcrumbs: pagesBreadcrumbs.erpDevelopment(),
    };

  case PAGES.devOpsDevelopment:
    return {
      breadcrumbs: pagesBreadcrumbs.devOpsDevelopment(),
    };

  case PAGES.aiDevelopment:
    return {
      breadcrumbs: pagesBreadcrumbs.aiDevelopment(),
    };

  case PAGES.dataScienceDevelopment:
    return {
      breadcrumbs: pagesBreadcrumbs.dataScienceDevelopment(),
    };

  case PAGES.tradingSoftwareDevelopment:
    return {
      breadcrumbs: pagesBreadcrumbs.tradingSoftwareDevelopment(),
    };

  default:
    return {
      pageMicrodata: null,
      breadcrumbs: null,
    };
  }
};
