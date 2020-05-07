import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { mobileResolution } from 'utils/helper';
import { selectIsModelLoaded, selectScrollOfAddedFooter } from 'redux/selectors/home';
import { selectIsMobileMenuOpened } from 'redux/selectors/layout';
import { setMobileMenuState } from 'redux/actions/layout';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { SelectionBlock } from 'components/BlogCommon';
import styles from './styles.module.scss';
import Nav from './Nav';
import MobileMenu from './MobileMenu';
import Logo from '../Logo';

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
  const isHomePage = currentPage === '';
  const [isAdditional, setAdditional] = useState(false);
  const [direction, setDirection] = useState('up');
  const [isLogoTextHidden, setIsLogoTextHidden] = useState(false);
  let oldY = 0;

  const headerClassName = cn({
    [`${styles.headerContainer}`]: true,
    [`${styles.mobileHeaderHeight}`]: isMobileMenuOpened,
    [`${styles.animate}`]: isModelLoaded,
    [`${styles.additional}`]: isAdditional,
    [`${styles[direction]}`]: isModelLoaded,
    [styles.notHome]: !isHomePage && !isMobileMenuOpened,
    [styles.deleteTextOfLogo]: isLogoTextHidden,
  });

  const handleOnScroll = () => {
    const { pageYOffset } = window;
    const isMobile = window.innerWidth < mobileResolution;

    if (introSection.current) {
      const intro = introSection.current.getBoundingClientRect();

      if (isHomePage) {
        intro.bottom < 0
          ? setAdditional(true)
          : setAdditional(false);
        intro.top < -200 && !isMobile
          ? setIsLogoTextHidden(true)
          : setIsLogoTextHidden(false);
        oldY < pageYOffset && (!isMobile ? intro.top < -700 : intro.top < -200)
          ? setDirection('down')
          : setDirection('up');

        oldY = pageYOffset;
      }

      if (!isHomePage) {
        oldY < pageYOffset && intro.top < -50
          ? setDirection('down')
          : setDirection('up');
        oldY = pageYOffset;
      }
    }
  };

  useEffect(() => {
    // to fix with redux
    const html = document.querySelector('html');
    oldY = window.pageYOffset;
    handleOnScroll();

    if (isMobileMenuOpened) {
      html.classList.add(styles.overflowApp);
      if (scrollOfAddedFooter.classList) scrollOfAddedFooter.classList.add(styles.hideScroll);
    } else {
      html.classList.remove(styles.overflowApp);
      if (scrollOfAddedFooter.classList) scrollOfAddedFooter.classList.remove(styles.hideScroll);
    }

    window.addEventListener('scroll', handleOnScroll);
    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <header className={headerClassName}>
      {!isMobileMenuOpened && (
        <div className={styles.logo}>
          <Logo theme={theme} />
        </div>
      )}
      {currentPage.includes('blog') && (
        <div className={styles.categories}>
          <SelectionBlock urlPath={asPath} />
        </div>
      )}
      <Nav
        theme={theme}
        isAdditional={isAdditional}
        currentPage={currentPage}
        isMobileMenuOpened={isMobileMenuOpened}
        setMobileMenuState={setMobileMenuState}
      />
      <MobileMenu
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

const mapStateToProps = (state) => ({
  isModelLoaded: selectIsModelLoaded(state),
  scrollOfAddedFooter: selectScrollOfAddedFooter(state),
  isMobileMenuOpened: selectIsMobileMenuOpened(state),
});

export default connect(mapStateToProps, { setMobileMenuState })(Header);
