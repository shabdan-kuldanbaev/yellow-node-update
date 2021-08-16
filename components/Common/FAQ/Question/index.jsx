import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

export const Question = ({ faq }) => {
  const [isAnswerOpened, setIsAnswerOpened] = useState(false);

  const handleOnQuestionClick = () => {
    setIsAnswerOpened(!isAnswerOpened);
  };

  if (isEmpty(faq)) {
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
        <p>{faq.question}</p>
        <div className={cn(styles.plus, {
          [styles.minus]: isAnswerOpened,
        })}
        >
          <span />
          <span />
        </div>
      </div>
      <Animated
        type={ANIMATED_TYPE.expandByHeight}
        open={isAnswerOpened}
      >
        <p className={styles.answer}>
          {faq.answer}
        </p>
        <ContentfulParser document={faq.longAnswer} />
      </Animated>
    </div>
  );
};

Question.defaultProps = {
  faq: {},
};

Question.propTypes = {
  faq: PropTypes.instanceOf(Object),
};
