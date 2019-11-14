import React from 'react';
import PropTypes from 'proptypes';
import Link from 'next/link';
import Logo from '../Logo';
import { menuList } from './utils/data';

import styles from './styles.module.scss';

const Header = ({ theme }) => (
  <header className={styles.headerContainer}>
    <Logo theme={theme} />
    <ul>{menuList.map(item => (
      <li key={`menuItem/${item.name}`}>
        <Link href={item.href}>
          <span className={`${styles.underline} ${styles.underlineThick} ${styles[theme]}`}>{item.name}</span>
        </Link>
      </li>
    ))}
    </ul>
  </header>
);

Header.defaultProps = {
  theme: 'dark',
};

Header.propTypes = {
  theme: PropTypes.string,
};

export default Header;
