import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

export const PageTitle = ({ title }) => (
  <div className={styles.titleContainer}>
    <Animated
      type={ANIMATED_TYPE.isCustom}
      translateY="2.82352941em"
      opasityDuration={1}
      transformDuration={1}
      transitionDelay={250}
    >
      <h1>
        {title}
      </h1>
    </Animated>
  </div>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
