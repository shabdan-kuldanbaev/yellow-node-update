import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { mobileResolution } from 'utils/helper';
import { selectIsModelLoaded } from 'redux/selectors/home';
import { selectIsMobileMenuOpened } from 'redux/selectors/layout';
import { setMobileMenuState } from 'redux/actions/layout';
import { useRouter } from 'next/router';
import { SelectionBlock, Logo } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import Nav from './Nav';
import MobileMenu from './MobileMenu';

export const Header = ({ theme, introSection }) => {
  const { asPath } = useRouter();
  const currentPage = asPath.split('/')[1] || '';
  const isHomePage = currentPage === '';
  const [isAdditional, setAdditional] = useState(false);
  const [direction, setDirection] = useState('up');
  const [isLogoTextHidden, setIsLogoTextHidden] = useState(false);
  let oldY = 0;

  const dispatch = useDispatch();
  const setMobileMenu = (value) => dispatch(setMobileMenuState(value));
  const isModelLoaded = useSelector((state) => selectIsModelLoaded(state));
  const isMobileMenuOpened = useSelector((state) => selectIsMobileMenuOpened(state));

  const headerClassName = cn({
    [styles.headerContainer]: true,
    [styles.animate]: isModelLoaded,
    [styles.additional]: isAdditional,
    [styles[direction]]: isModelLoaded,
    [styles.notHome]: !isHomePage,
    [styles.deleteTextOfLogo]: isLogoTextHidden && isHomePage,
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
    oldY = window.pageYOffset;
    handleOnScroll();

    if (!isHomePage) document.body.style.backgroundColor = 'white';
    else document.body.style.backgroundColor = 'black';

    window.addEventListener('scroll', handleOnScroll);
    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, [currentPage]);

  return (
    <header className={headerClassName}>
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
    </header>
  );
};

Header.defaultProps = {
  theme: 'dark',
};

Header.propTypes = {
  theme: PropTypes.string,
  introSection: PropTypes.instanceOf(Object).isRequired,
};
