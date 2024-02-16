'use client';

import { useState } from 'react';
import { isHasSubNavigation, isHasSubSmallNavigation } from 'helpers/navigation';

export const useNavItem = ({
  slug,
  title,
  path,
  dynamicPath,
  isLightTheme,
  isPageScrolledDown,
  closeMenu,
}) => {
  const [isSubMenuExpanded, setIsMSubMenuExpanded] = useState(false);
  const isLinkHasSubNavigation = isHasSubNavigation(slug) || isHasSubSmallNavigation(slug);

  const handleOnArrowClick = () => setIsMSubMenuExpanded(!isSubMenuExpanded);
  const handleOnTitleClick = () => {
    if (path) {
      closeMenu();
    }
  };

  return {
    path,
    slug,
    title,
    closeMenu,
    dynamicPath,
    isLightTheme,
    isSubMenuExpanded,
    isPageScrolledDown,
    handleOnTitleClick,
    handleOnArrowClick,
    isLinkHasSubNavigation,
  };
};
