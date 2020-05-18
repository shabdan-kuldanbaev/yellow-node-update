import React, { Fragment } from 'react';
import {
  Intro,
  Blog,
  Advantages,
  Portfolio,
  Reviews,
  Insta,
} from 'containers';
import PropTypes from 'prop-types';
import { FeedbackForm } from 'components';

export const Home = ({ theme, introSection }) => (
  <Fragment>
    <Intro theme={theme} introSection={introSection} />
    <Advantages />
    <Portfolio />
    <Reviews />
    <Blog />
    <Insta />
    <FeedbackForm />
  </Fragment>
);

Home.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
};
