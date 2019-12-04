import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';
import Logo from '../Logo';
import { menuList, socialLinks } from './utils/data';

import styles from './styles.module.scss';

const Header = ({
  theme,
  scrollLabel,
  isModelLoaded,
}) => {
  const [isMenuOpened, setMenuState] = useState(false);
  const [isAdditional, setAdditional] = useState(false);
  const [direction, setDirection] = useState('down');
  let oldY = 0;
  const headerClassName = cn({
    [`${styles.headerContainer}`]: true,
    [`${styles.mobileMenuOpened}`]: isMenuOpened,
    [`${styles.mobileMenuClosed}`]: !isMenuOpened,
    [`${styles.animate}`]: isModelLoaded,
    [`${styles.additional}`]: isAdditional,
    [`${styles[direction]}`]: isModelLoaded,
  });

  const handleOnScroll = () => {
    const pageYOffset = window.pageYOffset;

    if (pageYOffset > 300) setAdditional(true);
    else setAdditional(false);

    if (oldY < pageYOffset && pageYOffset > 200) setDirection('down');
    else setDirection('up');

    oldY = pageYOffset;
  };

  useEffect(() => {
    // to fix with redux
    const html = document.querySelector('html');
    oldY = window.pageYOffset;
    handleOnScroll();

    if (isMenuOpened) {
      html.classList.add(styles.overflowApp);
      if (scrollLabel.classList) scrollLabel.classList.add(styles.hideScroll);
    }
    else {
      html.classList.remove(styles.overflowApp);
      if (scrollLabel.classList) scrollLabel.classList.remove(styles.hideScroll);
    }

    window.addEventListener('scroll', handleOnScroll);

    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <header className={headerClassName}>
      {!isMenuOpened && <Logo theme={theme} />}
      <ul className={styles.desktopMenu}>{menuList.map(item => (
        <li key={`menuItem/${item.name}`} className={styles[theme]}>
          <Link href={item.href}>
            <span className={`${styles.underline} ${styles.underlineThick}`}>{item.name}</span>
          </Link>
        </li>
      ))}
      </ul>
      <div className={styles.mobileMenu}>
        <ul>{menuList.map(item => (
          <li key={`menuItem/${item.name}`}>
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
  scrollLabel: PropTypes.instanceOf(Object).isRequired,
  isModelLoaded: PropTypes.bool.isRequired,
};

export default Header;
