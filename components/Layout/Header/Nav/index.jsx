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
  isAdditional,
  isTransparentHeader,
  navLinks: links,
  setIsDropMenuOpened: setIsDropMenuOpenedAction,
  isDropMenuOpened,
  isHeader,
}) => {
  const { asPath } = useRouter();
  const isBlog = asPath && asPath.includes('blog');
  // TODO rework this checks
  const isAdditionalNav = !isBlog && (isAdditional || (currentPage && (currentPage !== '' && !isTransparentHeader)));
  const isAdditionalNavForBlog = isBlog && !isTransparentHeader;

  const onLinkMouseHover = (slug) => () => {
    if (isHeader && isHasSubNavigation(slug)) {
      setIsDropMenuOpenedAction(true);
    }
  };
  const onLinkMouseLeave = () => setIsDropMenuOpenedAction(false);

  return (
    <ul className={cn(styles.desktopMenu, {
      [styles.additionalNav]: isAdditionalNav,
      [styles.additionalNavForBlog]: isAdditionalNavForBlog,
    })}
    >
      {links && links.map(({
        title,
        path,
        dynamicPath,
        slug,
      }) => (
        <li
          key={`menuItem/${title}`}
          className={styles[theme]}
          onMouseEnter={onLinkMouseHover(slug)}
          onMouseLeave={onLinkMouseLeave}
        >
          <LinkWrapper
            isLocalLink
            path={path}
            dynamicRouting={dynamicPath}
          >
            <span className={styles.underline}>
              {title}
            </span>
          </LinkWrapper>
          {isHasSubNavigation(slug) && (
            <DropDownMenu
              isDropMenuOpened={isDropMenuOpened}
              isPageScrolling={isAdditionalNav}
              slug={slug}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

Nav.defaultProps = {
  theme: 'dark',
  navLinks: NAV_LINKS,
  isTransparentHeader: false,
  isHeader: false,
};

Nav.propTypes = {
  theme: PropTypes.string,
  currentPage: PropTypes.string.isRequired,
  isAdditional: PropTypes.bool.isRequired,
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
