import React, { Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Intro from 'containers/Home/Intro';
import FullLayout from 'components/Layout/FullLayout';
import MetaTags from 'components/Common/MetaTags';
import PhotoGallery from 'components/Common/PhotoGallery';
import { loadDuck } from 'components/HomeCommon/DuckContainer/utils/threeHelper';
import { PAGES } from 'utils/constants';
import { microdata } from 'utils/microdata';
import { selectDuck } from 'redux/selectors/home';
import { fetchDuck } from 'redux/actions/home';
import LoadingPlaceholder from './LoadingPlaceholder';

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
}) => {
  const dispatch = useDispatch();
  const duck = useSelector(selectDuck);

  useEffect(() => {
    if (!duck) {
      dispatch(fetchDuck({ isFirstHomepageVisit: false, loadDuck }));
    }
  }, [dispatch, duck]);

  if (!duck) {
    return <LoadingPlaceholder />;
  }

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
      <Suspense>
        <Portfolio projects={projects} />
      </Suspense>
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
};

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
