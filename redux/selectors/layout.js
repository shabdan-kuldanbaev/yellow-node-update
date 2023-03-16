export const selectIsMobileMenuOpened = (state) => state.layout.isMobileMenuOpened;

export const selectIsMobileCategotiesOpened = (state) => state.layout.isMobileCategotiesOpened;

export const selectIsPageReadyToDisplay = (state) => state.layout.isPageReadyToDisplay;

export const selectIsFirstPageLoaded = (state) => state.layout.isFirstPageLoaded;

export const selectIsDropMenuOpened = (state) => state.layout.isDropMenuOpened;

export const isMobile = (state) => state.layout.isMobileResolution;

export const isTablet = (state) => state.layout.isTabletResolution;

export const isDesktop = (state) => state.layout.isDesktopResolution;
