'use client';

import { useEffect } from 'react';
import { setOverflowForBody } from 'utils/helper';

export const useMobileMenu = ({
  isLightTheme,
  navLinks: links,
  isMobileMenuOpened,
  setMobileMenuState,
  isPageScrolledDown,
}) => {
  useEffect(() => {
    setOverflowForBody(isMobileMenuOpened);
  }, [isMobileMenuOpened]);

  return {
    isLightTheme,
    links,
    isMobileMenuOpened,
    setMobileMenuState,
    isPageScrolledDown,
  };
};
