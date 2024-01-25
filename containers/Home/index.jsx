'use client';

import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import HomeIntro from 'UI/sections/HomeIntro';
import MetaTags from 'components/Common/MetaTags';
import { loadDuck } from 'UI/components/Duck/DuckWrapper/utils/helpers';
import { PAGES } from 'utils/constants';
import { useContext, useEffect } from 'react';
import { AppContext } from 'utils/appContext';
import { handleError } from 'utils/error';

const SectionSelector = dynamic(() => import('containers/Home/SectionSelector'));

export const Home = ({
  theme,
  introSection,
  pageMetadata,
  pageData,
  type,
  ...rest
}) => {
  const contentModules = pageData;

  const { contextData: { duck }, setContextData } = useContext(AppContext);

  useEffect(() => {
    handleError({
      error: { check: true },
      message: 'check',
    });

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
        pageMetadata={pageMetadata}
      />
      <HomeIntro
        theme={theme}
        introSection={introSection}
      />
      {contentModules?.map((module, i) => (
        <SectionSelector
          key={`section/${i}`}
          section={module}
          type={type}
          {...rest}
        />
      ))}
    </>
  );
};

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  pageMetadata: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Home;
