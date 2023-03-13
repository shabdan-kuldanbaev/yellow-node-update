import { BLOCKS_SLUGS } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';

const getMain = (state, pageSlug) => {
  const { main = null } = state.layout.components;

  if (!main) {
    return null;
  }

  return main.find((module) => {
    const { slug } = getDocumentFields(module, ['slug']);

    return slug === pageSlug;
  });
};

const getCTA = (state) => {
  const { main = null } = state.layout.components;

  if (!main) {
    return null;
  }

  return main.find((modules) => modules.sys.contentType.sys.id === 'link');
};

export const selectIsMobileMenuOpened = (state) => state.layout.isMobileMenuOpened;

export const selectIsMobileCategotiesOpened = (state) => state.layout.isMobileCategotiesOpened;

export const selectIsPageReadyToDisplay = (state) => state.layout.isPageReadyToDisplay;

export const selectIsFirstPageLoaded = (state) => state.layout.isFirstPageLoaded;

export const selectHomepageProjectsPreview = (state) => getMain(state, BLOCKS_SLUGS.homepagePreviewProjects);

export const selectImageCarousel = (state) => getMain(state, BLOCKS_SLUGS.imageCarousel);

export const selectPortfolioProjectsPreview = (state) => getMain(state, BLOCKS_SLUGS.worksPagePreviewProjects);

export const selectWhatMakesSpecial = (state) => getMain(state, BLOCKS_SLUGS.companyPageWhatMakesSpecial);

export const selectCompanyReviews = (state) => getMain(state, BLOCKS_SLUGS.companyReviews);

export const selectManagementTeam = (state) => getMain(state, BLOCKS_SLUGS.compnayPageManagementTeam);

export const selectCompanyPhoto = (state) => getMain(state, BLOCKS_SLUGS.contactPageCompanyPhoto);

export const selectComponents = (state) => state.layout.components;

export const selectMetaData = (state) => state.layout.metaData;

export const selectIsDropMenuOpened = (state) => state.layout.isDropMenuOpened;
