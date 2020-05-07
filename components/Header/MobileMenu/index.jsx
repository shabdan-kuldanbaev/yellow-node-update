import React, { Fragment, useEffect } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useOverflowForBody } from 'hooks';
import Burger from '../Burger';
import styles from './styles.module.scss';
import { menuList, socialLinks } from './utils/data';

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

  const handleOnClickLi = () => {
    setMobileMenuState(!isMobileMenuOpened);
  };

  useOverflowForBody(isMobileMenuOpened);

  // TODO const setOverflowForBody = (value) => {
  //   document.body.style.overflow = value;
  // };

  // useEffect(() => {
  //   isMobileMenuOpened ? setOverflowForBody('hidden') : setOverflowForBody('scroll');
  // }, [isMobileMenuOpened]);

  return (
    <Fragment>
      <div className={mobileMenuClassName}>
        <ul>
          {menuList.map((item) => (
            <li key={`menuItem/${item.name}`} onClick={handleOnClickLi}>
              <Link href={item.href}>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.mobileMenuFooter}>
          {socialLinks.map((link) => (
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
};

MobileMenu.defaultProps = {
  menuList,
  socialLinks,
};

MobileMenu.propTypes = {
  menuList: PropTypes.instanceOf(Array).isRequired,
  socialLinks: PropTypes.instanceOf(Array).isRequired,
  isMobileMenuOpened: PropTypes.bool.isRequired,
  setMobileMenuState: PropTypes.func.isRequired,
  isAdditional: PropTypes.bool.isRequired,
};

export default MobileMenu;
