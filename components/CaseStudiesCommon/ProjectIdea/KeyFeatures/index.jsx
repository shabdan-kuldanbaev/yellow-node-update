import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { Svg } from 'components/Common/Svg';
import { SVG_IMAGES_TYPES, ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const KeyFeatures = ({ features, type }) => (
  <Animated
    type={ANIMATED_TYPE.isFade}
    duration={2000}
  >
    <div className={cn(styles.container, styles[type])}>
      <div className={styles.containerBackground} />
      {features.map(({ title, description }, index) => (
        <Animated
          key={title}
          type={ANIMATED_TYPE.isFade}
          delay={250 * index}
          duration={2000}
        >
          <div className={styles.featureContainer}>
            <div className={styles.checkMark}>
              <Svg
                className={styles.icon}
                type={SVG_IMAGES_TYPES.checkMark}
              />
            </div>
            <div className={styles.contentContainer}>
              <h3 className={styles.title}>
                {title}
              </h3>
              <p className={styles.description}>
                {description}
              </p>
            </div>
          </div>
        </Animated>
      ))}
    </div>
  </Animated>
);

KeyFeatures.defaultProps = {
  type: '',
};

KeyFeatures.propTypes = {
  type: PropTypes.string,
  features: PropTypes.instanceOf(Array).isRequired,
};

export default KeyFeatures;
