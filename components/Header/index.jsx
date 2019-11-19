import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Logo from '../Logo';
import { menuList, socialLinks } from './utils/data';

import styles from './styles.module.scss';

const Header = ({ theme }) => {
  const [isMenuOpened, setMenuState] = useState(false);

  return (
    <header className={`${styles.headerContainer} ${isMenuOpened ? styles.mobileMenuOpened : styles.mobileMenuClosed}`}>
      <Logo theme={theme} />
      <ul className={styles.desktopMenu}>{menuList.map(item => (
        <li key={`menuItem/${item.name}`}>
          <Link href={item.href}>
            <span className={`${styles.underline} ${styles.underlineThick} ${styles[theme]}`}>{item.name}</span>
          </Link>
        </li>
      ))}
      </ul>
      <div className={styles.mobileMenu}>
        <ul>{menuList.map(item => (
          <li>
            <Link href={item.href}>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
        </ul>
        <div className={styles.mobileMenuFooter}>
          {socialLinks.map(link => (
            <a
              key={`links/${link.title}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.burger} onClick={() => setMenuState(!isMenuOpened)}>
        <hr />
        <hr />
        <hr />
      </div>
    </header>
  );
};

Header.defaultProps = {
  theme: 'dark',
};

Header.propTypes = {
  theme: PropTypes.string,
};

export default Header;
