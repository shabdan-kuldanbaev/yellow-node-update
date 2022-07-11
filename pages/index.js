import React from 'react';
import Home from 'containers/Home';
import { getStaticPropsWrapper } from 'utils/helper';
import { PAGES } from 'utils/constants';

const Homepage = ({ theme, introSection }) => (
  <Home
    theme={theme}
    introSection={introSection}
  />
);

export const getStaticProps = getStaticPropsWrapper(PAGES.homepage);

export default Homepage;
