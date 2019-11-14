import React, { Fragment } from 'react';
import Head from 'next/head';
import {
  Intro,
  Blog,
  Advantages,
  Portfolio,
  Reviews,
  Insta,
  Footer,
} from 'containers';

import 'styles/index.scss';

const App = () => (
  <Fragment>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Barlow+Condensed:100,300,400,800&display=swap" rel="stylesheet" />
    </Head>
    <Intro />
    <Advantages />
    <Portfolio />
    <Reviews />
    <Blog />
    <Insta />
    <Footer />
  </Fragment>
);

export default App;
