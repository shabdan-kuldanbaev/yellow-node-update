import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { menuList } from './utils/data';
import styles from './styles.module.scss';
import cn from 'classnames';
import { useRouter } from  'next/router';

const Nav = ({
  theme,
  currentPage,
}) => {
  const { asPath } = useRouter();

    return (
    <ul className={cn(styles.desktopMenu, {[styles.additionalNav]: currentPage && currentPage !== ''})}>{menuList.map(item => (
      <li key={`menuItem/${item.name}`} className={styles[theme]}>
        <Link href={item.href}>
          <span className={cn(styles.underline, { [styles.activeNav]: asPath.includes(item.name.toLowerCase()) })}>{item.name}</span>
        </Link>
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
  isAdditional: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired,
};

export default Nav;
