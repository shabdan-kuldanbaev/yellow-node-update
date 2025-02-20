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
  getPersonMicrodata,
} from './utils';
import { deprecatedData } from './deprecatedData';

export function getPageMicrodata(
  page,
  {
    breadcrumbs,
    microData,
  } = {},
) {
  const microdataArray = [
    // TODO: uncomment when deprecated data will be replaced
    // webpageMicrodata,
    websiteMicrodata,
    organisationMicrodata,
  ];

  const breadcrumbsMicrodata = getBreadcrumbsMicrodata(breadcrumbs);

  if (breadcrumbsMicrodata) {
    microdataArray.push(breadcrumbsMicrodata);
  }

  switch (page) {
  case ROUTES.homepage.slug:
  case ROUTES.contact.slug:
    microdataArray.push(localBusinessMicrodata);
    microdataArray.push(professionalServiceMicrodata);

    break;

  case ROUTES.company.slug:
  case ROUTES.whyUs.slug:
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
    microdataArray.push(getArticleMicrodata({ ...microData, organisationMicrodata }));

    break;

  case ROUTES.person.slug:
    microdataArray.push(getPersonMicrodata(microData));

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
