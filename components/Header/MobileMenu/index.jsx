import React, { Fragment } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Link from 'next/link';
import Burger from '../Burger';

const MobileMenu = ({
  menuList,
  socialLinks,
  isMenuOpened,
  setMenuState,
}) => {
  const mobileMenuClassName = cn({
    [`${styles.mobileMenu}`]: true,
    [`${styles.mobileMenuOpened}`]: isMenuOpened,
    [`${styles.mobileMenuClosed}`]: !isMenuOpened,
  });

  return (
    <Fragment>
      <div className={mobileMenuClassName}>
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
      <Burger isMenuOpened={isMenuOpened} setMenuState={setMenuState} />
    </Fragment>
  );
}

export default MobileMenu;