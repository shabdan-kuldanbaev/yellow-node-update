import React from 'react';
import PropTypes from 'prop-types';
import { SectionTitle, FeedbackForm } from 'components';
import styles from './styles.module.scss';

const FeedbackFormWithTitle = ({ handleOnClick }) => (
  <section className={styles.feedbackFormWithTitle}>
    <div>
      <SectionTitle
        title="Got a project in mind?"
        styleTitle={styles.title}
        styleSubtitle={styles.subtitle}
        isFeedbackForm
        subtitle="Fill in this form or"
        linkText="send us an e-mail"
        isMainTitle
      />
      <FeedbackForm
        isChooseBudget
        handleOnClick={handleOnClick}
      />
    </div>
  </section>
);

FeedbackFormWithTitle.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default FeedbackFormWithTitle;
