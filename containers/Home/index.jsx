import React, { Fragment } from 'react';
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

export const Home = ({ theme, introSection }) => (
  <Fragment>
    <Intro theme={theme} introSection={introSection} />
    {/* TODO <Advantages /> */}
    <Portfolio />
    <ReviewsContainer />
    <Blog />
    {/* TODO <Insta /> */}
    <PhotoGallery />
    <FeedbackFormContainer />
  </Fragment>
);

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
};
