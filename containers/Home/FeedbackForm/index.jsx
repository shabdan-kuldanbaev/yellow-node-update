import React from 'react';
import PropTypes from 'prop-types';
import FeedbackForm from 'components/Common/FeedbackForm';
import { SectionTitle } from 'components/Common/SectionTitle';
import styles from './styles.module.scss';

const FeedbackFormContainer = ({ type, title }) => (
  <div className={styles[type] || styles.formContainer}>
    <SectionTitle
      title={title}
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
  title: 'Let’s move forward',
};

FeedbackFormContainer.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
};

export default FeedbackFormContainer;
