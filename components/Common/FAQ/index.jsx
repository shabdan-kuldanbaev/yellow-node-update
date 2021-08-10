import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Question } from './Question';
import styles from './styles.module.scss';

export const FAQ = ({ faqList }) => {
  if (isEmpty(faqList)) {
    return null;
  }

  return (
    <div className={styles.frequentlyAskedQuestions}>
      {faqList.map((faq) => (
        <Question
          key={`faq-item/${faq.question}`}
          faq={faq}
        />
      ))}
    </div>
  );
};

FAQ.defaultProps = {
  faqList: [],
};

FAQ.propTypes = {
  faqList: PropTypes.instanceOf(Array),
};
