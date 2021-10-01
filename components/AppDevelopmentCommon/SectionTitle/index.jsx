import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

export const SectionTitle = ({
  type,
  titleStyle,
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
    <div className={cn(styles[type], { [titleStyle]: titleStyle })}>
      <Animated
        {...animationProps}
        transitionDelay={250}
      >
        <h2 className={styles.title}>
          {title}
        </h2>
      </Animated>
      {subtitle && (
        <Animated
          {...animationProps}
          transitionDelay={300}
        >
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        </Animated>
      )}
      {description && (
        <Animated
          {...animationProps}
          transitionDelay={350}
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
  titleStyle: '',
};

SectionTitle.propTypes = {
  type: PropTypes.string,
  titleStyle: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
