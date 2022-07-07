import { actionTypes } from 'actions/actionTypes';

const initialState = {
  json: [],
  isLoading: false,
  error: {},
};

const handlers = {
  [actionTypes.GET_JSON_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.GET_JSON_SUCCESS]: (state, { payload }) => ({
    ...state,
    json: payload,
    isLoading: false,
  }),
  [actionTypes.GET_JSON_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  DEFAULT: (state) => state,
};

// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
