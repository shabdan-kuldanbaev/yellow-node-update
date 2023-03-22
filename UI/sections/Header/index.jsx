import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Logo from 'UI/components/Logo';
import TopProgressBar from 'components/Common/TopProgressBar';
import { useHeader } from './utils/useHeader';
import styles from './styles.module.scss';

const MobileMenu = dynamic(() => import('./MobileMenu'));
const Nav = dynamic(() => import('./Nav'));

const Header = (props) => {
  const {
    isLogoTextHidden,
    isHeaderColorNeedChange,
    introSection,
    isPageWithTransparentHeader,
    isCaseStudyWithTransparentHeader,
    isMobileMenuOpened,
    isPageScrolledDown,
    isPageScrolling,
    setMobileMenu,
    navTheme,
    logo,
    asPath,
    page,
    isPageWithGrayHeader,
  } = useHeader(props);

  return (
    <header className={cn(styles.headerContainer, {
      [styles.pageScrolling]: isPageScrolledDown,
      [styles.notHome]: !isPageWithTransparentHeader && !isCaseStudyWithTransparentHeader,
      [styles.deleteTextOfLogo]: isLogoTextHidden,
      [styles.openedDropDown]: isHeaderColorNeedChange,
      [styles.grayHeader]: isPageWithGrayHeader,
    })}
    >
      <div className={styles.logo}>
        <Logo type={logo} />
      </div>
      <Nav
        theme={navTheme}
        isPageScrolling={isPageScrolling}
        isHeader
      />
      <MobileMenu
        isLightTheme={!isPageWithTransparentHeader && !isCaseStudyWithTransparentHeader}
        isMobileMenuOpened={!!isMobileMenuOpened}
        setMobileMenuState={setMobileMenu(!isMobileMenuOpened)}
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
