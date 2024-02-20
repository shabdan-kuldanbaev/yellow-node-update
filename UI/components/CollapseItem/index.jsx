import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Typography from 'UI/components/Typography';
import { ANIMATED_TYPE } from 'utils/constants';
import { TYPOGRAPHY_SIZE } from 'UI/components/Typography/utils/useTypography';
import { useCollapseItem } from './utils/useCollapseItem';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const CollapseItem = (props) => {
  const {
    isAnswerOpened,
    handleOnQuestionClick,
    faq = {},
  } = useCollapseItem(props);

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
          size={TYPOGRAPHY_SIZE.headline24}
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
      <div className={styles.answerWrapper}>
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
    </div>
  );
};

CollapseItem.propTypes = {
  faq: PropTypes.instanceOf(Object),
};

export default CollapseItem;
