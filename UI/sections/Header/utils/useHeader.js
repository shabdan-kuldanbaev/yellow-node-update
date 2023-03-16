import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { selectIsMobileMenuOpened, selectIsDropMenuOpened } from 'redux/selectors/layout';
import { mobileMenuOpened } from 'redux/reducers/layout';
import {
  CASE_STUDIES,
  PAGES_WITH_TRANSPARENT_HEADER,
  CASE_STUDIES_WITH_TRANSPARENT_HEADER,
} from 'utils/constants';

export const useHeader = ({ introSection }) => {
  const dispatch = useDispatch();
  const isMobileMenuOpened = useSelector(selectIsMobileMenuOpened);
  const isDropMenuOpened = useSelector(selectIsDropMenuOpened);

  const { asPath, query: { page, project } } = useRouter();
  const currentPage = asPath.split('/')[1] || '';
  const isPageWithTransparentHeader = PAGES_WITH_TRANSPARENT_HEADER.includes(project) || PAGES_WITH_TRANSPARENT_HEADER.includes(asPath);
  const isCaseStudyWithTransparentHeader = CASE_STUDIES_WITH_TRANSPARENT_HEADER.includes(project)
  || CASE_STUDIES_WITH_TRANSPARENT_HEADER.includes(asPath);
  const headerTheme = [
    CASE_STUDIES.tell,
    CASE_STUDIES.openSense,
    CASE_STUDIES.separateUs,
    CASE_STUDIES.beautonomy,
    CASE_STUDIES.famlicious,
    CASE_STUDIES.bionorica,
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => setIsMobile(window?.innerWidth <= 768), []);

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

  const setMobileMenu = useCallback((state) => () => {
    dispatch(mobileMenuOpened(state));
  }, [dispatch]);

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
  };
};
