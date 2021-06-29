import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from 'redux/actions/contact';
import FeedbackForm from 'components/Common/FeedbackForm';
import { SectionTitle } from 'components/Common/SectionTitle';
import styles from './styles.module.scss';

const FeedbackFormContainer = ({ type }) => (
  <div className={styles[type] || styles.formContainer}>
    <SectionTitle
      title="Let’s move forward"
      styleTitle={styles.title}
      styleSubtitle={styles.subtitle}
      isFeedbackForm
      subtitle="Fill in this form or"
      linkText="send us an e-mail"
    />
    <FeedbackForm
      formKey="home-page"
      type={type}
    />
  </div>
);

FeedbackFormContainer.defaultProps = {
  type: '',
};

FeedbackFormContainer.propTypes = {
  type: PropTypes.string,
};

export default connect(null, { sendEmail })(FeedbackFormContainer);
