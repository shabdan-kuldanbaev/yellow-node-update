import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

export const SectionTitle = ({
  type,
  title,
  subtitle,
  description,
}) => (
  <div className={cn(styles.sectionTitle, styles[type])}>
    <Animated
      type={ANIMATED_TYPE.isCustom}
      translateY="2.82352941em"
      opasityDuration={1}
      transformDuration={1}
      transitionDelay={600}
    >
      <h2 className={styles.title}>
        {title}
      </h2>
    </Animated>
    {subtitle && (
      <Animated
        type={ANIMATED_TYPE.isCustom}
        translateY="2.82352941em"
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={650}
      >
        <p className={styles.subtitle}>
          {subtitle}
        </p>
      </Animated>
    )}
    {description && (
      <Animated
        type={ANIMATED_TYPE.isCustom}
        translateY="2.82352941em"
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={700}
      >
        <p className={styles.description}>
          {description}
        </p>
      </Animated>
    )}
  </div>
);

SectionTitle.defaultProps = {
  type: 'default',
};

SectionTitle.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
