import React, {
  Fragment,
  useEffect,
  useRef,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDuck } from 'redux/actions/home';
import { selectImageCarousel, selectIsPageReadyToDisplay } from 'redux/selectors/layout';
import { selectDuck } from 'redux/selectors/home';
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
import { microdata } from 'utils/microdata';
import LoadingPlaceholder from './LoadingPlaceholder';

export const Home = ({
  theme,
  introSection,
  photosData,
  isPageReadyToDisplay,
  fetchDuck,
  duck,
}) => {
  const gradientRef = useRef(null);
  const { content } = getDocumentFields(photosData, ['content']);

  useEffect(() => {
    if (!duck) {
      fetchDuck();
    }
  }, [duck]);

  return (
    <Fragment>
      <MetaTags page={PAGES.homepage} microdata={microdata.homepage()} />
      {(!isPageReadyToDisplay || !duck) ? <LoadingPlaceholder /> : (
        <Fragment>
          <Intro
            theme={theme}
            introSection={introSection}
            duck={duck}
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
};

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
  photosData: PropTypes.instanceOf(Object),
  isPageReadyToDisplay: PropTypes.bool.isRequired,
  fetchDuck: PropTypes.func.isRequired,
  duck: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({
    photosData: selectImageCarousel(state),
    isPageReadyToDisplay: selectIsPageReadyToDisplay(state),
    duck: selectDuck(state),
  }),
  { fetchDuck },
)(Home);
