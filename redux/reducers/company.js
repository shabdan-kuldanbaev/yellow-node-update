import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isLoading: false,
  team: {},
  error: {},
  whatMakesSpecial: {},
};

const handlers = {
  [actionTypes.LOAD_TEAM_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.LOAD_TEAM_SUCCESS]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    team: payload,
  }),
  [actionTypes.LOAD_TEAM_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  [actionTypes.LOAD_SPECIAL_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.LOAD_SPECIAL_SUCCESS]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    whatMakesSpecial: payload,
  }),
  [actionTypes.LOAD_SPECIAL_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  DEFAULT: (state) => state,
};

const companyReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default companyReducer;
