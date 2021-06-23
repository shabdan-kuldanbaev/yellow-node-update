import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import { figuresData } from './utils/data';
import styles from './styles.module.scss';

export const Figures = ({ figuresData: figures }) => (
  <div className={styles.figures}>
    {figures && figures.map((item, index) => (
      <Animated
        key={item.title}
        type={ANIMATED_TYPE.isCustom}
        translateY="2.82352941em"
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={1000 + 90 * index * 2}
      >
        <div>{item.title}</div>
        <div>{item.subtitle}</div>
      </Animated>
    ))}
  </div>
);

Figures.defaultProps = {
  figuresData,
};

Figures.propTypes = {
  figuresData: PropTypes.instanceOf(Array),
};
