import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Logo from '../Logo';
import { menuList, socialLinks } from './utils/data';
import MobileMenu from './MobileMenu';
import Nav from './Nav';
import styles from './styles.module.scss';
import { toInt } from 'utils/helper';
import { phoneResolution } from 'styles/utils/_variables.scss';
import { selectIsModelLoaded, selectScrollOfAddedFooter } from 'redux/selectors/home';
import { selectIsMobileMenuOpened } from 'redux/selectors/layout';
import { setMobileMenuState } from 'redux/actions/layout';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useRouter } from 'next/router';

const Header = ({
  theme,
  introSection,
  scrollOfAddedFooter,
  isModelLoaded,
  setMobileMenuState,
  isMobileMenuOpened,
}) => {
  const { asPath } = useRouter();
  const currentPage = asPath.split('/')[1] || '';
  const [isAdditional, setAdditional] = useState(false);
  const [direction, setDirection] = useState('up');
  const [isLogoTextHidden, setIsLogoTextHidden] = useState(false);
  let oldY = 0;
  // debugger
  const headerClassName = cn({
    [`${styles.headerContainer}`]: true,
    [`${styles.mobileHeaderHeight}`]: isMobileMenuOpened,
    [`${styles.animate}`]: isModelLoaded,
    [`${styles.additional}`]: isAdditional,
    [`${styles[direction]}`]: isModelLoaded,
    [styles.notHome]: currentPage !== '',
    [styles.deleteTextOfLogo]: isLogoTextHidden,
  });
  
  const handleOnScroll = () => {
    const pageYOffset = window.pageYOffset;
    const innerWidth = window.innerWidth;

    if (introSection.current) {
      const intro = introSection.current.getBoundingClientRect();
      const mobileResolution = innerWidth > toInt(phoneResolution);

      if (intro.bottom < 0) setAdditional(true);
      else setAdditional(false);

      if (intro.top < -300 && mobileResolution) setIsLogoTextHidden(true);
      else setIsLogoTextHidden(false);

      if (oldY < pageYOffset && (mobileResolution ? intro.top < -700 : intro.top < -200)) {
        setDirection('down');
      } else setDirection('up');

      oldY = pageYOffset;
    }
  };

  useEffect(() => {
    // to fix with redux
    const html = document.querySelector('html');
    oldY = window.pageYOffset;
    if (currentPage === '') handleOnScroll();

    if (isMobileMenuOpened) {
      html.classList.add(styles.overflowApp);
      if (scrollOfAddedFooter.classList) scrollOfAddedFooter.classList.add(styles.hideScroll);
    }
    else {
      html.classList.remove(styles.overflowApp);
      if (scrollOfAddedFooter.classList) scrollOfAddedFooter.classList.remove(styles.hideScroll);
    }

    if (currentPage === '') window.addEventListener('scroll', handleOnScroll);

    return () => {
      if (currentPage === '') window.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <header className={headerClassName}>
        {!isMobileMenuOpened && (
          <div className={styles.logo}>
            <Logo theme={theme} />
          </div>
        )}
      <Nav
        theme={theme}
        isAdditional={isAdditional}
        currentPage={currentPage}
      />
      <MobileMenu
        menuList={menuList}
        socialLinks={socialLinks}
        isMobileMenuOpened={isMobileMenuOpened}
        setMobileMenuState={setMobileMenuState}
        isAdditional={isAdditional}
      />
    </header>
  );
};

Header.defaultProps = {
  theme: 'dark',
};

Header.propTypes = {
  theme: PropTypes.string,
  introSection: PropTypes.instanceOf(Object).isRequired,
  scrollOfAddedFooter: PropTypes.instanceOf(Object).isRequired,
  isModelLoaded: PropTypes.bool.isRequired,
  setMobileMenuState: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isModelLoaded: selectIsModelLoaded(),
  scrollOfAddedFooter: selectScrollOfAddedFooter(),
  isMobileMenuOpened : selectIsMobileMenuOpened(),
});

export default connect(mapStateToProps, { setMobileMenuState })(Header);
