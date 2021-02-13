import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { LinkWrapper } from 'components';
import { menuList } from '../utils/data';
import styles from './styles.module.scss';

const Nav = ({
  theme,
  currentPage,
  isAdditional,
  menuList: links,
}) => {
  const { asPath } = useRouter();
  const isBlog = asPath && asPath.includes('blog');

  return (
    <ul className={cn(styles.desktopMenu, {
      [styles.additionalNav]: !isBlog && (isAdditional || (currentPage && currentPage !== '')),
      [styles.additionalNavForBlog]: isBlog,
    })}
    >
      {links && links.map(({ name, href }) => (
        <li key={`menuItem/${name}`} className={styles[theme]}>
          <LinkWrapper path={href} isLocalLink>
            <span className={styles.underline}>
              {name}
            </span>
          </LinkWrapper>
        </li>
      ))}
    </ul>
  );
};

Nav.defaultProps = {
  theme: 'dark',
  menuList,
};

Nav.propTypes = {
  theme: PropTypes.string,
  currentPage: PropTypes.string.isRequired,
  isAdditional: PropTypes.bool.isRequired,
  menuList: PropTypes.instanceOf(Array),
};

export default Nav;
