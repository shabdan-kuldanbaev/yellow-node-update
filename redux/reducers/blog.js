import Immutable from 'immutable';
import { actionTypes } from 'actions/actionTypes';

const initialState = Immutable.fromJS({
  isLoading: false,
  single: {},
  all: [],
  totalCount: null,
  error: {},
  limit: 11,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POST_PENDING:
      return state.set('isLoading', true);

    case actionTypes.GET_POST_SUCCESS:
      return state
        .set('isLoading', false)
        .set('single', action.payload);

    case actionTypes.GET_POST_FAILED:
      return state
        .set('isLoading', false)
        .set('error', action.payload);

    case actionTypes.LOAD_POSTS_PENDING:
      return state.set('isLoading', true);

    case actionTypes.LOAD_POSTS_SUCCESS:
      return state
        .set('isLoading', false)
        .set('all', action.payload);

    case actionTypes.LOAD_POSTS_FAILED:
      return state
        .set('isLoading', false)
        .set('error', action.payload);

    case actionTypes.SET_TOTAL_POSTS_COUNT:
      return state.set('totalCount', action.payload);

    case actionTypes.SET_LIMIT:
      return state.set('limit', action.payload);

    default:
      return state;
  }
};
