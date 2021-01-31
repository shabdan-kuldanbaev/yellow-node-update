import React, {
  Fragment,
  useEffect,
  useRef,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPage } from 'redux/actions/layout';
import { selectImageCarousel } from 'redux/selectors/layout';
// TODO import { Controller, Scene } from 'react-scrollmagic';
import {
  Intro,
  Blog,
  // TODO Advantages,
  Portfolio,
  ReviewsContainer,
  // TODO Insta,
  FeedbackFormContainer,
} from 'containers';
import { PhotoGallery } from 'components';
import { getDocumentFields } from 'utils/helper';

export const Home = ({
  theme,
  introSection,
  photosData,
  fetchPage,
}) => {
  const gradientRef = useRef(null);
  const { content } = getDocumentFields(photosData, ['content']);

  useEffect(() => {
    fetchPage('homepage');
  }, []);

  // TODO
  // useEffect(() => {
  //   const handleOnScroll = () => {
  //     if (gradientRef && gradientRef.current) {
  //       if (window.pageYOffset > introSection.current.clientHeight) {
  //         gradientRef.current.style.position = 'relative';
  //         revealRef.current.style.position = 'absolute';
  //       } else {
  //         gradientRef.current.style.position = 'fixed';
  //         revealRef.current.style.position = 'initial';
  //       }
  //     }
  //   };

  //   handleOnScroll();
  //   window.addEventListener('scroll', handleOnScroll);

  //   return (() => window.removeEventListener('scroll', handleOnScroll));
  // });

  return (
    <Fragment>
      {/* TODO
        <Controller globalSceneOptions={{ triggerHook: 'onLeave' }}>
        <Scene pin="#intro">
        </Scene>
        <Scene pin="#portfolio">
          <Portfolio gradientRef={gradientRef} />
        </Scene>
      </Controller> */}
      <Intro theme={theme} introSection={introSection} />
      <Portfolio gradientRef={gradientRef} />
      {/* TODO <Advantages /> */}
      <ReviewsContainer />
      <Blog />
      {/* TODO <Insta /> */}
      {content && <PhotoGallery photos={content} />}
      <FeedbackFormContainer />
    </Fragment>
  );
};

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
  fetchPage: PropTypes.isRequired,
  photosData: PropTypes.instanceOf(Object).isRequired,
};

export default connect((state) => ({
  photosData: selectImageCarousel(state),
}), { fetchPage })(Home);
