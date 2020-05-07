import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isLoading: false,
  single: {},
  all: [],
  totalCount: null,
  error: {},
  limit: { desktop: 11, mobile: 4 },
};

const handlers = {
  [actionTypes.GET_ARTICLE_PENDING]: (state) => ({
    ...state,
    isLoading: true,
  }),
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
  [actionTypes.LOAD_ARTICLES_PENDING]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [actionTypes.LOAD_ARTICLES_SUCCESS]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    all: payload,
  }),
  [actionTypes.LOAD_ARTICLES_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  [actionTypes.SET_TOTAL_ARTICLES_COUNT]: (state, { payload }) => ({
    ...state,
    totalCount: payload,
  }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
