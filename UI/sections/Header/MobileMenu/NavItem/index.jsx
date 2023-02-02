import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import cn from 'classnames';
import LinkWrapper from 'components/Common/LinkWrapper';
import Svg from 'UI/components/Svg';
import Animated from 'components/Common/Animated';
import { ANIMATED_TYPE, SVG_IMAGES_TYPES } from 'utils/constants';
import { useNavItem } from './useNavItem';
import styles from './styles.module.scss';

const MobileDropDownMenu = dynamic(() => import('UI/sections/Header/MobileDropDownMenu'));

export const NavItem = (props) => {
  const {
    path,
    slug,
    title,
    closeMenu,
    dynamicPath,
    isLightTheme,
    isSubMenuExpanded,
    isPageScrolledDown,
    handleOnTitleClick,
    handleOnArrowClick,
    isLinkHasSubNavigation,
  } = useNavItem(props);

  return (
    <li
      className={cn(styles.navItem, {
        [styles.lightTheme]: isLightTheme,
      })}
    >
      <div
        className={cn(styles.mainLink, {
          [styles.openedDropDown]: isSubMenuExpanded,
        })}
        onClick={handleOnArrowClick}
        role="button"
        tabIndex="0"
      >
        {path
          ? (
            <LinkWrapper
              isLocalLink
              path={path}
              dynamicRouting={dynamicPath}
            >
              <span
                className={styles.title}
                onClick={handleOnTitleClick}
                role="button"
                tabIndex="0"
              >
                {title}
              </span>
            </LinkWrapper>
          )
          : (
            <span
              className={styles.title}
              onClick={handleOnTitleClick}
              role="button"
              tabIndex="0"
            >
              {title}
            </span>
          )}
        <div
          className={cn(styles.svgContainer, {
            [styles.withSubnavigation]: isLinkHasSubNavigation,
          })}
        >
          <Svg type="chevronRight" />
        </div>
      </div>
      {isLinkHasSubNavigation && (
        <Animated
          type={ANIMATED_TYPE.expandByHeight}
          open={isSubMenuExpanded}
        >
          <MobileDropDownMenu
            isLightTheme={isLightTheme}
            isDropMenuOpened={isSubMenuExpanded}
            isPageScrolledDown={isPageScrolledDown}
            slug={slug}
            closeMobileMenu={closeMenu}
          />
        </Animated>
      )}
    </li>
  );
};

NavItem.defaultProps = {
  isPageScrolledDown: false,
  path: '',
  dynamicPath: '',
};

NavItem.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
  dynamicPath: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object),
  ]),
  isPageScrolledDown: PropTypes.bool,
  closeMenu: PropTypes.func.isRequired,
};
