import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import {
  CASE_STUDIES,
  PAGES_WITH_TRANSPARENT_HEADER,
  CASE_STUDIES_WITH_TRANSPARENT_HEADER,
  PAGES_WITH_GRAY_HEADER,
  ROUTES,
} from 'utils/constants';

export const useHeader = ({ introSection }) => {
  const { page, project } = useSearchParams();
  const asPath = usePathname();
  const currentPage = asPath.split('/')[1] || '';
  const isPageWithTransparentHeader = PAGES_WITH_TRANSPARENT_HEADER.includes(project) || PAGES_WITH_TRANSPARENT_HEADER.includes(asPath);
  const isPageWithGrayHeader = PAGES_WITH_GRAY_HEADER.includes(currentPage) || PAGES_WITH_GRAY_HEADER.includes(asPath);
  const isCaseStudyWithTransparentHeader = CASE_STUDIES_WITH_TRANSPARENT_HEADER.includes(project)
    || CASE_STUDIES_WITH_TRANSPARENT_HEADER.includes(asPath);

  const headerTheme = [
    CASE_STUDIES.tell,
    CASE_STUDIES.openSense,
    CASE_STUDIES.separateUs,
    CASE_STUDIES.beautonomy,
    CASE_STUDIES.famlicious,
    CASE_STUDIES.bionorica,
    CASE_STUDIES.carbonSpace,
    CASE_STUDIES.chatSolutions,
    CASE_STUDIES.digitalWallet,
    ROUTES.company.path,
  ].includes(project || asPath)
    ? 'light'
    : 'dark';

  const [isPageScrolledDown, setIsPageScrolledDown] = useState(false);
  const [isLogoTextHidden, setIsLogoTextHidden] = useState(false);
  const [isDropMenuOpened, setIsDropMenuOpenedNew] = useState(false);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  // TODO rework this check
  const isTransparentHeader = isPageWithTransparentHeader || isCaseStudyWithTransparentHeader;
  const logo = !isPageScrolledDown && isTransparentHeader
    ? project || asPath
    : 'default';

  const isHeaderColorNeedChange = isPageWithTransparentHeader
    && isDropMenuOpened
    && !isPageScrolledDown;
  const navTheme = isHeaderColorNeedChange
    ? 'dark'
    : headerTheme;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => setIsMobile(window?.innerWidth <= 768), []);

  useEffect(() => {
    const handleOnScroll = () => {
      if (introSection && introSection.current) {
        const intro = introSection.current.getBoundingClientRect();

        if (isPageWithTransparentHeader) {
          setIsPageScrolledDown(intro.top < -200);
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

  const setMobileMenu = useCallback((state) => () => {
    setIsMobileMenuOpened(state);
  }, []);

  const setDesktopMenu = (isOpen) => {
    setIsDropMenuOpenedNew(isOpen);
  };

  const isPageScrolling = (isPageScrolledDown || (!!currentPage && (currentPage !== '' && !isTransparentHeader)));

  return {
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
    isMobile,
    isPageWithGrayHeader,
    setDesktopMenu,
    isDropMenuOpened,
  };
};
