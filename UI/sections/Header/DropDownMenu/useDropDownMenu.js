'use client';

import { useState } from 'react';
import {
  SUB_NAVIGATION_KEYS,
  SUB_NAVIGATION_ITEMS,
  SUB_NAVIGATION_LINKS,
} from 'utils/constants';

export const useDropDownMenu = ({
  isLightTheme,
  isDropMenuOpened,
  isPageScrolledDown,
  slug,
  closeMobileMenu,
  closeDropDownMenu,
}) => {
  const [activeSubMenu, setActiveSubMenu] = useState(SUB_NAVIGATION_KEYS.services);

  const subNavigationItems = SUB_NAVIGATION_ITEMS[slug];
  const subNavigationLinks = SUB_NAVIGATION_LINKS[slug];

  const handleOnSubMenuClick = (subMenuKey) => (e) => {
    e.stopPropagation();
    setActiveSubMenu(subMenuKey);
  };

  const handleOnLinkClick = (subMenuLinkSlug) => () => {
    if (subMenuLinkSlug) {
      closeMobileMenu();
      closeDropDownMenu();
    }
  };

  return {
    isLightTheme,
    isDropMenuOpened,
    isPageScrolledDown,
    handleOnSubMenuClick,
    handleOnLinkClick,
    activeSubMenu,
    subNavigationItems,
    subNavigationLinks,
    closeMobileMenu,
  };
};
