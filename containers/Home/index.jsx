import React, { Fragment, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
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

export const Home = ({ theme, introSection }) => {
  const gradientRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    const handleOnScroll = () => {
      if (gradientRef && gradientRef.current) {
        if (window.pageYOffset > introSection.current.clientHeight) {
          gradientRef.current.style.position = 'relative';
          revealRef.current.style.position = 'absolute';
        } else {
          gradientRef.current.style.position = 'fixed';
          revealRef.current.style.position = 'initial';
        }
      }
    };

    handleOnScroll();
    window.addEventListener('scroll', handleOnScroll);

    return (() => window.removeEventListener('scroll', handleOnScroll));
  });

  return (
    <Fragment>
      <Intro theme={theme} introSection={introSection} />
      {/* TODO <Advantages /> */}
      <div style={{ width: '100%' }} ref={revealRef} />
      <Portfolio gradientRef={gradientRef} />
      <ReviewsContainer />
      <Blog />
      {/* TODO <Insta /> */}
      <PhotoGallery />
      <FeedbackFormContainer />
    </Fragment>
  );
};

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
};
