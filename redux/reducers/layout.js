import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isMobileMenuOpened: false,
  isMobileCategotiesOpened: false,
};

const handlers = {
  [actionTypes.SET_MOBILE_MENU_STATE]: (state, { payload }) => ({ ...state, isMobileMenuOpened: payload }),
  [actionTypes.SET_MOBILE_CATEGORIES_STATE]: (state, { payload }) => ({ ...state, isMobileCategotiesOpened: payload }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
