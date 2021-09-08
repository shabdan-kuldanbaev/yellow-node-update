import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { selectIsDropMenuOpened } from 'redux/selectors/layout';
import { setIsDropMenuOpened } from 'redux/actions/layout';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { NAV_LINKS } from 'utils/constants';
import { isHasSubNavigation } from 'helpers/navigation';
import { DropDownMenu } from '../DropDownMenu';
import styles from './styles.module.scss';

const Nav = ({
  theme,
  currentPage,
  isPageScrolledDown,
  isTransparentHeader,
  navLinks: links,
  setIsDropMenuOpened: setIsDropMenuOpenedAction,
  isDropMenuOpened,
  isHeader,
}) => {
  const { asPath } = useRouter();
  // TODO rework this checks
  const isPageScrolling = (isPageScrolledDown || (currentPage && (currentPage !== '' && !isTransparentHeader)));

  const onLinkMouseHover = (slug) => () => {
    if (isHeader && isHasSubNavigation(slug)) {
      setIsDropMenuOpenedAction(true);
    }
  };
  const onLinkMouseLeave = () => setIsDropMenuOpenedAction(false);

  return (
    <ul className={cn(styles.desktopMenu, { [styles.pageScrolled]: isPageScrolling })}>
      {links && links.map(({
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
            className={styles[theme]}
            onMouseEnter={onLinkMouseHover(slug)}
            onMouseLeave={onLinkMouseLeave}
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
              />
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
  isTransparentHeader: false,
  isHeader: false,
  isPageScrolledDown: false,
};

Nav.propTypes = {
  theme: PropTypes.string,
  currentPage: PropTypes.string.isRequired,
  isPageScrolledDown: PropTypes.bool,
  isTransparentHeader: PropTypes.bool,
  navLinks: PropTypes.instanceOf(Array),
  setIsDropMenuOpened: PropTypes.func.isRequired,
  isDropMenuOpened: PropTypes.bool.isRequired,
  isHeader: PropTypes.bool,
};

export default connect(
  (state) => ({ isDropMenuOpened: selectIsDropMenuOpened(state) }),
  { setIsDropMenuOpened },
)(Nav);
