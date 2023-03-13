import React from 'react';
import PropTypes from 'prop-types';
import HomeIntro from 'UI/sections/HomeIntro';
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
  ...rest
}) => {
  const contentModules = pageData;

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
