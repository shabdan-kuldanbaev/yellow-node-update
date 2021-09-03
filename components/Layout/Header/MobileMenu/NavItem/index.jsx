import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { Svg } from 'components/Common/Svg';
import { Animated } from 'components/Common/Animated';
import { DropDownMenu } from 'components/Layout/Header/DropDownMenu';
import { ANIMATED_TYPE, SVG_IMAGES_TYPES } from 'utils/constants';
import { isHasSubNavigation } from 'helpers/navigation';
import styles from './styles.module.scss';

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

  return (
    <li className={styles.navItem}>
      <div className={cn(styles.mainLink, { [styles.openedDropDown]: isSubMenuExpanded })}>
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
        {isLinkHasSubNavigation && (
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
};

NavItem.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  dynamicPath: PropTypes.string.isRequired,
  isPageScrolledDown: PropTypes.bool,
  closeMenu: PropTypes.func.isRequired,
};
