import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isLoading: false,
  single: {},
  all: [],
  related: [],
  nearby: {},
  found: [],
  searchMessage: '',
  totalCount: 0,
  error: {},
  limit: {
    desktop: 11,
    mobile: 4,
  },
};

const handlers = {
  [actionTypes.GET_ARTICLE_SUCCESS]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    single: payload,
  }),
  [actionTypes.GET_ARTICLE_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  [actionTypes.LOAD_ARTICLES_SUCCESS]: (state, { payload: { items, total } }) => ({
    ...state,
    isLoading: false,
    all: items,
    totalCount: total,
  }),
  [actionTypes.LOAD_ARTICLES_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  [actionTypes.LOAD_RELATED_SUCCESS]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    related: payload,
  }),
  [actionTypes.LOAD_RELATED_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  [actionTypes.LOAD_NEARBY_SUCCESS]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    nearby: payload,
  }),
  [actionTypes.LOAD_NEARBY_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  [actionTypes.FIND_ARTICLES_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.FIND_ARTICLES_SUCCESS]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    found: payload,
    searchMessage: payload.length ? '' : 'Nothing Found. Please try again with some different keywords.',
  }),
  [actionTypes.FIND_ARTICLES_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  [actionTypes.CLEAR_FOUND_ARTICLES]: (state) => ({
    ...state,
    found: [],
    searchMessage: '',
  }),
  [actionTypes.CLEAR_SEARCH_MESSAGE]: (state) => ({ ...state, searchMessage: '' }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
