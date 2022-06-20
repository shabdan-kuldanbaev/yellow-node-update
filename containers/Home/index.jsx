import React, {
  Fragment,
  useEffect,
  useRef,
  useContext,
} from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDuck } from 'redux/actions/home';
import {
  selectImageCarousel,
  selectIsPageReadyToDisplay,
  selectMetaData,
} from 'redux/selectors/layout';
import { selectDuck } from 'redux/selectors/home';
import Intro from 'containers/Home/Intro';
import { FullLayout } from 'components/Layout/FullLayout';
import { loadDuck } from 'components/HomeCommon/Duck/utils/threeHelper';
import { MetaTags } from 'components/Common/MetaTags';
import PhotoGallery from 'components/Common/PhotoGallery';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { microdata } from 'utils/microdata';
import { AppContext } from 'utils/appContext';
import LoadingPlaceholder from './LoadingPlaceholder';

const Portfolio = dynamic(() => import('containers/Home/Portfolio'));
const ReviewsContainer = dynamic(() => import('containers/Home/Reviews'));
const Blog = dynamic(() => import('containers/Home/Blog'));
const FeedbackFormContainer = dynamic(() => import('containers/Home/FeedbackForm'));

export const Home = ({
  theme,
  introSection,
  photosData,
  isPageReadyToDisplay,
  fetchDuck: fetchDuckData,
  duck,
  metaData,
}) => {
  const gradientRef = useRef(null);
  const { contentModules } = getDocumentFields(photosData, ['contentModules']);
  const { contextData, setContextData } = useContext(AppContext);
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}`,
  };

  useEffect(() => {
    if (!duck) {
      fetchDuckData({
        isFirstHomepageVisit: contextData.isFirstHomepageVisit,
        loadDuck,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duck]);

  useEffect(() => () => {
    if (!contextData.isHomepageVisit) {
      setContextData({
        ...contextData,
        isFirstHomepageVisit: true,
        isHomepageVisit: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <MetaTags
        page={PAGES.homepage}
        pageMetadata={pageMetadata}
        pageMicrodata={microdata.homepage()}
      />
      {(!isPageReadyToDisplay || !duck) ? <LoadingPlaceholder /> : (
        <Fragment>
          <Intro
            theme={theme}
            introSection={introSection}
            duck={duck}
            isFirstHomepageVisit={contextData.isFirstHomepageVisit}
          />
          {Portfolio && <Portfolio gradientRef={gradientRef} />}
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
              <PhotoGallery photos={contentModules} />
            </FullLayout>
            <FeedbackFormContainer />
          </FullLayout>
        </Fragment>
      )}
    </Fragment>
  );
};

Home.defaultProps = {
  photosData: {},
  duck: null,
};

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
  photosData: PropTypes.instanceOf(Object),
  isPageReadyToDisplay: PropTypes.bool.isRequired,
  fetchDuck: PropTypes.func.isRequired,
  duck: PropTypes.instanceOf(Object),
  metaData: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    ogImage: PropTypes.string,
  }).isRequired,
};

export default connect(
  (state) => ({
    photosData: selectImageCarousel(state),
    isPageReadyToDisplay: selectIsPageReadyToDisplay(state),
    duck: selectDuck(state),
    metaData: selectMetaData(state),
  }),
  { fetchDuck },
)(Home);
