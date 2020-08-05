import React from 'react';
import { SectionTitle, FeedbackForm } from 'components';
import styles from './styles.module.scss';

export const FeedbackFormContainer = () => (
  <div className={styles.formContainer}>
    <SectionTitle
      title="Let’s move forward"
      styleTitle={styles.title}
      styleSubtitle={styles.subtitle}
      isFeedbackForm
      subtitle="Fill in this form or"
      linkText="send us an e-mail"
    />
    <FeedbackForm />
  </div>
);
