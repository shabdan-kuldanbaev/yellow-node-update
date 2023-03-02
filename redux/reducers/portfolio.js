import { createSlice } from '@reduxjs/toolkit';
import { actionTypes } from 'actions/actionTypes';
import { setRawPayload } from 'utils/redux';

const initialState = {
  error: null,
  tags: [],
  types: [],
};

const handlers = {
  [actionTypes.GET_PORTFOLIO_TAGS_SUCCESS]: (state, { payload }) => ({
    ...state,
    tags: payload,
  }),
  [actionTypes.GET_PORTFOLIO_TYPES_SUCCESS]: (state, { payload }) => ({
    ...state,
    types: payload,
  }),
  [actionTypes.GET_PORTFOLIO_TAGS_FAILED]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
  [actionTypes.GET_PORTFOLIO_TYPES_FAILED]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
  DEFAULT: (state) => state,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    errorOccured: setRawPayload('error'),
    tagsLoaded: setRawPayload('tags'),
    typesLoaded: setRawPayload('types'),
  },
});

export const {
  errorOccured,
  tagsLoaded,
  typesLoaded,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
