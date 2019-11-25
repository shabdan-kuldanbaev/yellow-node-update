import React from 'react';
import {
  Header,
  AddFooter,
  Partners,
  Duck,
} from 'components';

const Intro = () => (
  <section>
    <Duck />
    <Header theme="dark" />
    <AddFooter theme="dark" />
    <Partners />
  </section>
);

export default Intro;
