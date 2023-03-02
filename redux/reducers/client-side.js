import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMobileResolution: false,
  isTabletResolution: false,
  isDesktopResolution: true,
};

const clientSide = createSlice({
  name: 'clientSide',
  initialState,
  reducers: {
    mobileResolutionSet(state) {
      state.isMobileResolution = true;
      state.isTabletResolution = false;
      state.isDesktopResolution = false;
    },
    tabletResolutionSet(state) {
      state.isMobileResolution = false;
      state.isTabletResolution = true;
      state.isDesktopResolution = false;
    },
    desktopResolutionSet(state) {
      state.isMobileResolution = false;
      state.isTabletResolution = false;
      state.isDesktopResolution = true;
    },
  },
});

export const {
  mobileResolutionSet,
  tabletResolutionSet,
  desktopResolutionSet,
} = clientSide.actions;

export default clientSide.reducer;
