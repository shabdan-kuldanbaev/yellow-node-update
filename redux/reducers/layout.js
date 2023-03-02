import { createSlice } from '@reduxjs/toolkit';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { setRawPayload } from 'utils/redux';

const initialState = {
  isMobileMenuOpened: false,
  isMobileCategotiesOpened: false,
  // Extract Resolutions to separate slice to avoid state reset on hydration
  isMobileResolutions: null,
  isTabletResolutions: null,
  isFullResolution: null,
  isPageReadyToDisplay: false,
  isFirstPageLoaded: false,
  isDropMenuOpened: false,
  components: {
    main: null,
    hasFeedbackForm: false,
  },
  metaData: {
    metaTitle: '',
    metaDescription: '',
    metaRobots: '',
    ogImage: '',
  },
  title: null,
  subtitle: null,
  background: null,
  error: null,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    // Menus
    desktopMenuOpened: setRawPayload('isDropMenuOpened'),
    mobileMenuOpened: setRawPayload('isMobileMenuOpened'),
    mobileCategoriesOpened: setRawPayload('isMobileCategotiesOpened'),

    // Resolutions
    mobileResolutionSet(state) {
      state.isMobileResolutions = true;
      state.isTabletResolutions = false;
      state.isFullResolution = false;
    },
    tabletResolutionSet(state) {
      state.isMobileResolutions = false;
      state.isTabletResolutions = true;
      state.isFullResolution = false;
    },
    desktopResolutionSet(state) {
      state.isMobileResolutions = false;
      state.isTabletResolutions = false;
      state.isFullResolution = true;
    },

    // Fetching Data
    firstPageLoaded: setRawPayload('isFirstPageLoaded'),
    pageFetchingStarted(state) {
      state.isPageReadyToDisplay = false;
      state.isDropMenuOpened = false;
      state.isMobileMenuOpened = false;
    },
    pageFetchingSucceeded(state) {
      state.isPageReadyToDisplay = true;
    },
    pageFetchingFailed(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    pageFetched(state, { payload }) {
      const {
        contentModules,
        hasFeedbackForm,
        pageTitle = null,
        subtitle = null,
        metaTitle = '',
        metaDescription = '',
        metaRobots = '',
        ogImage,
        background = null,
      } = getDocumentFields((payload || {}));

      Object.assign(state, {
        error: null,
        isLoading: false,
        isPageReadyToDisplay: true,
        components: {
          main: contentModules,
          hasFeedbackForm,
        },
        metaData: {
          metaTitle,
          metaDescription,
          metaRobots,
          ogImage: getFileUrl(ogImage),
        },
        title: pageTitle,
        subtitle,
        background,
      });
    },
  },
});

// eslint-disable-next-line default-param-last
export const {
  desktopMenuOpened,
  mobileMenuOpened,
  mobileCategoriesOpened,
  mobileResolutionSet,
  tabletResolutionSet,
  desktopResolutionSet,
  firstPageLoaded,
  pageFetchingStarted,
  pageFetchingSucceeded,
  pageFetchingFailed,
  pageFetched,
} = layoutSlice.actions;

export default layoutSlice.reducer;
