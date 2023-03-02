import { createSlice } from '@reduxjs/toolkit';
import { setRawPayload } from 'utils/redux';

const initialState = {
  error: null,
  tags: [],
  types: [],
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
