'use client';

import Layout from 'UI/containers/Layout';
import { ReduxProvider } from 'store/provider';
import { AppContext, IntroSectionContext, PageFetchContext } from 'utils/appContext';
import useApp from './useApp';

const App = ({ children, params }) => {
  const {
    introSection,
    AppContextValue,
    PageFetchContextValue,
  } = useApp(params);

  return (
    <ReduxProvider>
      <AppContext.Provider value={AppContextValue}>
        {/* TODO: Remove PageFetch context */}
        <PageFetchContext.Provider value={PageFetchContextValue}>
          <IntroSectionContext.Provider value={introSection}>
            <Layout>
              {children}
            </Layout>
          </IntroSectionContext.Provider>
        </PageFetchContext.Provider>
      </AppContext.Provider>
    </ReduxProvider>
  );
};

export default App;
