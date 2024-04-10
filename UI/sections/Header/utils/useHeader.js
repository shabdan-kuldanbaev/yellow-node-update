import { useParams, usePathname } from 'next/navigation';
import {
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  CASE_STUDIES,
  PAGES_WITH_TRANSPARENT_HEADER,
  PAGES_WITH_GRAY_HEADER,
  ROUTES,
} from 'utils/constants';

export const useHeader = ({ introSection }) => {
  const { 'service-slug': page, slug: project } = useParams();
  const asPath = usePathname();

  const currentPage = asPath.split('/')[1] || '';
  const isTransparentHeader = PAGES_WITH_TRANSPARENT_HEADER.includes(project) || PAGES_WITH_TRANSPARENT_HEADER.includes(asPath);
  const isGrayHeader = PAGES_WITH_GRAY_HEADER.includes(currentPage) || PAGES_WITH_GRAY_HEADER.includes(asPath);

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
    CASE_STUDIES.generativeAi,
    CASE_STUDIES.tasteMatch,
    ROUTES.company.path,
  ].includes(project || asPath)
    ? 'light'
    : 'dark';

  const [isPageScrolledDown, setIsPageScrolledDown] = useState(false);
  const [isLogoTextHidden, setIsLogoTextHidden] = useState(false);
  const [isDropMenuOpened, setIsDropMenuOpenedNew] = useState(false);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  // TODO rework this check
  const logo = !isPageScrolledDown && isTransparentHeader
    ? project || asPath
    : 'default';

  const isHeaderColorNeedChange = isTransparentHeader
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

        if (isTransparentHeader) {
          setIsPageScrolledDown(intro.top < -200);
          setIsLogoTextHidden(intro.top < -200);
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
    isTransparentHeader,
    isLogoTextHidden,
    isHeaderColorNeedChange,
    introSection,
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
  };
};
