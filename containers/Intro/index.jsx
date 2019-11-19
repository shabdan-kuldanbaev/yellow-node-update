import React from 'react';
// ---- TODO ----
// import dynamic from 'next/dynamic';
import {
  Header,
  AddFooter,
  Partners,
  // Duck,
} from 'components';

// const DynamicComponent = dynamic(() => import('components/Duck'));

const Intro = () => (
  <section>
    {/* <DynamicComponent /> */}
    <Header theme="dark" />
    <AddFooter theme="dark" />
    <Partners />
  </section>
);

export default Intro;
