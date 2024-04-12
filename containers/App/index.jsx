'use client';

import Layout from 'UI/containers/Layout';
import { ReduxProvider } from 'store/provider';
import {
  AppContext,
  IntroSectionContext,
  PageClustersContext,
} from 'utils/appContext';
import useApp from './useApp';

const App = ({ children }) => {
  const {
    introSection,
    AppContextValue,
    PageClustersContextValue,
    slug,
    pathname,
  } = useApp();

  return (
    <ReduxProvider>
      <AppContext.Provider value={AppContextValue}>
        {/* TODO: Remove PageFetch context */}
        <PageClustersContext.Provider value={PageClustersContextValue}>
          <IntroSectionContext.Provider value={introSection}>
            <Layout
              slug={slug}
              pathname={pathname}
            >
              {children}
            </Layout>
          </IntroSectionContext.Provider>
        </PageClustersContext.Provider>
      </AppContext.Provider>
    </ReduxProvider>
  );
};

export default App;
