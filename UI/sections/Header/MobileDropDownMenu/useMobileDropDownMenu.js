'use client';

import { useState } from 'react';
import { SUB_NAVIGATION_ITEMS, SUB_NAVIGATION_LINKS } from 'utils/constants';

export const useMobileDropDownMenu = ({
  isLightTheme,
  isPageScrolledDown,
  slug,
  closeMobileMenu,
}) => {
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const subNavigationItems = SUB_NAVIGATION_ITEMS[slug] || [];
  const subNavigationLinks = SUB_NAVIGATION_LINKS[slug];

  const handleOnSubMenuClick = (subMenuKey) => (e) => {
    e.stopPropagation();

    if (subMenuKey === activeSubMenu) {
      setActiveSubMenu(null);

      return;
    }

    setActiveSubMenu(subMenuKey);
  };

  const handleOnLinkClick = (subMenuLinkSlug) => () => {
    if (subMenuLinkSlug) {
      closeMobileMenu();
    }
  };

  return {
    slug,
    isLightTheme,
    isPageScrolledDown,
    handleOnSubMenuClick,
    handleOnLinkClick,
    activeSubMenu,
    subNavigationItems,
    subNavigationLinks,
    closeMobileMenu,
  };
};
