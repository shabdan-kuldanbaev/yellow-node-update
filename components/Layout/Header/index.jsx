import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { selectIsMobileMenuOpened, selectIsDropMenuOpened } from 'redux/selectors/layout';
import { setMobileMenuState } from 'redux/actions/layout';
import Logo from 'components/Common/Logo';
import TopProgressBar from 'components/Common/TopProgressBar';
import {
  CASE_STUDIES,
  PAGES_WITH_TRANSPARENT_HEADER,
  CASE_STUDIES_WITH_TRANSPARENT_HEADER,
} from 'utils/constants';
import MobileMenu from './MobileMenu';
import Nav from './Nav';
import styles from './styles.module.scss';

const Header = ({ introSection }) => {
  const dispatch = useDispatch();
  const isMobileMenuOpened = useSelector(selectIsMobileMenuOpened);
  const isDropMenuOpened = useSelector(selectIsDropMenuOpened);

  const { asPath, query: { page, project } } = useRouter();
  const currentPage = asPath.split('/')[1] || '';
  const isPageWithTransparentHeader = PAGES_WITH_TRANSPARENT_HEADER.includes(project) || PAGES_WITH_TRANSPARENT_HEADER.includes(asPath);
  const isCaseStudyWithTransparentHeader = CASE_STUDIES_WITH_TRANSPARENT_HEADER.includes(project)
  || CASE_STUDIES_WITH_TRANSPARENT_HEADER.includes(asPath);
  const isHomepage = currentPage === '';
  const headerTheme = [
    CASE_STUDIES.tell,
    CASE_STUDIES.openSense,
    CASE_STUDIES.separateUs,
    CASE_STUDIES.beautonomy,
  ].includes(project)
    ? 'light'
    : 'dark';
  const [isPageScrolledDown, setIsPageScrolledDown] = useState(false);
  const [isLogoTextHidden, setIsLogoTextHidden] = useState(false);
  // TODO rework this check
  const isTransparentHeader = isPageWithTransparentHeader || isCaseStudyWithTransparentHeader;
  const logo = !isPageScrolledDown && isTransparentHeader
    ? project || 'home'
    : 'default';
  const isHeaderColorNeedChange = isPageWithTransparentHeader
    && isDropMenuOpened
    && !isPageScrolledDown;
  const navTheme = isHeaderColorNeedChange
    ? 'dark'
    : headerTheme;

  useEffect(() => {
    const handleOnScroll = () => {
      if (introSection && introSection.current) {
        const intro = introSection.current.getBoundingClientRect();

        if (isPageWithTransparentHeader) {
          setIsPageScrolledDown(intro.bottom < 65);
          setIsLogoTextHidden(intro.top < -200);
        }

        if (isCaseStudyWithTransparentHeader) {
          setIsPageScrolledDown(intro.top < -170);
          setIsLogoTextHidden(intro.top < -220);
        }

        if (!isTransparentHeader) {
          setIsLogoTextHidden(intro.top < -10);
        }
      }
    };

    handleOnScroll();
    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, [
    currentPage,
    introSection,
    isPageWithTransparentHeader,
    isCaseStudyWithTransparentHeader,
    isTransparentHeader,
  ]);

  useEffect(() => {
    setIsPageScrolledDown(false);
  }, [asPath]);

  const setMobileMenu = useCallback(() => {
    dispatch(setMobileMenuState());
  }, [dispatch]);

  return (
    <header className={cn({
      [styles.headerContainer]: true,
      [styles.pageScrolling]: isPageScrolledDown,
      [styles.notHome]: !isPageWithTransparentHeader && !isCaseStudyWithTransparentHeader,
      [styles.deleteTextOfLogo]: isLogoTextHidden,
      [styles.openedDropDown]: isHeaderColorNeedChange,
    })}
    >
      <div className={styles.logo}>
        <Logo type={logo} />
      </div>
      <Nav
        theme={navTheme}
        isPageScrolledDown={isPageScrolledDown}
        isTransparentHeader={isTransparentHeader}
        currentPage={currentPage}
        isMobileMenuOpened={isMobileMenuOpened}
        setMobileMenuState={setMobileMenu}
        isHeader
      />
      <MobileMenu
        isMobileMenuOpened={isMobileMenuOpened}
        setMobileMenuState={setMobileMenu}
        isPageScrolledDown={isPageScrolledDown}
      />
      {(asPath.includes('blog/') && !page) && <TopProgressBar elementRef={introSection} />}
    </header>
  );
};

Header.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default Header;
