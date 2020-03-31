import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Logo from '../Logo';
import { menuList, socialLinks } from './utils/data';
import MobileMenu from './MobileMenu';
import Nav from './Nav';
import styles from './styles.module.scss';

const Header = ({
  theme,
  scrollLabel,
  isModelLoaded,
  section,
}) => {
  const [isMenuOpened, setMenuState] = useState(false);
  const [isAdditional, setAdditional] = useState(false);
  const [direction, setDirection] = useState('down');
  let oldY = 0;
  const headerClassName = cn({
    [`${styles.headerContainer}`]: true,
    [`${styles.mobileHeaderHeight}`]: isMenuOpened,
    [`${styles.animate}`]: isModelLoaded,
    [`${styles.additional}`]: isAdditional,
    [`${styles[direction]}`]: isModelLoaded,
  });

  const handleOnScroll = () => {
    const pageYOffset = window.pageYOffset;

    if (section.current.getBoundingClientRect().bottom < 0) setAdditional(true);
    else setAdditional(false);

    if (oldY < pageYOffset) setDirection('down');
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
      <Nav theme={theme} />
      <MobileMenu
        menuList={menuList}
        socialLinks={socialLinks}
        isMenuOpened={isMenuOpened}
        setMenuState={setMenuState}
      />
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
