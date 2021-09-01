import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { Svg } from 'components/Common/Svg';
import { Animated } from 'components/Common/Animated';
import {
  ANIMATED_TYPE,
  NAV_LINKS,
  SVG_IMAGES_TYPES,
  WITH_SUB_ITEMS,
} from 'utils/constants';
import { setOverflowForBody } from 'utils/helper';
import { DropDownMenu } from '../DropDownMenu';
import Burger from '../Burger';
import { socialLinks } from './utils/data';
import styles from './styles.module.scss';

const MobileMenu = ({
  navLinks: links,
  socialLinks: socialItems,
  isMobileMenuOpened,
  setMobileMenuState,
  isAdditional,
  openDropDown,
  closeDropDown,
  isDropMenuOpened,
}) => {
  const closeMenu = () => setMobileMenuState(!isMobileMenuOpened);
  const handleOnArrowClick = () => (isDropMenuOpened
    ? closeDropDown()
    : openDropDown());

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
            <Fragment>
              <li key={`links/${title}`}>
                <div className={cn(styles.mainLink, { [styles.openedDropDown]: isDropMenuOpened })}>
                  <LinkWrapper
                    isLocalLink
                    path={path}
                    dynamicRouting={dynamicPath}
                  >
                    <span
                      onClick={closeMenu}
                      role="button"
                      tabIndex="0"
                    >
                      {title}

                    </span>
                  </LinkWrapper>
                  {WITH_SUB_ITEMS.includes(slug) && (
                    <div
                      className={styles.svgContainer}
                      onClick={handleOnArrowClick}
                      role="button"
                      tabIndex="0"
                    >
                      <Svg type={SVG_IMAGES_TYPES.arrowDown} />
                    </div>
                  )}
                </div>
                {WITH_SUB_ITEMS.includes(slug) && (
                  <Animated
                    type={ANIMATED_TYPE.expandByHeight}
                    open={isDropMenuOpened}
                  >
                    <DropDownMenu
                      isDropMenuOpened={isDropMenuOpened}
                      isAdditional={isAdditional}
                      slug={slug}
                      closeMobileMenu={closeMenu}
                    />
                  </Animated>
                )}
              </li>
            </Fragment>
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
  socialLinks,
  openDropDown: () => {},
  closeDropDown: () => {},
  isDropMenuOpened: false,
};

MobileMenu.propTypes = {
  navLinks: PropTypes.instanceOf(Array),
  socialLinks: PropTypes.instanceOf(Array),
  isMobileMenuOpened: PropTypes.bool.isRequired,
  setMobileMenuState: PropTypes.func.isRequired,
  isAdditional: PropTypes.bool.isRequired,
  openDropDown: PropTypes.func,
  closeDropDown: PropTypes.func,
  isDropMenuOpened: PropTypes.bool,
};

export default MobileMenu;
