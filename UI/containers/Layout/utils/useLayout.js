import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { mobileResolution, tabletResolution } from 'utils/helper';
import { selectDuck } from 'redux/selectors/home';
import {
  setMobileResolutions,
  setTabletResolutions,
  setFullResolution,
} from 'redux/actions/layout';

const HOME_PAGE_PATHNAME = '/';

export const useLayout = ({ children, introSection }) => {
  const dispatch = useDispatch();
  const { pathname } = useRouter();
  const duck = useSelector(selectDuck);

  const isHomePage = pathname === HOME_PAGE_PATHNAME;
  const isDuckLoaded = isHomePage && !duck;

  useEffect(() => {
    const handleOnResize = () => {
      const { innerWidth } = window;

      if (innerWidth <= mobileResolution) dispatch(setMobileResolutions(true));
      else dispatch(setMobileResolutions(false));

      if (innerWidth > mobileResolution && innerWidth <= tabletResolution) dispatch(setTabletResolutions(true));
      else dispatch(setTabletResolutions(false));

      if (innerWidth > tabletResolution) dispatch(setFullResolution(true));
      else dispatch(setFullResolution(false));
    };

    handleOnResize();
    window.addEventListener('resize', handleOnResize);

    return () => window.removeEventListener('resize', handleOnResize);
  }, [dispatch]);

  return {
    children,
    introSection,
    isDuckLoaded,
  };
};
