import { createSlice } from '@reduxjs/toolkit';
import blogApi from 'redux/apis/blog';
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
  tags: null,
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
  extraReducers: (builder) => {
    builder
      // probably it's better to use addMatchet
      .addMatcher(blogApi.endpoints.getArticlesList.matchFulfilled, (state, { payload: { items, total } }) => {
        state.all = items;
        state.totalCount = total;
      })
      .addMatcher(blogApi.endpoints.getTags.matchFulfilled, setRawPayload('tags'));
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
