import React from 'react';
import {
  FeedbackFormBeforChanging,
  OldFooterEmail,
  ButtonOverlap,
  DesktopMenu,
  Carousel,
  Blog,
} from '.';
import FeedbackForm from 'components/Common/FeedbackForm';

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
    <Blog />
  </section>
);

export default CompanyContainer;
