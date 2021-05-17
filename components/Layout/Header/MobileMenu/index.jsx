import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper } from 'components';
import { setOverflowForBody } from 'utils/helper';
import { NAV_LINKS } from 'utils/constants';
import Burger from '../Burger';
import { socialLinks } from './utils/data';
import styles from './styles.module.scss';

const MobileMenu = ({
  navLinks: links,
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
          {links && links.map(({ title, path, dynamicPath }) => (
            <li
              key={`links/${title}`}
              onClick={closeMenu}
            >
              <LinkWrapper
                isLocalLink
                path={path}
                dynamicRouting={dynamicPath}
              >
                <span>{title}</span>
              </LinkWrapper>
            </li>
          ))}
        </ul>
        <div className={styles.mobileMenuFooter}>
          {socialItems && socialItems.map(({ title, href }) => (
            <LinkWrapper
              key={`links/${title}`}
              path={href}
              isLocalLink
            >
              {title}
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
  navLinks: NAV_LINKS,
  socialLinks,
};

MobileMenu.propTypes = {
  navLinks: PropTypes.instanceOf(Array),
  socialLinks: PropTypes.instanceOf(Array),
  isMobileMenuOpened: PropTypes.bool.isRequired,
  setMobileMenuState: PropTypes.func.isRequired,
  isAdditional: PropTypes.bool.isRequired,
};

export default MobileMenu;
