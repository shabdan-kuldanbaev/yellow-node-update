import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import styles from './styles.module.scss';

export const SectionTitle = ({
  type,
  titleStyle,
  title,
  subtitle,
  description,
  className,
}) => (
  <div className={cn(styles[type], className, { [titleStyle]: titleStyle })}>
    {console.log('type: ', type)}
    <Animated
      {...REVEAL_ANIMATION_PROPS}
      transitionDelay={250}
    >
      <h2 className={styles.title}>
        {title}
      </h2>
    </Animated>
    {subtitle && (
      <Animated
        {...REVEAL_ANIMATION_PROPS}
        transitionDelay={300}
      >
        <p className={styles.subtitle}>
          {subtitle}
        </p>
      </Animated>
    )}
    {description && (
      <Animated
        {...REVEAL_ANIMATION_PROPS}
        transitionDelay={350}
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
  titleStyle: '',
  subtitle: '',
  description: '',
  className: null,
  title: null,
};

SectionTitle.propTypes = {
  type: PropTypes.string,
  titleStyle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
};
