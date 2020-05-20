import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper } from 'components';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { menuList } from './utils/data';
import styles from './styles.module.scss';

const Nav = ({
  theme,
  currentPage,
  isAdditional,
}) => {
  const { asPath } = useRouter();
  const isBlog = asPath && asPath.includes('blog');

  return (
    <ul className={cn(styles.desktopMenu, {
      [styles.additionalNav]: !isBlog && (isAdditional || currentPage && currentPage !== ''),
      [styles.additionalNavForBlog]: isBlog,
    })}
    >
      {menuList && menuList.map((item) => (
        <li key={`menuItem/${item.name}`} className={styles[theme]}>
          <LinkWrapper path={item.href} isLocalLink>
            <span className={cn(styles.underline, { [styles.activeNav]: asPath.includes(item.name.toLowerCase()) })}>
              {item.name}
            </span>
          </LinkWrapper>
        </li>
      ))}
    </ul>
  );
};

Nav.defaultProps = {
  theme: 'dark',
};

Nav.propTypes = {
  theme: PropTypes.string,
  currentPage: PropTypes.string.isRequired,
  isAdditional: PropTypes.string.isRequired,
};

export default Nav;
