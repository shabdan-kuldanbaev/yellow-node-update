import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Intro from 'containers/Home/Intro';
import FullLayout from 'components/Layout/FullLayout';
import MetaTags from 'components/Common/MetaTags';
import PhotoGallery from 'components/Common/PhotoGallery';
import { PAGES } from 'utils/constants';
import { microdata } from 'utils/microdata';

const Portfolio = dynamic(() => import('containers/Home/Portfolio'), { suspense: true, ssr: false });
const ReviewsContainer = dynamic(() => import('containers/Home/Reviews'), { ssr: false });
const Blog = dynamic(() => import('containers/Home/Blog'));
const FeedbackFormContainer = dynamic(() => import('containers/Home/FeedbackForm'));

export const Home = ({
  theme,
  introSection,
  pageMetadata,
  photos,
  projects,
}) => (
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
    <Portfolio projects={projects} />
    {/* // TODO wrap all page in full layout */}
    <FullLayout
      disableTopPadding
      disableBottomPadding
    >
      <ReviewsContainer />
      <Blog />
      <FullLayout
        disableMaxWidth
        disableTopPadding
        disableSidePadding
        disableBottomPadding
      >
        <PhotoGallery photos={photos} />
      </FullLayout>
      <FeedbackFormContainer />
    </FullLayout>
  </>
);

Home.defaultProps = {
  projects: {},
};

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  pageMetadata: PropTypes.instanceOf(Object).isRequired,
  photos: PropTypes.instanceOf(Array).isRequired,
  theme: PropTypes.string.isRequired,
  projects: PropTypes.instanceOf(Object),
};

export default Home;
