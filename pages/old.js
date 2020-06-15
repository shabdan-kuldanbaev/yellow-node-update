import React from 'react';
import {
  FeedbackFormBeforChanging,
  OldFooterEmail,
  ButtonOverlap,
  DesktopMenu,
  FeedbackForm,
} from '../oldData';

const CompanyContainer = () => (
  <section style={{ margin: '15vh 0', padding: '5vh' }}>
    <FeedbackFormBeforChanging />
    <OldFooterEmail />
    <DesktopMenu />
    <ButtonOverlap />
    <FeedbackForm />
  </section>
);

export default CompanyContainer;
