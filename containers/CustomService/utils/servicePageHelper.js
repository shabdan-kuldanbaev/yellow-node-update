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

  case PAGES.softwareDevelopmentPrice:
    return {
      pageMicrodata: microdata.softwareDevelopmentPrice(),
      breadcrumbs: pagesBreadcrumbs.softwareDevelopmentPrice(),
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

  case PAGES.crowdfundingPlatform:
    return {
      pageMicrodata: microdata.crowdfundingPlatform(),
      breadcrumbs: pagesBreadcrumbs.crowdfundingPlatform(),
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

  case PAGES.lendingSoftwareDevelopment:
    return {
      pageMicrodata: microdata.lendingSoftwareDevelopment(),
      breadcrumbs: pagesBreadcrumbs.lendingSoftwareDevelopment(),
    };

  case PAGES.paymentGatewayDevelopment:
    return {
      pageMicrodata: microdata.paymentGatewayDevelopment(),
      breadcrumbs: pagesBreadcrumbs.paymentGatewayDevelopment(),
    };

  case PAGES.mlDevelopment:
    return {
      pageMicrodata: microdata.mlDevelopment(),
      breadcrumbs: pagesBreadcrumbs.mlDevelopment(),
    };

  case PAGES.fintechDevelopment:
    return {
      pageMicrodata: microdata.fintechDevelopment(),
      breadcrumbs: pagesBreadcrumbs.fintechDevelopment(),
    };

  case PAGES.discoveryPhase:
    return {
      pageMicrodata: microdata.discoveryPhase(),
      breadcrumbs: pagesBreadcrumbs.discoveryPhase(),
    };

  case PAGES.erpDevelopment:
    return {
      pageMicrodata: microdata.erpDevelopment(),
      breadcrumbs: pagesBreadcrumbs.erpDevelopment(),
    };

  case PAGES.devOpsDevelopment:
    return {
      pageMicrodata: microdata.devOpsDevelopment(),
      breadcrumbs: pagesBreadcrumbs.devOpsDevelopment(),
    };

  case PAGES.aiDevelopment:
    return {
      pageMicrodata: microdata.aiDevelopment(),
      breadcrumbs: pagesBreadcrumbs.aiDevelopment(),
    };

  case PAGES.dataScienceDevelopment:
    return {
      pageMicrodata: microdata.dataScienceDevelopment(),
      breadcrumbs: pagesBreadcrumbs.dataScienceDevelopment(),
    };

  case PAGES.tradingSoftwareDevelopment:
    return {
      breadcrumbs: pagesBreadcrumbs.tradingSoftwareDevelopment(),
      pageMicrodata: microdata.tradingSoftwareDevelopment(),
    };

  case PAGES.eWalletAppDevelopment:
    return {
      breadcrumbs: pagesBreadcrumbs.eWalletAppDevelopment(),
      pageMicrodata: microdata.eWalletAppDevelopment(),
    };

  case PAGES.bankingSoftwareDevelopmentCompany:
    return {
      breadcrumbs: pagesBreadcrumbs.bankingSoftwareDevelopmentCompany(),
      pageMicrodata: microdata.bankingSoftwareDevelopmentCompany(),
    };

  case PAGES.deliveryQualityInYellow:
    return {
      breadcrumbs: pagesBreadcrumbs.deliveryQualityInYellow(),
      pageMicrodata: microdata.deliveryQualityInYellow(),
    };

  case PAGES.penetrationTesting:
    return {
      pageMicrodata: microdata.penetrationTesting(),
      breadcrumbs: pagesBreadcrumbs.penetrationTesting(),
    };

  case PAGES.pwaDevelopmentServices:
    return {
      pageMicrodata: microdata.pwaDevelopmentServices(),
      breadcrumbs: pagesBreadcrumbs.pwaDevelopmentServices(),
    };

  default:
    return {
      pageMicrodata: null,
      breadcrumbs: null,
    };
  }
};
