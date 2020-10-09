import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from 'redux/actions/contact';
import { SectionTitle, FeedbackForm } from 'components';
import styles from './styles.module.scss';

const FeedbackFormContainer = ({ sendEmail }) => {
  const handleSubmit = (...args) => {
    const [fullName, email, projectDescription, selectedFiles] = args;
    console.log(JSON.stringify(selectedFiles));
    sendEmail({
      fullName, email, projectDescription, selectedFiles,
    });
  };

  return (
    <div className={styles.formContainer}>
      <SectionTitle
        title="Let’s move forward"
        styleTitle={styles.title}
        styleSubtitle={styles.subtitle}
        isFeedbackForm
        subtitle="Fill in this form or"
        linkText="send us an e-mail"
      />
      <FeedbackForm handleOnSubmit={handleSubmit} />
    </div>
  );
};

FeedbackFormContainer.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
  }), { sendEmail },
)(FeedbackFormContainer);
