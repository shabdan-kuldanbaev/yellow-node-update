import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const SectionTitle = ({ type, data }) => {
  const { title, description } = data;

  if (!title) {
    return null;
  }

  return (
    <div className={styles[type]}>
      <Animated
        type={ANIMATED_TYPE.isFade}
        duration={1000}
      >
        <h2
          data-case-study-title
          className={cn(styles.title, { [styles.titleIndent]: description })}
        >
          {title}
        </h2>
      </Animated>
      {description && (
        <Animated
          type={ANIMATED_TYPE.isFade}
          delay={400}
          duration={1000}
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
