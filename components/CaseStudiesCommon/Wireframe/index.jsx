import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const Wireframe = ({ imageUrl, type }) => (
  <Animated
    type={ANIMATED_TYPE.isFade}
    delay={500}
    duration={1000}
  >
    <div className={cn(styles.imagesContainer, styles[type])}>
      <img
        src={imageUrl}
        className={styles.image}
        alt=""
      />
    </div>
  </Animated>
);

Wireframe.prototype = {
  imageUrl: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Wireframe;
