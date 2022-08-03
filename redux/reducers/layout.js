import { actionTypes } from 'actions/actionTypes';
import { getDocumentFields, getFileUrl } from 'utils/helper';

const initialState = {
  isMobileMenuOpened: false,
  isMobileCategotiesOpened: false,
  isMobileResolutions: null,
  isTabletResolutions: null,
  isFullResolution: false,
  isLoading: false,
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
    ogImage: '',
  },
  title: null,
  subtitle: null,
};

const handlers = {
  [actionTypes.SET_MOBILE_MENU_STATE]: (state, { payload }) => ({ ...state, isMobileMenuOpened: payload }),
  [actionTypes.SET_MOBILE_CATEGORIES_STATE]: (state, { payload }) => ({ ...state, isMobileCategotiesOpened: payload }),
  [actionTypes.SET_MOBILE_RESOLUTION]: (state, { payload }) => ({ ...state, isMobileResolutions: payload }),
  [actionTypes.SET_TABLET_RESOLUTION]: (state, { payload }) => ({ ...state, isTabletResolutions: payload }),
  [actionTypes.SET_FULL_RESOLUTION]: (state, { payload }) => ({ ...state, isFullResolution: payload }),
  [actionTypes.SET_FIRST_PAGE_LOADED]: (state, { payload }) => ({ ...state, isFirstPageLoaded: payload }),
  [actionTypes.FETCH_PAGE_SUCCESS]: (state, { payload }) => {
    const {
      contentModules,
      hasFeedbackForm,
      pageTitle,
      subtitle,
      metaTitle,
      ogImage,
      metaDescription,
      metaRobots,
    } = getDocumentFields(
      (payload && payload[0]) ? payload[0] : {},
      [
        'contentModules',
        'hasFeedbackForm',
        'pageTitle',
        'subtitle',
        'metaTitle',
        'metaDescription',
        'ogImage',
        'metaRobots',
      ],
    );

    return ({
      ...state,
      isLoading: false,
      components: {
        main: contentModules,
        hasFeedbackForm,
      },
      metaData: {
        metaTitle,
        metaDescription,
        ogImage: getFileUrl(ogImage),
        metaRobots,
      },
      title: pageTitle,
      subtitle,
    });
  },
  [actionTypes.FETCH_PAGE_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  [actionTypes.SET_PAGE_READY_TO_DISPLAY_PENDING]: (state) => ({ ...state, isPageReadyToDisplay: false }),
  [actionTypes.SET_PAGE_READY_TO_DISPLAY_SUCCESS]: (state) => ({ ...state, isPageReadyToDisplay: true }),
  [actionTypes.SET_PAGE_READY_TO_DISPLAY_FAILED]: (state, { payload }) => ({
    ...state,
    isPageReadyToDisplay: false,
    error: payload,
  }),
  [actionTypes.SET_PAGE_READY_TO_DISPLAY]: (state, { payload }) => ({ ...state, isPageReadyToDisplay: payload }),
  [actionTypes.SET_IS_DROP_MENU_STATE]: (state, { payload }) => ({ ...state, isDropMenuOpened: payload }),
  [actionTypes.SET_DATA_LOADING]: (state, { payload }) => ({ ...state, isLoading: payload }),
  DEFAULT: (state) => state,
};

// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
