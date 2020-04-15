import Immutable from 'immutable';
import { actionTypes } from 'actions/actionTypes';

const initialState = Immutable.fromJS({
  isLoading: false,
  single: {},
  all: [],
  totalCount: null,
  error: {},
  limit: { desktop: 11, mobile: 4, },
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ARTICLE_PENDING:
      return state.set('isLoading', true);

    case actionTypes.GET_ARTICLE_SUCCESS:
      return state
        .set('isLoading', false)
        .set('single', action.payload);

    case actionTypes.GET_ARTICLE_FAILED:
      return state
        .set('isLoading', false)
        .set('error', action.payload);

    case actionTypes.LOAD_ARTICLES_PENDING:
      return state.set('isLoading', true);

    case actionTypes.LOAD_ARTICLES_SUCCESS:
      return state
        .set('isLoading', false)
        .set('all', action.payload);

    case actionTypes.LOAD_ARTICLES_FAILED:
      return state
        .set('isLoading', false)
        .set('error', action.payload);

    case actionTypes.SET_TOTAL_ARTICLES_COUNT:
      return state.set('totalCount', action.payload);

    default:
      return state;
  }
};
