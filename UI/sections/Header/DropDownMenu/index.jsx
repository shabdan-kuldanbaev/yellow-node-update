import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SubMenuItem from 'UI/sections/Header/SubMenuItem';
import { useDropDownMenu } from './useDropDownMenu';
import styles from './styles.module.scss';

const DropDownMenu = (props) => {
  const {
    isLightTheme,
    isDropMenuOpened,
    isPageScrolledDown,
    handleOnClick,
    subNavigationLinks,
    closeMobileMenu,
  } = useDropDownMenu(props);

  if (!subNavigationLinks) {
    return null;
  }

  return (
    <div className={cn(styles.dropDownMenu, {
      [styles.lightTheme]: isLightTheme,
      [styles.pageScrolling]: isPageScrolledDown,
      [styles.closed]: !isDropMenuOpened,
    })}
    >
      <div className={styles.dropDownNavContainer}>
        {subNavigationLinks.map(({
          title,
          subtitle,
          slug: subMenuSlug,
          items,
        }) => (
          <SubMenuItem
            key={`link/${subMenuSlug}`}
            closeMobileMenu={closeMobileMenu}
            handleOnClick={handleOnClick(subMenuSlug)}
            subtitle={subtitle}
            title={title}
            items={items}
            subMenuSlug={subMenuSlug}
          />
        ))}
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
