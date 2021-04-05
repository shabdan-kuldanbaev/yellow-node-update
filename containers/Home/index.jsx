import React, {
  Fragment,
  useEffect,
  useRef,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchLayoutData } from 'redux/actions/layout';
import { selectImageCarousel, selectIsPageReadyToDisplay } from 'redux/selectors/layout';
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
  fetchLayoutData: fetchPage,
  isPageReadyToDisplay,
}) => {
  const gradientRef = useRef(null);
  const { content } = getDocumentFields(photosData, ['content']);

  useEffect(() => {
    fetchPage({ slug: PAGES.homepage });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.homepage} microdata={microdata.homepage()} />
      {!isPageReadyToDisplay ? <LoadingPlaceholder /> : (
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
  isPageReadyToDisplay: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    photosData: selectImageCarousel(state),
    isPageReadyToDisplay: selectIsPageReadyToDisplay(state),
  }),
  { fetchLayoutData },
)(Home);
