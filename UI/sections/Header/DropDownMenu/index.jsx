import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SubMenuItem from 'UI/sections/Header/SubMenuItem';
import Typography from 'UI/components/Typography';
import Animated from 'UI/containers/Animated';
import { ANIMATED_TYPE, SUB_NAVIGATION_KEYS } from 'utils/constants';
import { useDropDownMenu } from './useDropDownMenu';
import styles from './styles.module.scss';

const DropDownMenu = (props) => {
  const {
    isLightTheme,
    isDropMenuOpened,
    isPageScrolledDown,
    handleOnSubMenuClick,
    handleOnLinkClick,
    activeSubMenu,
    subNavigationItems,
    subNavigationLinks,
    closeMobileMenu,
  } = useDropDownMenu(props);

  if (!subNavigationItems) {
    return null;
  }

  return (
    <div className={cn(styles.dropDownMenu, {
      [styles.lightTheme]: isLightTheme,
      [styles.pageScrolling]: isPageScrolledDown,
      [styles.closed]: !isDropMenuOpened,
    })}
    >
      <div className={styles.dropDownItemsContainer}>
        {subNavigationItems.map(({
          title,
          key,
        }) => (
          <Typography
            className={cn(styles.subMenuItem, { [styles.subMenuItemActive]: activeSubMenu === key })}
            onClick={handleOnSubMenuClick(key)}
            variant="span"
          >
            {title}
          </Typography>
        ))}
      </div>
      <div className={cn(styles.dropDownLinksContainer, styles[activeSubMenu])}>
        <Animated
          type={ANIMATED_TYPE.isFade}
          open
        >
          {subNavigationLinks[activeSubMenu].map(({ title, subtitle, slug }) => (
            <SubMenuItem
              key={`link/${title}`}
              isLightTheme={isLightTheme}
              isPageScrolledDown={isPageScrolledDown}
              closeMobileMenu={closeMobileMenu}
              handleOnClick={handleOnLinkClick}
              activeSubMenu={activeSubMenu}
              subtitle={subtitle}
              title={title}
              subMenuSlug={slug}
            />
          ))}
        </Animated>
      </div>
    </div>
  );
};

DropDownMenu.defaultProps = {
  closeMobileMenu: () => {},
  closeDropDownMenu: () => {},
};

DropDownMenu.propTypes = {
  isDropMenuOpened: PropTypes.bool.isRequired,
  isPageScrolledDown: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  closeMobileMenu: PropTypes.func,
  closeDropDownMenu: PropTypes.func,
};

export default DropDownMenu;
