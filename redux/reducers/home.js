import Immutable from 'immutable';
import { actionTypes } from 'actions/actionTypes';

const initialState = Immutable.fromJS({
  isModelLoaded: true, // TODO false
  scrollOfAddedFooter: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET_MODEL_LOADING:
    return state.set('isModelLoaded', action.payload);

  case actionTypes.SET_SCROLL_OF_ADDED_FOOTER:
    return state.set('scrollOfAddedFooter', action.payload);

  default:
    return state;
  }
};
