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

import 'animate.css/animate.min.css';
import 'styles/index.scss';

const App = () => (
  <Fragment>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Barlow+Condensed:100,300,400,800&display=swap" rel="stylesheet" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>
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
