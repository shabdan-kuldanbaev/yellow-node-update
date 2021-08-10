import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

export const SectionTitle = ({
  type,
  title,
  subtitle,
  description,
}) => {
  const animationProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  return (
    <div className={styles[type]}>
      <Animated
        {...animationProps}
        transitionDelay={600}
      >
        <h2 className={styles.title}>
          {title}
        </h2>
      </Animated>
      {subtitle && (
        <Animated
          {...animationProps}
          transitionDelay={650}
        >
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        </Animated>
      )}
      {description && (
        <Animated
          {...animationProps}
          transitionDelay={700}
        >
          <p className={styles.description}>
            {description}
          </p>
        </Animated>
      )}
    </div>
  );
};

SectionTitle.defaultProps = {
  type: 'default',
};

SectionTitle.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
