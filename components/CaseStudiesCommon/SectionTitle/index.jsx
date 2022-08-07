import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import styles from './styles.module.scss';

const SectionTitle = ({
  type,
  data: {
    title,
    description,
  },
  contentList,
}) => {
  if (!title) {
    return null;
  }

  return (
    <div className={styles[type]}>
      <Animated {...ANIMATION_CASE_STUDY_PROPS}>
        <h2
          data-case-study-title
          className={cn(styles.title, { [styles.titleIndent]: description })}
        >
          {title}
        </h2>
      </Animated>
      {description && (
        <Animated
          delay={50}
          {...ANIMATION_CASE_STUDY_PROPS}
        >
          <p
            data-case-study-description
            className={cn(styles.description, { [styles.alignLeft]: description.length > 255 })}
          >
            {description}
          </p>
        </Animated>
      )}
      {!!contentList.length && (
        <Animated
          delay={50}
          {...ANIMATION_CASE_STUDY_PROPS}
        >
          <ul className={styles.listContainer}>
            {contentList.map((item) => (
              <li className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        </Animated>
      )}
    </div>
  );
};

SectionTitle.defaultProps = {
  type: '',
  contentList: [],
};

SectionTitle.propTypes = {
  type: PropTypes.string,
  data: PropTypes.instanceOf(Object).isRequired,
  contentList: PropTypes.instanceOf(Array),
};

export default SectionTitle;
