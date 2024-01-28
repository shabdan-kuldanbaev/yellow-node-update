import cn from 'classnames';
import dynamic from 'next/dynamic';
import Typography from 'UI/components/Typography';
import SubMenuItem from 'UI/sections/Header/SubMenuItem';
import { ANIMATED_TYPE, SVG_IMAGES_TYPES } from 'utils/constants';
import { useMobileDropDownMenu } from './useMobileDropDownMenu';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));
const Animated = dynamic(() => import('UI/containers/Animated'));

const MobileDropDownMenu = (props) => {
  const {
    slug,
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
      {subNavigationItems.length
        ? subNavigationItems.map(({
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
              {subNavigationLinks[key]?.map(({
                title: linkTitle,
                path,
                icon,
                items,
              }) => (
                <SubMenuItem
                  key={`link/${linkTitle}`}
                  isLightTheme={isLightTheme}
                  isPageScrolledDown={isPageScrolledDown}
                  closeMobileMenu={closeMobileMenu}
                  handleOnClick={handleOnLinkClick}
                  activeSubMenu={activeSubMenu}
                  title={linkTitle}
                  path={path}
                  icon={icon}
                  items={items}
                />
              ))}
            </Animated>
          </>
        ))
        : subNavigationLinks?.map(({
          title: linkTitle,
          path,
          icon,
        }) => (
          <SubMenuItem
            key={`link/${linkTitle}`}
            isLightTheme={isLightTheme}
            isPageScrolledDown={isPageScrolledDown}
            closeMobileMenu={closeMobileMenu}
            handleOnClick={handleOnLinkClick}
            activeSubMenu={activeSubMenu}
            title={linkTitle}
            path={path}
            icon={icon}
            slug={slug}
          />
        ))}
    </div>
  );
};

export default MobileDropDownMenu;
