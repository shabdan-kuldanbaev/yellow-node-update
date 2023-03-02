import { createSlice } from '@reduxjs/toolkit';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { setRawPayload } from 'utils/redux';

const initialState = {
  isMobileMenuOpened: false,
  isMobileCategotiesOpened: false,
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
        hasFeedbackForm = false,
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
  firstPageLoaded,
  pageFetchingStarted,
  pageFetchingSucceeded,
  pageFetchingFailed,
  pageFetched,
} = layoutSlice.actions;

export default layoutSlice.reducer;
