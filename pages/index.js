import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Home } from 'containers';

const App = ({ theme, introSection }) => (
  <Fragment>
    <Head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js" />
    </Head>
    <Home theme={theme} introSection={introSection} />
  </Fragment>
);

App.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.string.isRequired,
};

export default App;
