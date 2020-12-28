import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Home } from 'containers';
import { MetaTags } from 'components';
import { pages } from 'utils/constants';

const App = ({ theme, introSection }) => (
  <Fragment>
    <MetaTags page={pages.homepage}>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js" />
    </MetaTags>
    <Home theme={theme} introSection={introSection} />
  </Fragment>
);

App.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
};

export default App;
