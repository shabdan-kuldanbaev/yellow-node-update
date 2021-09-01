import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { selectIsMobileMenuOpened } from 'redux/selectors/layout';
import { setMobileMenuState } from 'redux/actions/layout';
import LinearIndeterminate from 'components/Common/LinearIndeterminate';
import Logo from 'components/Common/Logo';
import SelectionBlock from 'components/BlogCommon/SelectionBlock';
import { TopProgressBar } from 'components/Common/TopProgressBar';
import {
  ROUTES,
  CASE_STUDIES_SLUGS,
  CASE_STUDIES,
  WITH_SUB_ITEMS,
} from 'utils/constants';
import MobileMenu from './MobileMenu';
import Nav from './Nav';
import styles from './styles.module.scss';

const Header = ({
  theme,
  introSection,
  isMobileMenuOpened,
  setMobileMenuState: setMobileMenu,
}) => {
  const { asPath, query: { page, project } } = useRouter();
  const currentPage = asPath.split('/')[1] || '';
  const isCaseStudyPage = CASE_STUDIES_SLUGS.includes(project);
  const isHomePage = asPath === ROUTES.homepage.path;
  const isPageWithTransparentHeader = isHomePage || isCaseStudyPage;
  const headerTheme = [
    CASE_STUDIES.tell,
    CASE_STUDIES.openSense,
    CASE_STUDIES.separateUs,
  ].includes(project)
    ? 'light'
    : 'dark';
  const [isAdditional, setAdditional] = useState(false);
  const [isLogoTextHidden, setIsLogoTextHidden] = useState(false);
  const [isDropMenuOpened, setIsDropMenuOpened] = useState(false);
  // TODO rework this check
  const logo = !isAdditional && isPageWithTransparentHeader
    ? project || 'home'
    : 'default';

  const openDropDown = (slug) => {
    if (WITH_SUB_ITEMS.includes(slug)) {
      setIsDropMenuOpened(true);
    }
  };
  const closeDropDown = () => setIsDropMenuOpened(false);

  useEffect(() => {
    const handleOnScroll = () => {
      if (introSection && introSection.current) {
        const intro = introSection.current.getBoundingClientRect();

        if (isPageWithTransparentHeader) {
          intro.bottom < 65
            ? setAdditional(true)
            : setAdditional(false);
          intro.top < -200
            ? setIsLogoTextHidden(true)
            : setIsLogoTextHidden(false);
        }

        if (!isPageWithTransparentHeader) {
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
  ]);

  useEffect(() => {
    setAdditional(false);
  }, [asPath]);

  return (
    <header className={cn({
      [styles.headerContainer]: true,
      [styles.additional]: isAdditional,
      [styles.notHome]: !isPageWithTransparentHeader,
      [styles.deleteTextOfLogo]: isLogoTextHidden,
      [styles.openedDropDown]: isPageWithTransparentHeader && isDropMenuOpened,
    })}
    >
      <div className={styles.logo}>
        <Logo type={logo} />
      </div>
      <Nav
        theme={isPageWithTransparentHeader && isDropMenuOpened ? 'dark' : headerTheme}
        isAdditional={isAdditional}
        isTransparentHeader={isPageWithTransparentHeader}
        currentPage={currentPage}
        isMobileMenuOpened={isMobileMenuOpened}
        setMobileMenuState={setMobileMenu}
        openDropDown={openDropDown}
        closeDropDown={closeDropDown}
        isDropMenuOpened={isDropMenuOpened}
      />
      <MobileMenu
        isMobileMenuOpened={isMobileMenuOpened}
        setMobileMenuState={setMobileMenu}
        isAdditional={isAdditional}
        openDropDown={openDropDown}
        closeDropDown={closeDropDown}
        isDropMenuOpened={isDropMenuOpened}
      />
      {!isPageWithTransparentHeader && <LinearIndeterminate />}
      {(asPath.includes('blog/') && !page) && <TopProgressBar elementRef={introSection} />}
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
