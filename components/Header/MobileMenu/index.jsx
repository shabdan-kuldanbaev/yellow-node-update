import React, { Fragment, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Link from 'next/link';
import Burger from '../Burger';
import PropTypes from 'prop-types';

const MobileMenu = ({
  menuList,
  socialLinks,
  isMenuOpened,
  setMenuState,
  isAdditional,
}) => {
  const mobileMenuClassName = cn({
    [`${styles.mobileMenu}`]: true,
    [`${styles.mobileMenuOpened}`]: isMenuOpened,
    [`${styles.mobileMenuClosed}`]: !isMenuOpened,
    [`${styles.additionalMobileMenu}`]: isAdditional,
  });

  const setOverflowForBody = (value) => {
    document.body.style.overflow = value;
  };

  useEffect(() => {
    isMenuOpened ? setOverflowForBody('hidden') : setOverflowForBody('scroll');
  }, [isMenuOpened]);

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
      <Burger
        isMenuOpened={isMenuOpened}
        setMenuState={setMenuState}
        isAdditional={isAdditional}
      />
    </Fragment>
  );
}

MobileMenu.propTypes = {
  menuList: PropTypes.instanceOf(Array).isRequired,
  socialLinks: PropTypes.instanceOf(Array).isRequired,
  isMenuOpened: PropTypes.bool.isRequired,
  setMenuState: PropTypes.func.isRequired,
  isAdditional: PropTypes.bool.isRequired,
};

export default MobileMenu;
