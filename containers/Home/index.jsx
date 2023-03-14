import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import HomeIntro from 'UI/sections/HomeIntro';
import MetaTags from 'components/Common/MetaTags';
import { PAGES } from 'utils/constants';
import { microdata } from 'utils/microdata';

const SectionSelector = dynamic(() => import('containers/Home/SectionSelector'));

export const Home = ({
  theme,
  introSection,
  pageMetadata,
  pageData,
  type,
}) => {
  const { main: contentModules } = pageData;

  return (
    <>
      <MetaTags
        page={PAGES.homepage}
        pageMetadata={pageMetadata}
        pageMicrodata={microdata.homepage()}
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
