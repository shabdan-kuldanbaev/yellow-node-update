import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { selectIsMobileMenuOpened, selectIsDropMenuOpened } from 'redux/selectors/layout';
import { setMobileMenuState } from 'redux/actions/layout';
import LinearIndeterminate from 'components/Common/LinearIndeterminate';
import Logo from 'components/Common/Logo';
import { TopProgressBar } from 'components/Common/TopProgressBar';
import {
  ROUTES,
  CASE_STUDIES_SLUGS,
  CASE_STUDIES,
  PAGES_WITH_TRANSPARENT_HEADER,
  CASE_STUDIES_WITH_TRANSPARENT_HEADER,
} from 'utils/constants';
import MobileMenu from './MobileMenu';
import Nav from './Nav';
import styles from './styles.module.scss';

const Header = ({
  introSection,
  isMobileMenuOpened,
  setMobileMenuState: setMobileMenu,
  isDropMenuOpened,
}) => {
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
          intro.bottom < 65
            ? setIsPageScrolledDown(true)
            : setIsPageScrolledDown(false);
          intro.top < -200
            ? setIsLogoTextHidden(true)
            : setIsLogoTextHidden(false);
        }

        if (isCaseStudyWithTransparentHeader) {
          intro.top < -170
            ? setIsPageScrolledDown(true)
            : setIsPageScrolledDown(false);
          intro.top < -220
            ? setIsLogoTextHidden(true)
            : setIsLogoTextHidden(false);
        }

        if (!isTransparentHeader) {
          intro.top < -10
            ? setIsLogoTextHidden(true)
            : setIsLogoTextHidden(false);
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
      {!isHomepage && <LinearIndeterminate />}
      {(asPath.includes('blog/') && !page) && <TopProgressBar elementRef={introSection} />}
    </header>
  );
};

Header.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  isMobileMenuOpened: PropTypes.bool.isRequired,
  setMobileMenuState: PropTypes.func.isRequired,
  isDropMenuOpened: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    isMobileMenuOpened: selectIsMobileMenuOpened(state),
    isDropMenuOpened: selectIsDropMenuOpened(state),
  }),
  { setMobileMenuState },
)(Header);
