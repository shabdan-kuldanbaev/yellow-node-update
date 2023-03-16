import React from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import Typography from 'UI/components/Typography';
import Svg from 'UI/components/Svg';
import SubMenuItem from 'UI/sections/Header/SubMenuItem';
import { ANIMATED_TYPE, SVG_IMAGES_TYPES } from 'utils/constants';
import { useMobileDropDownMenu } from './useMobileDropDownMenu';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const MobileDropDownMenu = (props) => {
  const {
    isLightTheme,
    isPageScrolledDown,
    handleOnSubMenuClick,
    handleOnLinkClick,
    activeSubMenu,
    subNavigationItems,
    subNavigationLinks,
    closeMobileMenu,
  } = useMobileDropDownMenu(props);

  return (
    <div className={cn(styles.mobileDropDownMenu, { [styles.light]: isLightTheme })}>
      {subNavigationItems.map(({
        title,
        key,
      }) => (
        <>
          <div
            className={cn(styles.subMenuItemContainer, {
              [styles.openedDropDown]: activeSubMenu === key,
            })}
            onClick={handleOnSubMenuClick(key)}
            role="button"
            tabIndex="0"
          >
            <Typography
              className={cn(styles.subMenuItem, { [styles.subMenuItemActive]: activeSubMenu === key })}
              variant="span"
            >
              {title}
            </Typography>
            <div className={styles.svgContainer}>
              <Svg type={SVG_IMAGES_TYPES.chevronDown} />
            </div>
          </div>
          <Animated
            type={ANIMATED_TYPE.expandByHeight}
            open={activeSubMenu === key}
          >
            {subNavigationLinks[key]?.map(({ title: linkTitle, subtitle, slug }) => (
              <SubMenuItem
                key={`link/${linkTitle}`}
                isLightTheme={isLightTheme}
                isPageScrolledDown={isPageScrolledDown}
                closeMobileMenu={closeMobileMenu}
                handleOnClick={handleOnLinkClick}
                activeSubMenu={activeSubMenu}
                subtitle={subtitle}
                title={linkTitle}
                subMenuSlug={slug}
              />
            ))}
          </Animated>
        </>
      ))}
    </div>
  );
};

export default MobileDropDownMenu;
