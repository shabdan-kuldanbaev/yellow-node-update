import { Suspense, memo } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import cn from 'classnames';
import LinkWrapper from 'components/Common/LinkWrapper';
import { NAV_LINKS } from 'utils/constants';
import { isHasSubNavigation, isHasSubSmallNavigation } from 'helpers/navigation';
import { useNav } from './useNav';
import styles from './styles.module.scss';

const DropDownMenu = dynamic(() => import('UI/sections/Header/DropDownMenu'), { suspense: true });
const SmallDropDownMenu = dynamic(() => import('UI/sections/Header/SmallDropDownMenu'), { suspense: true });

const Nav = (props) => {
  const {
    theme,
    navRef,
    isPageScrolling,
    links,
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
              <Suspense>
                <DropDownMenu
                  isDropMenuOpened={isDropMenuOpened}
                  isPageScrolledDown={isPageScrolling}
                  slug={slug}
                  closeDropDownMenu={closeDropDownMenu}
                />
              </Suspense>
            )}
            {isHasSubSmallNavigation(slug) && isHeader && (
              <Suspense>
                <SmallDropDownMenu
                  slug={slug}
                  isDropMenuOpened={isSmallDropMenuOpened}
                  isPageScrolledDown={isPageScrolling}
                  closeDropDownMenu={closeSmallDropDownMenu}
                />
              </Suspense>
            )}
          </li>
        );
      })}
    </ul>
  );
};

Nav.defaultProps = {
  theme: 'dark',
  navLinks: NAV_LINKS,
  isHeader: false,
};

Nav.propTypes = {
  isPageScrolling: PropTypes.bool.isRequired,
  theme: PropTypes.string,
  navLinks: PropTypes.instanceOf(Array),
  isHeader: PropTypes.bool,
};

export default memo(Nav);
