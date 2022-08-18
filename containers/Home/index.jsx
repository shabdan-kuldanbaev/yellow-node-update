import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Intro from 'containers/Home/Intro';
import MetaTags from 'components/Common/MetaTags';
import SectionSelector from 'containers/Home/SectionSelector';
import { PAGES } from 'utils/constants';
import { microdata } from 'utils/microdata';
import errorHelper from "../../utils/error";

const FeedbackFormContainer = dynamic(() => import('containers/Home/FeedbackForm'));

export const Home = ({
  theme,
  introSection,
  pageMetadata,
  pageData,
  type,
}) => {
  const { main: contentModules, hasFeedbackForm } = pageData;
  errorHelper.handleMessage({ message: 'my 12312312 3message' });

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
      {hasFeedbackForm && <FeedbackFormContainer />}
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
