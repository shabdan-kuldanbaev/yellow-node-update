import { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsDropMenuOpened, selectIsSmallDropMenuOpened } from 'redux/selectors/layout';
import { isHasSubNavigation, isHasSubSmallNavigation } from 'helpers/navigation';
import { desktopMenuOpened, desktopSmallMenuOpened } from 'redux/reducers/layout';

export const useNav = ({
  theme,
  isPageScrolling,
  navLinks: links,
  isHeader,
}) => {
  const dispatch = useDispatch();
  const isDropMenuOpened = useSelector(selectIsDropMenuOpened);
  const isSmallDropMenuOpened = useSelector(selectIsSmallDropMenuOpened);
  const navRef = useRef(null);

  const openDropDownMenu = (slug) => {
    if (isHeader && isHasSubNavigation(slug)) {
      dispatch(desktopMenuOpened(true));
    } else if (isHeader && isHasSubSmallNavigation(slug)) {
      dispatch(desktopSmallMenuOpened(true));
    }
  };

  const closeDropDownMenu = useCallback(
    () => dispatch(desktopMenuOpened(false)),
    [dispatch],
  );

  const closeSmallDropDownMenu = useCallback(
    () => dispatch(desktopSmallMenuOpened(false)),
    [dispatch],
  );

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
  }, [closeDropDownMenu, isDropMenuOpened, isSmallDropMenuOpened]);

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
