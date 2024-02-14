import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import {
  getDataFromLocalStorageWithExpire,
  mobileResolution,
  tabletResolution,
} from 'utils/helper';
import {
  desktopResolutionSet,
  mobileResolutionSet,
  tabletResolutionSet,
} from 'store/reducers/layout';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'store/apis/dataSending';
import { AppContext, IntroSectionContext } from 'utils/appContext';
import { routes } from 'utils/routes';

export const useLayout = ({ children }) => {
  const { pathname } = useRouter();
  const isHomePage = pathname === routes.homepage.path;
  const { contextData: { duck } } = useContext(AppContext);
  const isDuckLoading = isHomePage && !duck;

  const introSection = useContext(IntroSectionContext);

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

  const [subscribe] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

  useEffect(() => {
    subscribe({ savedSubscriptionEmail: getDataFromLocalStorageWithExpire('subscriptionEmail') });
  }, [subscribe, children]);

  return {
    children,
    introSection,
    isDuckLoading,
  };
};
