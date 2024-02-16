'use client';

import {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { isHasSubNavigation, isHasSubSmallNavigation } from 'helpers/navigation';

export const useNav = ({
  theme,
  isPageScrolling,
  navLinks: links,
  isHeader,
  setDesktopMenu,
  isDropMenuOpened,
}) => {
  const navRef = useRef(null);
  const [isSmallDropMenuOpened, setIsSmallDropMenuOpened] = useState(false);

  const openDropDownMenu = (slug) => {
    if (isHeader && isHasSubNavigation(slug)) {
      setDesktopMenu(true);
    } else if (isHeader && isHasSubSmallNavigation(slug)) {
      setIsSmallDropMenuOpened(true);
    }
  };

  const closeDropDownMenu = useCallback(() => setDesktopMenu(false), [setDesktopMenu]);

  const closeSmallDropDownMenu = useCallback(() => setIsSmallDropMenuOpened(false), []);

  const handleOnClick = (slug) => () => {
    if (isDropMenuOpened) {
      closeDropDownMenu();
    } else if (isSmallDropMenuOpened) {
      closeSmallDropDownMenu();
    } else {
      openDropDownMenu(slug);
    }
  };

  useEffect(() => {
    const handleClickOutside = ({ target }) => {
      const { current } = navRef || {};

      if ((isDropMenuOpened || isSmallDropMenuOpened) && current && !current.contains(target)) {
        closeDropDownMenu();
        closeSmallDropDownMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeDropDownMenu, closeSmallDropDownMenu, isDropMenuOpened, isSmallDropMenuOpened]);

  return {
    navRef,
    theme,
    isPageScrolling,
    links,
    isHeader,
    handleOnClick,
    isSmallDropMenuOpened,
    isDropMenuOpened,
    closeDropDownMenu,
    closeSmallDropDownMenu,
  };
};
