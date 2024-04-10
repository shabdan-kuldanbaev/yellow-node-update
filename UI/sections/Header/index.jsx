'use client';

import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Logo from 'UI/components/Logo';
import { routes } from 'utils/routes';
import { useHeader } from './utils/useHeader';
import styles from './styles.module.scss';
import SimpleHeader from '../SimpleHeader';

const MobileMenu = dynamic(() => import('./MobileMenu'));
const TopProgressBar = dynamic(() => import('components/Common/TopProgressBar'));
const Nav = dynamic(() => import('./Nav'));

const pagesWithSimpleHeader = [
  routes.aiSoftwareDevelopmentServices.path,
];

const Header = (props) => {
  const {
    isLogoTextHidden,
    isHeaderColorNeedChange,
    introSection,
    isTransparentHeader,
    isMobileMenuOpened,
    isPageScrolledDown,
    isPageScrolling,
    setMobileMenu,
    navTheme,
    logo,
    asPath,
    page,
    isMobile,
    isGrayHeader,
    setDesktopMenu,
    isDropMenuOpened,
  } = useHeader(props);

  if (pagesWithSimpleHeader.includes(asPath)) {
    return <SimpleHeader />;
  }

  return (
    <header className={cn(styles.headerContainer, {
      [styles.pageScrolling]: isPageScrolledDown,
      [styles.notHome]: !isTransparentHeader,
      [styles.deleteTextOfLogo]: isLogoTextHidden,
      [styles.openedDropDown]: isHeaderColorNeedChange,
      [styles.grayHeader]: isGrayHeader,
    })}
    >
      <div className={styles.logo}>
        <Logo type={logo} />
      </div>
      {!isMobile ? (
        <Nav
          theme={navTheme}
          isPageScrolling={isPageScrolling}
          isHeader
          setDesktopMenu={setDesktopMenu}
          isDropMenuOpened={isDropMenuOpened}
        />
      ) : (
        <MobileMenu
          isLightTheme={!isTransparentHeader}
          isMobileMenuOpened={isMobileMenuOpened}
          setMobileMenuState={setMobileMenu(!isMobileMenuOpened)}
          isPageScrolledDown={isPageScrolledDown}
        />
      )}
      {(asPath.includes('blog/') && !page) && <TopProgressBar elementRef={introSection} />}
    </header>
  );
};

Header.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default Header;
