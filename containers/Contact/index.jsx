import React from 'react';
import {
  FeedbackFormWithTitle,
  Calendar,
  CompanyPeoplePhoto,
} from 'components';
import styles from './styles.module.scss';

export const ContactContainer = () => (
  <section className={styles.contactContainer}>
    <FeedbackFormWithTitle />
    <Calendar />
    <CompanyPeoplePhoto />
  </section>
);
