import { SUB_NAVIGATION_LINKS } from 'utils/constants';

export const useDropDownMenu = ({
  isLightTheme,
  isDropMenuOpened,
  isPageScrolledDown,
  slug,
  closeMobileMenu,
  closeDropDownMenu,
}) => {
  const subNavigationLinks = SUB_NAVIGATION_LINKS[slug];

  const handleOnClick = (subMenuSlug) => () => {
    if (subMenuSlug) {
      closeMobileMenu();
      closeDropDownMenu();
    }
  };

  return {
    isLightTheme,
    isDropMenuOpened,
    isPageScrolledDown,
    handleOnClick,
    subNavigationLinks,
    closeMobileMenu,
  };
};
