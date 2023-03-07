import { createSlice } from '@reduxjs/toolkit';
import { setRawPayload } from 'utils/redux';

const name = 'blog';

const initialState = {
  pending: false,
  single: {},
  all: [],
  related: [],
  nearby: {},
  found: [],
  searchMessage: '',
  totalCount: 0,
  error: {},
};

const blogSlice = createSlice({
  name,
  initialState,
  reducers: {
    errorOccured: setRawPayload('error'),

    articleLoadingSucceeded: setRawPayload('single'),
    articleCleared: setRawPayload('single', {}),

    articlesListLoadingSucceeded(state, { payload: { items, total } }) {
      state.all = items;
      state.totalCount = total;
    },

    relatedArticlesLoadingSucceeded: setRawPayload('related'),
    nearbyArticlesLoadingSucceeded: setRawPayload('nearby'),

    searchStarted: setRawPayload('pending', true),
    searchCleared: setRawPayload('found', []),
    searchSucceeded(state, { payload }) {
      state.found = payload;
      state.pending = false;
      state.searchMessage = payload.length ? '' : 'Nothing Found. Please try again with some different keywords.';
    },
  },
});

export const {
  errorOccured,
  articleLoadingSucceeded,
  articleCleared,
  articlesListLoadingSucceeded,
  relatedArticlesLoadingSucceeded,
  nearbyArticlesLoadingSucceeded,
  searchStarted,
  searchCleared,
  searchSucceeded,
} = blogSlice.actions;

export default blogSlice.reducer;
