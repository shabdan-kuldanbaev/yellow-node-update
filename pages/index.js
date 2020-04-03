import React, {
  Fragment,
  useState,
  useRef,
} from 'react';
import Head from 'next/head';
import {
  Intro,
  Blog,
  Advantages,
  Portfolio,
  Reviews,
  Insta,
  Layout,
} from 'containers';
import { FeedbackForm } from 'components';

import 'animate.css/animate.min.css';
import 'styles/index.scss';

const App = () => {
  const [theme, setTheme] = useState('dark'); 
  const introSection = useRef(null);

  return (
    <Fragment>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800,900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Barlow+Condensed:100,300,400,800&display=swap" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>
      </Head>
      <Layout theme={theme} introSection={introSection}>
        <Intro theme={theme} introSection={introSection} />
        <Advantages />
        <Portfolio />
        <Reviews />
        <Blog />
        <Insta />
        <FeedbackForm />
      </Layout>
    </Fragment>
  );
};

export default App;
