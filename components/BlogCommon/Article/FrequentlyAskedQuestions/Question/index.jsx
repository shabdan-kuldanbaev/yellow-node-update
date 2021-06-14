import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Animated } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

export const Question = ({ question }) => {
  const [isAnswerOpened, setIsAnswerOpened] = useState(false);

  const handleOnQuestionClick = () => setIsAnswerOpened(!isAnswerOpened);

  if (isEmpty(question)) {
    return null;
  }

  return (
    <div className={styles.questionContainer}>
      <div
        className={styles.question}
        onClick={handleOnQuestionClick}
        role="button"
        tabIndex="0"
      >
        <p>{question.question}</p>
        <div className={styles.cross}>
          <span />
          <span />
        </div>
      </div>
      <Animated
        type={ANIMATED_TYPE.expandByHeight}
        open={isAnswerOpened}
      >
        <p>{question.answer}</p>
      </Animated>
    </div>
  );
};

Question.defaultProps = {
  question: {},
};

Question.propTypes = {
  question: PropTypes.instanceOf(Object),
};
