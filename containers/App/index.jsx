import Layout from 'UI/containers/Layout';
import { Provider } from 'react-redux';
import { AppContext, PageFetchContext } from 'utils/appContext';

import useApp from './useApp';

const App = ({ children, params }) => {
  const {
    introSection,
    AppContextValue,
    PageFetchContextValue,
  } = useApp(params);

  return (
    <Provider>
      <AppContext.Provider value={AppContextValue}>
        {/* TODO: Remove PageFetch context */}
        <PageFetchContext.Provider value={PageFetchContextValue}>
          <Layout introSection={introSection}>
            {children}
          </Layout>
        </PageFetchContext.Provider>
      </AppContext.Provider>
    </Provider>
  );
};

export default App;
