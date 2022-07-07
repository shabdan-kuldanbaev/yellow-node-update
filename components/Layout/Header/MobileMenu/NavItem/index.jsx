import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import cn from 'classnames';
import LinkWrapper from 'components/Common/LinkWrapper';
import Svg from 'components/Common/Svg';
import Animated from 'components/Common/Animated';
import { ANIMATED_TYPE, SVG_IMAGES_TYPES } from 'utils/constants';
import { isHasSubNavigation } from 'helpers/navigation';
import styles from './styles.module.scss';

const DropDownMenu = dynamic(() => import('components/Layout/Header/DropDownMenu'));

export const NavItem = ({
  slug,
  title,
  path,
  dynamicPath,
  isPageScrolledDown,
  closeMenu,
}) => {
  const [isSubMenuExpanded, setIsMSubMenuExpanded] = useState(false);
  const isLinkHasSubNavigation = isHasSubNavigation(slug);

  const handleOnArrowClick = () => setIsMSubMenuExpanded(!isSubMenuExpanded);
  const handleOnTitleClick = () => {
    if (path) {
      closeMenu();
    }
  };

  const itemContent = (
    <span
      className={styles.title}
      onClick={handleOnTitleClick}
      role="button"
      tabIndex="0"
    >
      {title}
    </span>
  );

  return (
    <li className={styles.navItem}>
      <div
        className={cn(styles.mainLink, { [styles.openedDropDown]: isSubMenuExpanded })}
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
              {itemContent}
            </LinkWrapper>
          )
          : itemContent}
        {isLinkHasSubNavigation && (
          <div className={styles.svgContainer}>
            <Svg type={SVG_IMAGES_TYPES.arrowDown} />
          </div>
        )}
      </div>
      {isLinkHasSubNavigation && (
        <Animated
          type={ANIMATED_TYPE.expandByHeight}
          open={isSubMenuExpanded}
        >
          <DropDownMenu
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
