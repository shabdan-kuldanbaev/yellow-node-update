import { createSlice } from '@reduxjs/toolkit';
import { setRawPayload } from 'utils/redux';

const initialState = {
  isMobileResolution: false,
  isTabletResolution: false,
  isDesktopResolution: true,
  isMobileMenuOpened: false,
  isMobileCategotiesOpened: false,
  isPageReadyToDisplay: false,
  isFirstPageLoaded: false,
  isDropMenuOpened: false,
  isSmallDropMenuOpened: false,
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
    desktopMenuOpened: setRawPayload('isDropMenuOpened'),
    desktopSmallMenuOpened: setRawPayload('isSmallDropMenuOpened'),
    mobileMenuOpened: setRawPayload('isMobileMenuOpened'),
    mobileCategoriesOpened: setRawPayload('isMobileCategotiesOpened'),

    // Fetching Data
    firstPageLoaded: setRawPayload('isFirstPageLoaded'),
  },
});

export const {
  mobileResolutionSet,
  tabletResolutionSet,
  desktopResolutionSet,
  desktopMenuOpened,
  desktopSmallMenuOpened,
  mobileMenuOpened,
  mobileCategoriesOpened,
  firstPageLoaded,
} = layoutSlice.actions;

export default layoutSlice.reducer;
