import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { NAV_LINKS } from 'utils/constants';
import { setOverflowForBody } from 'utils/helper';
import { NavItem } from './NavItem';
import Burger from '../Burger';
import styles from './styles.module.scss';

const MobileMenu = ({
  navLinks: links,
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
          {links && links.map(({
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
              isAdditional={false}
              closeMenu={closeMenu}
            />
          ))}
        </ul>
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
};

MobileMenu.propTypes = {
  navLinks: PropTypes.instanceOf(Array),
  isMobileMenuOpened: PropTypes.bool.isRequired,
  setMobileMenuState: PropTypes.func.isRequired,
  isAdditional: PropTypes.bool.isRequired,
};

export default MobileMenu;
