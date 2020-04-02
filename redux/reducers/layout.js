import Immutable from 'immutable';
import { actionTypes } from 'actions/actionTypes';

const initialState = Immutable.fromJS({
  isMobileMenuOpened: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET_MOBILE_MENU_STATE:
    return state.set('isMobileMenuOpened', action.payload);

  default:
    return state;
  }
};
