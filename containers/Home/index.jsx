import React, {
  Fragment,
  useEffect,
  useRef,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchLayoutData } from 'redux/actions/layout';
import { selectImageCarousel, selectIsPageReadyToDisplay } from 'redux/selectors/layout';
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
import styles from './styles.module.scss';

export const Home = ({
  theme,
  introSection,
  photosData,
  fetchLayoutData: fetchPage,
  isPageReadyToDisplay,
  isFirstHomepageVisit,
}) => {
  const gradientRef = useRef(null);
  const { content } = getDocumentFields(photosData, ['content']);
  const loadingPlaceholder = !isFirstHomepageVisit
    ? <LoadingScreen />
    : <div className={styles.placeholder} />;

  useEffect(() => {
    fetchPage({ slug: PAGES.homepage });
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.homepage} />
      {!isPageReadyToDisplay ? loadingPlaceholder : (
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
  isFirstHomepageVisit: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    photosData: selectImageCarousel(state),
    isPageReadyToDisplay: selectIsPageReadyToDisplay(state),
    isFirstHomepageVisit: selectIsFirstHomepageVisit(state),
  }),
  { fetchLayoutData },
)(Home);
