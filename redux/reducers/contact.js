import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formSentData: null,
  error: null,
  isPending: false,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    formSendingStarted(state) {
      state.isPending = true;
      state.error = null;
      state.formSentData = null;
    },
    formSendingFailed(state, { payload }) {
      state.isPending = false;
      state.error = payload;
    },
    formErrorDismissed(state) {
      state.error = null;
    },
    formSendingSucceeded(state, { payload }) {
      state.formSentData = payload;
      state.isPending = false;
    },
    formSuccessDismissed(state) {
      state.formSentData = null;
    },
  },
});

export const {
  formSendingStarted,
  formSendingFailed,
  formErrorDismissed,
  formSendingSucceeded,
  formSuccessDismissed,
} = contactSlice.actions;

export default contactSlice.reducer;
