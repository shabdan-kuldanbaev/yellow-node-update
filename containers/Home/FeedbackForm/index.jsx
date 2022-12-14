import React from 'react';
import PropTypes from 'prop-types';
import FeedbackForm from 'components/Common/FeedbackForm';
import SectionTitle from 'UI/components/SectionTitle';
import styles from './styles.module.scss';

const FeedbackFormContainer = ({ type, title }) => (
  <div className={styles[type] || styles.formContainer}>
    <SectionTitle
      title={title}
      styleTitle={styles.title}
      styleSubtitle={styles.subtitle}
      className={styles.title}
      isFeedbackForm
    >
      <p className={styles.subtitle}>
        Fill in this form or
        <a href="#">
          send us an e-mail
        </a>
      </p>
    </SectionTitle>
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
