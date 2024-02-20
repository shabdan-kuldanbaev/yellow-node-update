import { memo } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import cn from 'classnames';
import LinkWrapper from 'UI/components/LinkWrapper';
import { NAV_LINKS } from 'utils/constants';
import { isHasSubNavigation, isHasSubSmallNavigation } from 'helpers/navigation';
import { useNav } from './useNav';
import styles from './styles.module.scss';

const DropDownMenu = dynamic(() => import('UI/sections/Header/DropDownMenu'));
const SmallDropDownMenu = dynamic(() => import('UI/sections/Header/SmallDropDownMenu'));

const Nav = (props) => {
  const {
    theme = 'dark',
    navRef,
    isPageScrolling,
    links = NAV_LINKS,
    isHeader,
    handleOnClick,
    isSmallDropMenuOpened,
    isDropMenuOpened,
    closeDropDownMenu,
    closeSmallDropDownMenu,
  } = useNav(props);

  return (
    <ul
      className={cn(styles.desktopMenu, { [styles.pageScrolled]: isPageScrolling })}
      ref={navRef}
    >
      {links?.map(({
        title,
        path,
        dynamicPath,
        slug,
      }) => {
        const itemContent = (
          <span className={styles.underline}>
            {title}
          </span>
        );

        return (path || isHeader) && (
          <li
            key={`menuItem/${title}`}
            className={cn(styles[theme], { [styles.nonClickableItem]: !path })}
            onClick={handleOnClick(slug)}
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
            {isHasSubNavigation(slug) && isHeader && (
              <DropDownMenu
                isDropMenuOpened={isDropMenuOpened}
                isPageScrolledDown={isPageScrolling}
                slug={slug}
                closeDropDownMenu={closeDropDownMenu}
              />
            )}
            {isHasSubSmallNavigation(slug) && isHeader && (
              <SmallDropDownMenu
                slug={slug}
                isDropMenuOpened={isSmallDropMenuOpened}
                isPageScrolledDown={isPageScrolling}
                closeDropDownMenu={closeSmallDropDownMenu}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

Nav.propTypes = {
  isPageScrolling: PropTypes.bool.isRequired,
  theme: PropTypes.string,
  navLinks: PropTypes.instanceOf(Array),
  isHeader: PropTypes.bool,
};

export default memo(Nav);
