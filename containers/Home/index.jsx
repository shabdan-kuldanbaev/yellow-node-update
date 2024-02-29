'use client';

import { useContext, useEffect } from 'react';
import HomeIntro from 'UI/sections/HomeIntro';
import { loadDuck } from 'UI/components/Duck/DuckWrapper/utils/helpers';
import SectionSelector from 'containers/Home/SectionSelector';
import { AppContext, IntroSectionContext } from 'utils/appContext';
import { routes } from 'utils/routes';

export const Home = ({
  contentModules,
  articles,
  children,
}) => {
  const introSection = useContext(IntroSectionContext);
  const { contextData: { duck }, setContextData } = useContext(AppContext);

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
      {children}
      <HomeIntro introSection={introSection} />
      {contentModules?.map((module, i) => (
        <SectionSelector
          key={`section/${i}`}
          section={module}
          type={routes.homepage.slug}
          articles={articles}
        />
      ))}
    </>
  );
};

export default Home;
