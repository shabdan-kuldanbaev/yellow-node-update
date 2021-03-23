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
import { selectIsDuckLoaded } from 'redux/selectors/home';
import {
  Intro,
  Blog,
  Portfolio,
  ReviewsContainer,
  FeedbackFormContainer,
} from 'containers';
import { PhotoGallery, MetaTags } from 'components';
import { getDocumentFields } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { AppContext } from 'utils/appContext';
import LoadingPlaceholder from './LoadingPlaceholder';

export const Home = ({
  theme,
  introSection,
  photosData,
  isPageReadyToDisplay,
  fetchDuck,
  isDuckLoaded,
}) => {
  const gradientRef = useRef(null);
  const { content } = getDocumentFields(photosData, ['content']);
  const { contextData, setContextData } = useContext(AppContext);

  useEffect(() => {
    // fetchPage({ slug: PAGES.homepage })

    if (!contextData.isHomepageVisit) fetchDuck();
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.homepage} />
      {(!isPageReadyToDisplay || !isDuckLoaded) ? <LoadingPlaceholder /> : (
        <Fragment>
          <Intro theme={theme} introSection={introSection} />
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
};

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
  photosData: PropTypes.instanceOf(Object),
  isPageReadyToDisplay: PropTypes.bool.isRequired,
  isDuckLoaded: PropTypes.bool.isRequired,
  fetchDuck: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    photosData: selectImageCarousel(state),
    isPageReadyToDisplay: selectIsPageReadyToDisplay(state),
    isDuckLoaded: selectIsDuckLoaded(state),
  }),
  { fetchDuck },
)(Home);
