import React from 'react';
import PropTypes from 'prop-types';
import FeedbackForm from 'components/Common/FeedbackForm';
import SectionTitle from 'UI/components/SectionTitle';
import styles from './styles.module.scss';

const FeedbackFormContainer = ({ type, titles, isChooseBudget }) => (
  <div className={styles[type] || styles.formContainer}>
    <SectionTitle
      title={titles[0]}
      secondTitle={titles[1]}
      styleTitle={styles.title}
      styleSubtitle={styles.subtitle}
      className={styles.title}
      isFeedbackForm
    >
      <p className={styles.linkText}>
        Fill in this form or
        <a href="mailto:hi@yellow.systems">
          send us an e-mail
        </a>
      </p>
    </SectionTitle>
    <FeedbackForm
      isChooseBudget={isChooseBudget}
      formKey="home-page"
      type={type}
    />
  </div>
);

FeedbackFormContainer.defaultProps = {
  type: '',
  titles: [],
  isChooseBudget: false,
};

FeedbackFormContainer.propTypes = {
  type: PropTypes.string,
  titles: PropTypes.arrayOf(PropTypes.string),
  isChooseBudget: PropTypes.bool,
};

export default FeedbackFormContainer;
