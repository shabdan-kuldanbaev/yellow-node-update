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

export const selectIsPageReadyToDisplay = (state) => state.layout.isPageReadyToDisplay;

export const selectIsFirstPageLoaded = (state) => state.layout.isFirstPageLoaded;

export const selectImageCarousel = (state) => getMain(state, BLOCKS_SLUGS.imageCarousel);

export const selectWhatMakesSpecial = (state) => getMain(state, BLOCKS_SLUGS.companyPageWhatMakesSpecial);

export const selectCompanyReviews = (state) => getMain(state, BLOCKS_SLUGS.companyReviews);

export const selectManagementTeam = (state) => getMain(state, BLOCKS_SLUGS.compnayPageManagementTeam);

export const selectCompanyPhoto = (state) => getMain(state, BLOCKS_SLUGS.contactPageCompanyPhoto);

export const selectComponents = (state) => state.layout.components;

export const selectMetaData = (state) => state.layout.metaData;

export const selectIsDropMenuOpened = (state) => state.layout.isDropMenuOpened;
