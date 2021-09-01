import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { NAV_LINKS, WITH_SUB_ITEMS } from 'utils/constants';
import { DropDownMenu } from '../DropDownMenu';
import styles from './styles.module.scss';

const Nav = ({
  theme,
  currentPage,
  isAdditional,
  isTransparentHeader,
  navLinks: links,
  openDropDown,
  closeDropDown,
  isDropMenuOpened,
}) => {
  const { asPath } = useRouter();
  const isBlog = asPath && asPath.includes('blog');
  // TODO rework this checks
  const isAdditionalNav = !isBlog && (isAdditional || (currentPage && (currentPage !== '' && !isTransparentHeader)));
  const isAdditionalNavForBlog = isBlog && !isTransparentHeader;

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
          onMouseEnter={() => { openDropDown(slug); }}
          onMouseLeave={closeDropDown}
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
          {WITH_SUB_ITEMS.includes(slug) && (
            <DropDownMenu
              isDropMenuOpened={isDropMenuOpened}
              isAdditional={isAdditionalNav}
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
  openDropDown: () => {},
  closeDropDown: () => {},
  isDropMenuOpened: false,
};

Nav.propTypes = {
  theme: PropTypes.string,
  currentPage: PropTypes.string.isRequired,
  isAdditional: PropTypes.bool.isRequired,
  isTransparentHeader: PropTypes.bool,
  navLinks: PropTypes.instanceOf(Array),
  openDropDown: PropTypes.func,
  closeDropDown: PropTypes.func,
  isDropMenuOpened: PropTypes.bool,
};

export default Nav;
