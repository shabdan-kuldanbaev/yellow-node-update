import React, {
  Fragment,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDuck } from 'redux/actions/home';
import { selectImageCarousel, selectIsPageReadyToDisplay } from 'redux/selectors/layout';
import { selectDuck } from 'redux/selectors/home';
import Blog from 'containers/Home/Blog';
import FeedbackFormContainer from 'containers/Home/FeedbackForm';
import Intro from 'containers/Home/Intro';
import Portfolio from 'containers/Home/Portfolio';
import { ReviewsContainer } from 'containers/Home/Reviews';
import { FullLayout } from 'components/Layout/FullLayout';
import { loadDuck } from 'components/HomeCommon/Duck/utils/threeHelper';
import { MetaTags } from 'components/Common/MetaTags';
import PhotoGallery from 'components/Common/PhotoGallery';
import { getDocumentFields } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { microdata } from 'utils/microdata';
import { AppContext } from 'utils/appContext';
import LoadingPlaceholder from './LoadingPlaceholder';

export const Home = ({
  theme,
  introSection,
  photosData,
  isPageReadyToDisplay,
  fetchDuck: fetchDuckData,
  duck,
}) => {
  const gradientRef = useRef(null);
  const { contentModules } = getDocumentFields(photosData, ['contentModules']);
  const { contextData, setContextData } = useContext(AppContext);

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
          <Portfolio gradientRef={gradientRef} />
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
};

export default connect(
  (state) => ({
    photosData: selectImageCarousel(state),
    isPageReadyToDisplay: selectIsPageReadyToDisplay(state),
    duck: selectDuck(state),
  }),
  { fetchDuck },
)(Home);
