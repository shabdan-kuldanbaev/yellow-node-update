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

export const selectIsMobileMenuOpened = (state) => state.layout.isMobileMenuOpened;

export const selectIsMobileCategotiesOpened = (state) => state.layout.isMobileCategotiesOpened;

export const selectIsMobileResolutions = (state) => state.layout.isMobileResolutions;

export const selectIsTabletResolutions = (state) => state.layout.isTabletResolutions;

export const selectIsFullResolutions = (state) => state.layout.isFullResolution;

export const selectIsLoading = (state) => state.layout.isLoading;

export const selectIsPageReadyToDisplay = (state) => state.layout.isPageReadyToDisplay;

export const selectIsLoadingScreenCompleted = (state) => state.layout.isLoadingScreenCompleted;

export const selectHomepageProjectsPreview = (state) => getMain(state, BLOCKS_SLUGS.homepagePreviewProjects);

export const selectImageCarousel = (state) => getMain(state, BLOCKS_SLUGS.imageCarousel);

export const selectPortfolioProjectsPreview = (state) => getMain(state, BLOCKS_SLUGS.portfolioPagePreviewProjects);

export const selectWhatMakesSpecial = (state) => getMain(state, BLOCKS_SLUGS.companyPageWhatMakesSpecial);

export const selectManagementTeam = (state) => getMain(state, BLOCKS_SLUGS.compnayPageManagementTeam);

export const selectCompanyPhoto = (state) => getMain(state, BLOCKS_SLUGS.contactPageCompanyPhoto);

export const selectContacts = (state) => getMain(state, BLOCKS_SLUGS.contactPageContacts);

export const selectProcessPreview = (state) => getMain(state, BLOCKS_SLUGS.processPageProcessPreview);
