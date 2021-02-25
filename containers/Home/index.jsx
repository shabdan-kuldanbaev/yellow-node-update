import React, {
  Fragment,
  useEffect,
  useRef,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchLayoutData } from 'redux/actions/layout';
import { selectImageCarousel, selectIsLoadingScreenCompleted } from 'redux/selectors/layout';
import { selectIsFirstHomepageVisit } from 'redux/selectors/home';
import {
  Intro,
  Blog,
  Portfolio,
  ReviewsContainer,
  FeedbackFormContainer,
} from 'containers';
import {
  PhotoGallery,
  LoadingScreen,
  MetaTags,
} from 'components';
import { getDocumentFields } from 'utils/helper';
import { PAGES } from 'utils/constants';

export const Home = ({
  theme,
  introSection,
  photosData,
  fetchLayoutData: fetchPage,
  isLoadingScreenCompleted,
  isFirstHomepageVisit,
}) => {
  const gradientRef = useRef(null);
  const { content } = getDocumentFields(photosData, ['content']);

  useEffect(() => {
    fetchPage({ slug: PAGES.homepage });
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.homepage} />
      {(!isLoadingScreenCompleted && !isFirstHomepageVisit) ? <LoadingScreen /> : (
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
  fetchLayoutData: PropTypes.func.isRequired,
  photosData: PropTypes.instanceOf(Object),
  isLoadingScreenCompleted: PropTypes.bool.isRequired,
  isFirstHomepageVisit: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    photosData: selectImageCarousel(state),
    isLoadingScreenCompleted: selectIsLoadingScreenCompleted(state),
    isFirstHomepageVisit: selectIsFirstHomepageVisit(state),
  }),
  { fetchLayoutData },
)(Home);
