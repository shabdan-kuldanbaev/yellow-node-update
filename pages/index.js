import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Home } from 'containers';
import { MetaTags } from 'components';
import { PAGES } from 'utils/constants';

const App = ({ theme, introSection }) => (
  <Fragment>
    <MetaTags page={PAGES.homepage} />
    <Home theme={theme} introSection={introSection} />
  </Fragment>
);

App.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
};

export default App;
