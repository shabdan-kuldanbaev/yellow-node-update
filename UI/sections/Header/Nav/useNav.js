import { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsDropMenuOpened } from 'redux/selectors/layout';
import { isHasSubNavigation } from 'helpers/navigation';
import { desktopMenuOpened } from 'redux/reducers/layout';

export const useNav = ({
  theme,
  isPageScrolling,
  navLinks: links,
  isHeader,
}) => {
  const dispatch = useDispatch();
  const isDropMenuOpened = useSelector(selectIsDropMenuOpened);
  const navRef = useRef(null);

  const openDropDownMenu = (slug) => {
    if (isHeader && isHasSubNavigation(slug)) {
      dispatch(desktopMenuOpened(true));
    }
  };

  const closeDropDownMenu = useCallback(
    () => dispatch(desktopMenuOpened(false)),
    [dispatch],
  );

  const handleOnClick = (slug) => () => {
    if (isDropMenuOpened) {
      closeDropDownMenu();
    } else {
      openDropDownMenu(slug);
    }
  };

  useEffect(() => {
    const handleClickOutside = ({ target }) => {
      const { current } = navRef || {};

      if (isDropMenuOpened && current && !current.contains(target)) {
        closeDropDownMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeDropDownMenu, isDropMenuOpened]);

  return {
    navRef,
    theme,
    isPageScrolling,
    links,
    isHeader,
    handleOnClick,
    isDropMenuOpened,
    closeDropDownMenu,
  };
};
