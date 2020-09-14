import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper } from 'components';
import { setOverflowForBody } from 'utils/helper';
import Burger from '../Burger';
import { menuList, socialLinks } from './utils/data';
import styles from './styles.module.scss';

const MobileMenu = ({
  menuList: menuItems,
  socialLinks: socialItems,
  isMobileMenuOpened,
  setMobileMenuState,
  isAdditional,
}) => {
  const closeMenu = () => setMobileMenuState(!isMobileMenuOpened);

  useEffect(() => {
    setOverflowForBody(isMobileMenuOpened);
  }, [isMobileMenuOpened]);

  return (
    <Fragment>
      <div className={cn(styles.mobileMenu, {
        [styles.mobileMenuOpened]: isMobileMenuOpened,
        [styles.mobileMenuClosed]: !isMobileMenuOpened,
        [styles.additionalMobileMenu]: isAdditional,
      })}
      >
        <ul>
          {menuItems && menuItems.map((item) => (
            <li key={`menuItem/${item.name}`} onClick={closeMenu}>
              <LinkWrapper path={item.href} isLocalLink>
                <span>{item.name}</span>
              </LinkWrapper>
            </li>
          ))}
        </ul>
        <div className={styles.mobileMenuFooter}>
          {socialItems && socialItems.map((link) => (
            <LinkWrapper
              key={`links/${link.title}`}
              path={link.href}
              isLocalLink
            >
              {link.title}
            </LinkWrapper>
          ))}
        </div>
      </div>
      <Burger
        isMobileMenuOpened={isMobileMenuOpened}
        handleOnClick={closeMenu}
        isAdditional={isAdditional}
      />
    </Fragment>
  );
};

MobileMenu.defaultProps = {
  menuList,
  socialLinks,
};

MobileMenu.propTypes = {
  menuList: PropTypes.instanceOf(Array),
  socialLinks: PropTypes.instanceOf(Array),
  isMobileMenuOpened: PropTypes.bool.isRequired,
  setMobileMenuState: PropTypes.func.isRequired,
  isAdditional: PropTypes.bool.isRequired,
};

export default MobileMenu;
