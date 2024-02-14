import Layout from 'UI/containers/Layout';
import { Provider as StoreProvider } from 'react-redux';
import { AppContext, IntroSectionContext, PageFetchContext } from 'utils/appContext';

import useApp from './useApp';

const App = ({ children, params }) => {
  const {
    introSection,
    AppContextValue,
    PageFetchContextValue,
  } = useApp(params);

  return (
    <StoreProvider>
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
    </StoreProvider>
  );
};

export default App;
