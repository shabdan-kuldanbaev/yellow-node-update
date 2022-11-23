import { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsDropMenuOpened } from 'redux/selectors/layout';
import { setIsDropMenuOpened } from 'redux/actions/layout';
import { isHasSubNavigation } from 'helpers/navigation';

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
      dispatch(setIsDropMenuOpened(true));
    }
  };

  const closeDropDownMenu = useCallback(
    () => dispatch(setIsDropMenuOpened(false)),
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

      if (current && !current.contains(target)) {
        closeDropDownMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeDropDownMenu]);

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
