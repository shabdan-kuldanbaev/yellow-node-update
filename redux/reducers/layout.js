import { createSlice } from '@reduxjs/toolkit';
import { setRawPayload } from 'utils/redux';

const initialState = {
  isMobileResolution: false,
  isTabletResolution: false,
  isDesktopResolution: true,
  isMobileCategotiesOpened: false,
  isPageReadyToDisplay: false,
  isFirstPageLoaded: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    // Resolutions
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

    // Menus
    mobileCategoriesOpened: setRawPayload('isMobileCategotiesOpened'),

    // Fetching Data
    firstPageLoaded: setRawPayload('isFirstPageLoaded'),
  },
});

export const {
  mobileResolutionSet,
  tabletResolutionSet,
  desktopResolutionSet,
  mobileCategoriesOpened,
  firstPageLoaded,
} = layoutSlice.actions;

export default layoutSlice.reducer;
