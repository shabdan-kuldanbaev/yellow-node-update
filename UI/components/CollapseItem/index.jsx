import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Typography from 'UI/components/Typography';
import { ANIMATED_TYPE, TYPOGRAPHY_SIZE } from 'utils/constants';
import { useCollapseItem } from './useCollapseItem';
import styles from './styles.module.scss';

const CollapseItem = (props) => {
  const { isAnswerOpened, handleOnQuestionClick, faq } = useCollapseItem(props);

  if (isEmpty(faq)) {
    return null;
  }

  return (
    <div
      className={styles.questionContainer}
      onClick={handleOnQuestionClick}
      role="button"
      tabIndex="0"
    >
      <div className={styles.question}>
        <Typography
          isBold
          size={TYPOGRAPHY_SIZE.headlineS}
          variant="p"
        >
          {faq.question}
        </Typography>
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
        <Typography className={styles.answer}>
          {faq.answer}
        </Typography>
        <ContentfulParser document={faq.longAnswer} />
      </Animated>
    </div>
  );
};

CollapseItem.defaultProps = {
  faq: {},
};

CollapseItem.propTypes = {
  faq: PropTypes.instanceOf(Object),
};

export default CollapseItem;
