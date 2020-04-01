import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { menuList } from './utils/data';
import styles from './styles.module.scss';
import cn from 'classnames';
  
const Nav = ({ theme, isAdditional }) => (
  <ul className={cn(styles.desktopMenu, {[styles.additionalNav]: isAdditional })}>{menuList.map(item => (
    <li key={`menuItem/${item.name}`} className={styles[theme]}>
        <Link href={item.href}>
        <span className={styles.underline}>{item.name}</span>
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
  isAdditional: PropTypes.bool.isRequired,
};

export default Nav;
