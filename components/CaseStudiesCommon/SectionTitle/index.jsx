import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { ANIMATION_CASE_STUDY_PROPS } from 'utils/constants';
import styles from './styles.module.scss';

const SectionTitle = ({
  type,
  data: {
    title,
    description,
  },
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
          delay={400}
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
    </div>
  );
};

SectionTitle.defaultProps = {
  type: '',
};

SectionTitle.propTypes = {
  type: PropTypes.string,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default SectionTitle;
