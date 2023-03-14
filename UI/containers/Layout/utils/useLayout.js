import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { mobileResolution, tabletResolution } from 'utils/helper';
import {
  desktopResolutionSet,
  mobileResolutionSet,
  tabletResolutionSet,
} from 'redux/reducers/layout';
import { AppContext } from 'utils/appContext';
import { routes } from 'utils/routes';

export const useLayout = ({ children, introSection }) => {
  const { pathname } = useRouter();
  const isHomePage = pathname === routes.homepage.path;
  const { contextData: { duck } } = useContext(AppContext);
  const isDuckLoading = isHomePage && !duck;

  const dispatch = useDispatch();

  useEffect(() => {
    const handleOnResize = () => {
      const { innerWidth } = window;

      if (innerWidth <= mobileResolution) {
        dispatch(mobileResolutionSet());
      } else if (innerWidth > mobileResolution && innerWidth <= tabletResolution) {
        dispatch(tabletResolutionSet());
      } else {
        dispatch(desktopResolutionSet());
      }
    };

    handleOnResize();
    window.addEventListener('resize', handleOnResize);

    return () => window.removeEventListener('resize', handleOnResize);
  }, [dispatch]);

  return {
    children,
    introSection,
    isDuckLoading,
  };
};
