import React, { Fragment, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Link from 'next/link';
import Burger from '../Burger';
import PropTypes from 'prop-types';

const MobileMenu = ({
  menuList,
  socialLinks,
  isMobileMenuOpened,
  setMobileMenuState,
  isAdditional,
}) => {
  const mobileMenuClassName = cn({
    [`${styles.mobileMenu}`]: true,
    [`${styles.mobileMenuOpened}`]: isMobileMenuOpened,
    [`${styles.mobileMenuClosed}`]: !isMobileMenuOpened,
    [`${styles.additionalMobileMenu}`]: isAdditional,
  });

  const setOverflowForBody = (value) => {
    document.body.style.overflow = value;
  };

  useEffect(() => {
    isMobileMenuOpened ? setOverflowForBody('hidden') : setOverflowForBody('scroll');
  }, [isMobileMenuOpened]);

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
        isMobileMenuOpened={isMobileMenuOpened}
        setMobileMenuState={setMobileMenuState}
        isAdditional={isAdditional}
      />
    </Fragment>
  );
}

MobileMenu.propTypes = {
  menuList: PropTypes.instanceOf(Array).isRequired,
  socialLinks: PropTypes.instanceOf(Array).isRequired,
  isMobileMenuOpened: PropTypes.bool.isRequired,
  setMobileMenuState: PropTypes.func.isRequired,
  isAdditional: PropTypes.bool.isRequired,
};

export default MobileMenu;
