import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Intro,
  Blog,
  // TODO Advantages,
  Portfolio,
  Reviews,
  // TODO Insta,
  FeedbackFormContainer,
} from 'containers';
import { PhotoGallery } from 'components';

export const Home = ({ theme, introSection }) => (
  <Fragment>
    <Intro theme={theme} introSection={introSection} />
    {/* TODO <Advantages /> */}
    <Portfolio />
    <Reviews />
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
