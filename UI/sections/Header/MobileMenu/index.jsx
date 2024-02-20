import { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { NAV_LINKS } from 'utils/constants';
import { useMobileMenu } from './useMobileMenu';
import { NavItem } from './NavItem';
import Burger from '../Burger';
import styles from './styles.module.scss';

const MobileMenu = (props) => {
  const {
    isLightTheme,
    links = NAV_LINKS,
    isMobileMenuOpened,
    setMobileMenuState,
    isPageScrolledDown,
  } = useMobileMenu(props);

  return (
    <>
      <div className={cn(styles.mobileMenu, {
        [styles.mobileMenuOpened]: isMobileMenuOpened,
        [styles.mobileMenuClosed]: !isMobileMenuOpened,
        [styles.pageScrollingMobileMenu]: isPageScrolledDown,
        [styles.mobileMenulightTheme]: isLightTheme,
      })}
      >
        <ul>
          {links?.map(({
            title,
            path,
            dynamicPath,
            slug,
          }) => (
            <NavItem
              key={`links/${title}`}
              slug={slug}
              title={title}
              path={path}
              dynamicPath={dynamicPath}
              closeMenu={setMobileMenuState}
              isLightTheme={isLightTheme}
            />
          ))}
        </ul>
      </div>
      <Burger
        isLightTheme={isLightTheme}
        isMobileMenuOpened={isMobileMenuOpened}
        handleOnClick={setMobileMenuState}
        isPageScrolledDown={isPageScrolledDown}
      />
    </>
  );
};

MobileMenu.propTypes = {
  navLinks: PropTypes.instanceOf(Array),
  isMobileMenuOpened: PropTypes.bool.isRequired,
  setMobileMenuState: PropTypes.func.isRequired,
  isPageScrolledDown: PropTypes.bool.isRequired,
};

export default memo(MobileMenu);
