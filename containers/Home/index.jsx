import React from 'react';
import PropTypes from 'prop-types';
import Intro from 'UI/sections/Intro';
import MetaTags from 'components/Common/MetaTags';
import SectionSelector from 'containers/Home/SectionSelector';
import { PAGES } from 'utils/constants';
import { microdata } from 'utils/microdata';

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
      <Intro
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
