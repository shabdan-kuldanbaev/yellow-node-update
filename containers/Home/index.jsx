import React, { Fragment } from 'react';
import {
  Intro,
  Blog,
  // TODO Advantages,
  Portfolio,
  Reviews,
  // TODO Insta,
  PhotoGalleryContainer,
  FeedbackFormContainer,
} from 'containers';
import PropTypes from 'prop-types';

export const Home = ({ theme, introSection }) => (
  <Fragment>
    <Intro theme={theme} introSection={introSection} />
    {/* TODO <Advantages /> */}
    <Portfolio />
    <Reviews />
    <Blog />
    {/* TODO <Insta /> */}
    <PhotoGalleryContainer />
    <FeedbackFormContainer />
  </Fragment>
);

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
};
