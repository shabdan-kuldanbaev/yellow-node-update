import { actionTypes } from 'actions/actionTypes';
import { getDocumentFields } from 'utils/helper';

const initialState = {
  isMobileMenuOpened: false,
  isMobileCategotiesOpened: false,
  isMobileResolutions: null,
  isTabletResolutions: null,
  isPageLoading: false,
  isFullResolution: false,
  components: {
    main: null,
  },
};

const handlers = {
  [actionTypes.SET_MOBILE_MENU_STATE]: (state, { payload }) => ({ ...state, isMobileMenuOpened: payload }),
  [actionTypes.SET_MOBILE_CATEGORIES_STATE]: (state, { payload }) => ({ ...state, isMobileCategotiesOpened: payload }),
  [actionTypes.SET_MOBILE_RESOLUTION]: (state, { payload }) => ({ ...state, isMobileResolutions: payload }),
  [actionTypes.SET_TABLET_RESOLUTION]: (state, { payload }) => ({ ...state, isTabletResolutions: payload }),
  [actionTypes.SET_PAGE_LOADING]: (state, { payload }) => ({ ...state, isPageLoading: payload }),
  [actionTypes.SET_FULL_RESOLUTION]: (state, { payload }) => ({ ...state, isFullResolution: payload }),
  [actionTypes.FETCH_PAGE_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.FETCH_PAGE_SUCCESS]: (state, { payload }) => {
    const { contentModules } = getDocumentFields(
      (payload && payload[0]) ? payload[0] : {},
      ['contentModules'],
    );

    return ({
      ...state,
      isLoading: false,
      components: {
        main: contentModules,
      },
    });
  },
  [actionTypes.FETCH_COMPANY_DATA_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
