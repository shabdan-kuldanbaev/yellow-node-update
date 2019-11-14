import React from 'react';
// ---- TODO ----
// import dynamic from 'next/dynamic';
import {
  Header,
  AddFooter,
  Partners,
} from 'components';

// const DynamicComponent = dynamic(() => import('../../components/Duck'));

const Intro = () => (
  <section id="intro">
    {/* <DynamicComponent /> */}
    <Header theme="dark" />
    <AddFooter theme="dark" />
    <Partners />
  </section>
);

export default Intro;
