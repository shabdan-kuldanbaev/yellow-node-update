import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  message: null,
  isSubscribed: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    subscriptionFetchingStarted(state) {
      state.isLoading = true;
    },
    subscriptionSucceeded(state, { payload }) {
      state.isLoading = false;
      state.message = payload;
      state.isSubscribed = true;
    },
    subscriptionFailed(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
      state.message = payload.data;
    },
    subscriptionSet(state, { payload }) {
      state.isSubscribed = payload;
    },
    messageCleared(state) {
      state.message = null;
    },
  },
});

export const {
  subscriptionFetchingStarted,
  subscriptionSucceeded,
  subscriptionFailed,
  subscriptionSet,
  messageCleared,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
