import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from 'redux/actions/contact';
import { SectionTitle, FeedbackForm } from 'components';
import styles from './styles.module.scss';

const FeedbackFormWithTitle = ({ sendEmail: sendContact }) => {
  const handleSubmit = (...args) => {
    const [fullName, email, projectBudget] = args;
    sendContact({ fullName, email, projectBudget });
  };

  return (
    <section className={styles.feedbackFormWithTitle}>
      <div>
        <SectionTitle
          title="Got a project in mind?"
          styleTitle={styles.title}
          styleSubtitle={styles.subtitle}
          isFeedbackForm
          subtitle="Fill in this form or"
          linkText="send us an e-mail"
        />
        <FeedbackForm isChooseBudget handleOnSubmit={handleSubmit} />
      </div>
    </section>
  );
};

FeedbackFormWithTitle.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
  }), { sendEmail },
)(FeedbackFormWithTitle);
