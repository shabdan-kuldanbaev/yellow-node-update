import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { selectIsMobileMenuOpened } from 'redux/selectors/layout';
import { setMobileMenuState } from 'redux/actions/layout';
import {
  SelectionBlock,
  Logo,
  TopProgressBar,
} from 'components';
import MobileMenu from './MobileMenu';
import Nav from './Nav';
import styles from './styles.module.scss';

const Header = ({
  theme,
  introSection,
  isMobileMenuOpened,
  setMobileMenuState: setMobileMenu,
}) => {
  const { asPath } = useRouter();
  const currentPage = asPath.split('/')[1] || '';
  const isHomePage = currentPage === '';
  const [isAdditional, setAdditional] = useState(false);
  const [isLogoTextHidden, setIsLogoTextHidden] = useState(false);

  useEffect(() => {
    const handleOnScroll = () => {
      if (introSection.current) {
        const intro = introSection.current.getBoundingClientRect();

        if (isHomePage) {
          intro.bottom < 65
            ? setAdditional(true)
            : setAdditional(false);
          intro.top < -200
            ? setIsLogoTextHidden(true)
            : setIsLogoTextHidden(false);
        }

        if (!isHomePage) {
          intro.top < -10
            ? setIsLogoTextHidden(true)
            : setIsLogoTextHidden(false);
        }
      }
    };

    handleOnScroll();
    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, [currentPage]);

  return (
    <header className={cn({
      [styles.headerContainer]: true,
      [styles.additional]: isAdditional,
      [styles.notHome]: !isHomePage,
      [styles.deleteTextOfLogo]: isLogoTextHidden,
    })}
    >
      <div className={styles.logo}>
        <Logo theme={theme} />
      </div>
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
        setMobileMenuState={setMobileMenu}
      />
      <MobileMenu
        isMobileMenuOpened={isMobileMenuOpened}
        setMobileMenuState={setMobileMenu}
        isAdditional={isAdditional}
      />
      {(asPath.includes('portfolio') || asPath.includes('blog/')) && <TopProgressBar elementRef={introSection} />}
    </header>
  );
};

Header.defaultProps = {
  theme: 'dark',
};

Header.propTypes = {
  theme: PropTypes.string,
  introSection: PropTypes.instanceOf(Object).isRequired,
  isMobileMenuOpened: PropTypes.bool.isRequired,
  setMobileMenuState: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ isMobileMenuOpened: selectIsMobileMenuOpened(state) }),
  { setMobileMenuState },
)(Header);
