import React, { Fragment } from 'react';
import Head from 'next/head';
import {
  Intro,
  Blog,
  Advantages,
  Portfolio,
  Reviews,
  Insta,
} from 'containers';
import { FeedbackForm } from 'components';

const App = ({ theme, introSection }) => (
  <Fragment>
    <Head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js" />
    </Head>
    <Intro theme={theme} introSection={introSection} />
    <Advantages />
    <Portfolio />
    <Reviews />
    <Blog />
    <Insta />
    <FeedbackForm />
  </Fragment>
);

export default App;
