import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SubMenuItem from 'UI/sections/Header/SubMenuItem';
import Typography from 'UI/components/Typography';
import { ANIMATED_TYPE } from 'utils/constants';
import { useDropDownMenu } from './useDropDownMenu';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

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
            key={key}
          >
            {title}
          </Typography>
        ))}
      </div>
      <div className={cn(styles.dropDownLinksContainer, styles[activeSubMenu])}>
        {subNavigationLinks[activeSubMenu].map(({
          title,
          path,
          icon,
          items,
          marked,
        }) => (
          <Animated
            type={ANIMATED_TYPE.isFade}
            key={path}
            open
          >
            <SubMenuItem
              key={`link/${title}`}
              isLightTheme={isLightTheme}
              isPageScrolledDown={isPageScrolledDown}
              closeMobileMenu={closeMobileMenu}
              handleOnClick={handleOnLinkClick}
              activeSubMenu={activeSubMenu}
              title={title}
              path={path}
              icon={icon}
              items={items}
              slug={activeSubMenu}
              marked={marked}
            />
          </Animated>
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
