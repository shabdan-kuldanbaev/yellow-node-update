import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { menuList } from './utils/data';
import styles from './styles.module.scss';

const Nav = ({ theme }) => (
  <ul className={styles.desktopMenu}>{menuList.map(item => (
    <li key={`menuItem/${item.name}`} className={styles[theme]}>
        <Link href={item.href}>
        <span className={`${styles.underline} ${styles.underlineThick}`}>{item.name}</span>
        </Link>
    </li>
    ))}
  </ul>
);

Nav.defaultProps = {
  theme: 'dark',
};

Nav.propTypes = {
  theme: PropTypes.string,
};

export default Nav;
