import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from 'redux/actions/contact';
import { SectionTitle, FeedbackForm } from 'components';
import styles from './styles.module.scss';

const FeedbackFormContainer = ({ sendEmail: sendFeedback }) => {
  const handleOnClick = (...args) => {
    const [
      fullName,
      email,
      description,
      selectedFilesInfo,
    ] = args;

    sendFeedback({
      name: fullName,
      email,
      description,
      attachments: selectedFilesInfo,
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
      <FeedbackForm
        handleOnClick={handleOnClick}
        formKey="home-page"
      />
    </div>
  );
};

FeedbackFormContainer.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, { sendEmail })(FeedbackFormContainer);
