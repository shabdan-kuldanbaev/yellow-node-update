import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from 'components/Common/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

const KeyFeatures = ({ features }) => (
  <div className={styles.container}>
    <div className={styles.containerBackground} />
    {features.map(({ title, description }) => (
      <div
        key={title}
        className={styles.featureContainer}
      >
        <div className={styles.checkMark}>
          <div className={styles.icon}>
            <Svg type={SVG_IMAGES_TYPES.checkMark} />
          </div>
        </div>
        <div className={styles.contentContainer}>
          <p className={styles.title}>
            {title}
          </p>
          <p className={styles.description}>
            {description}
          </p>
        </div>
      </div>
    ))}
  </div>
);

KeyFeatures.propTypes = {
  features: PropTypes.instanceOf(Array).isRequired,
};

export default KeyFeatures;
