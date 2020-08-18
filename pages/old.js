import React from 'react';
import {
  FeedbackFormBeforChanging,
  OldFooterEmail,
  ButtonOverlap,
  DesktopMenu,
  FeedbackForm,
  Carousel,
} from '../oldData';

const CompanyContainer = () => (
  <section style={{ margin: '15vh 0', padding: '5vh' }}>
    <FeedbackFormBeforChanging />
    <OldFooterEmail />
    <DesktopMenu />
    <ButtonOverlap />
    <FeedbackForm />
    <div style={{ backgroundColor: 'white', padding: '100px 0' }}>
      <Carousel />
    </div>
  </section>
);

export default CompanyContainer;
