import { SUB_NAVIGATION_LINKS } from 'utils/constants';

export const useSmallDropDownMenu = ({
  slug,
  isLightTheme,
  isPageScrolledDown,
  isDropMenuOpened,
  closeDropDownMenu,
}) => {
  const subNavigationLinks = SUB_NAVIGATION_LINKS[slug];

  const handleOnLinkClick = (subMenuLinkSlug) => () => {
    if (subMenuLinkSlug) {
      closeDropDownMenu();
    }
  };

  return {
    slug,
    isLightTheme,
    isPageScrolledDown,
    isDropMenuOpened,
    subNavigationLinks,
    handleOnLinkClick,
  };
};
