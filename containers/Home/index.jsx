import React, { Fragment } from 'react';
import {
  Intro,
  Blog,
  // TODO Advantages,
  Portfolio,
  Reviews,
  // TODO Insta,
  PhotoGalleryContainer,
} from 'containers';
import PropTypes from 'prop-types';
import { FeedbackForm } from 'components';

export const Home = ({ theme, introSection }) => (
  <Fragment>
    <Intro theme={theme} introSection={introSection} />
    {/* TODO <Advantages /> */}
    <Portfolio />
    <Reviews />
    <Blog />
    {/* TODO <Insta /> */}
    <PhotoGalleryContainer />
    <FeedbackForm />
  </Fragment>
);

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
};
