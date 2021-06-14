import React from 'react';
import PropTypes from 'prop-types';
import { Question } from './Question';
import styles from './styles.module.scss';

export const FrequentlyAskedQuestions = ({ questions }) => {
  if (!questions.length) {
    return null;
  }

  return (
    <div className={styles.frequentlyAskedQuestions}>
      {questions.map((question) => <Question question={question} />)}
    </div>
  );
};

FrequentlyAskedQuestions.defaultProps = {
  questions: [],
};

FrequentlyAskedQuestions.propTypes = {
  questions: PropTypes.instanceOf(Array),
};
