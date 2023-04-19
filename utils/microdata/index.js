import { ROUTES } from 'utils/constants';
import {
  organisationMicrodata,
  websiteMicrodata,
  localBusinessMicrodata,
  professionalServiceMicrodata,
  aboutPageMicrodata,
  CATEGORY,
  OFFERS,
  addresses,
} from './data';
import {
  getArticleMicrodata,
  getBreadcrumbsMicrodata,
  getServiceMicrodata,
} from './utils';
import { deprecatedData } from './deprecatedData';

export function getPageMicrodata(page, { breadcrumbs, articleData } = {}) {
  const breadcrumbsMicrodata = getBreadcrumbsMicrodata(breadcrumbs);
  const microdataArray = [
    // TODO: uncomment when deprecated data will be replaced
    // webpageMicrodata,
    websiteMicrodata,
    organisationMicrodata,
    breadcrumbsMicrodata,
  ];

  switch (page) {
  case ROUTES.homepage.slug:
  case ROUTES.contact.slug:
    microdataArray.push(localBusinessMicrodata);
    microdataArray.push(professionalServiceMicrodata);

    break;

  case ROUTES.company.slug:
    microdataArray.push(localBusinessMicrodata);
    microdataArray.push(professionalServiceMicrodata);
    microdataArray.push(aboutPageMicrodata);

    break;

  case ROUTES.blog.slug:
  case ROUTES.portfolio.slug:
  case ROUTES.project.slug:
  case ROUTES.process.slug:
  case ROUTES.termsAndConditions.slug:
  case ROUTES.cookiesPolicy.slug:
  case ROUTES.privacyPolicy.slug:
    break;

  case ROUTES.article.slug:
    microdataArray.push(getArticleMicrodata({ ...articleData, organisationMicrodata }));

    break;

  default:
    const currentRoute = Object.values(ROUTES).find((route) => route.slug === page);

    const oldData = deprecatedData[page];

    if (oldData) {
      microdataArray.push(oldData);

      break;
    }

    microdataArray.push(getServiceMicrodata(currentRoute, {
      organisationMicrodata,
      category: CATEGORY[page],
      offers: OFFERS[page],
      addresses,
    }));

    break;
  }

  return microdataArray;
}
