import React, { Fragment } from 'react';
import {
  Intro,
  Blog,
  // TODO Advantages,
  Portfolio,
  Reviews,
  // TODO Insta,
} from 'containers';
import PropTypes from 'prop-types';
import { FeedbackForm, PhotoGallery } from 'components';

export const Home = ({ theme, introSection }) => (
  <Fragment>
    <Intro theme={theme} introSection={introSection} />
    {/* TODO <Advantages /> */}
    <Portfolio />
    <Reviews />
    <Blog />
    {/* TODO <Insta /> */}
    <PhotoGallery />
    <FeedbackForm />
  </Fragment>
);

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
};
