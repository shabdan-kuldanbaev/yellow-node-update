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
import {
  Blog,
  Portfolio,
  ReviewsContainer,
  FeedbackFormContainer,
} from 'containers';
import Intro from 'containers/Home/Intro';
import { PhotoGallery, MetaTags } from 'components';
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
  fetchDuck: loadDuck,
  duck,
}) => {
  const gradientRef = useRef(null);
  const { content } = getDocumentFields(photosData, ['content']);
  const { contextData, setContextData } = useContext(AppContext);

  useEffect(() => {
    if (!duck) {
      const { isFirstHomepageVisit } = contextData;

      loadDuck({ isFirstHomepageVisit });
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
        microdata={microdata.homepage()}
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
          <ReviewsContainer />
          <Blog />
          {content && <PhotoGallery photos={content} />}
          <FeedbackFormContainer />
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
