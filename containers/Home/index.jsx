import { useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import HomeIntro from 'UI/sections/HomeIntro';
import MetaTags from 'components/Common/MetaTags';
import { loadDuck } from 'UI/components/Duck/DuckWrapper/utils/helpers';
import { HOMEPAGE_ARTICLES_LIMIT, PAGES } from 'utils/constants';
import { AppContext, IntroSectionContext, PageFetchContext } from 'utils/appContext';
import { getPage } from 'utils/dataFetching/getPage';
import { rootUrl } from 'utils/helper';

const SectionSelector = dynamic(() => import('containers/Home/SectionSelector'));

export const Home = async () => {
  const { contentModules, metaData: pageMetadata } = await getPage(PAGES.homepage);

  const { setPageFetchQuery } = useContext(PageFetchContext);
  setPageFetchQuery(PAGES.homepage);

  const introSection = useContext(IntroSectionContext);
  const { contextData: { duck }, setContextData } = useContext(AppContext);

  const blogQuery = { limit: HOMEPAGE_ARTICLES_LIMIT };

  useEffect(() => {
    if (duck) {
      return;
    }

    (async () => {
      const duckLoaded = await loadDuck();

      setContextData((prev) => ({ ...prev, duck: duckLoaded }));
    })();
  }, [duck, setContextData]);

  return (
    <>
      <MetaTags
        page={PAGES.homepage}
        pageMetadata={{ ...pageMetadata, url: rootUrl }}
      />
      <HomeIntro introSection={introSection} />
      {contentModules?.map((module, i) => (
        <SectionSelector
          key={`section/${i}`}
          section={module}
          type={PAGES.homepage}
          blogQuery={blogQuery}
        />
      ))}
    </>
  );
};

export default Home;
