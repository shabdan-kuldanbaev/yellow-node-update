import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components/Common/Animated';
import { getFileUrl } from 'utils/helper';
import { ANIMATION_CASE_STUDY_PROPS } from 'utils/constants';
import styles from './styles.module.scss';

const Wireframe = ({ data: { images }, type }) => {
  if (!images) {
    return null;
  }

  return images.map((image) => {
    const imageUrl = getFileUrl(image);

    return (
      <Animated
        key={imageUrl}
        delay={500}
        {...ANIMATION_CASE_STUDY_PROPS}
      >
        <div className={styles[type]}>
          <div className={styles.animatedContainer}>
            <img
              className={styles.image}
              src={imageUrl}
              alt={imageUrl}
            />
          </div>
          <div className={styles.animatedContainer}>
            <img
              className={styles.image}
              src={imageUrl}
              alt={imageUrl}
            />
          </div>
        </div>
      </Animated>
    );
  });
};

Wireframe.prototype = {
  data: PropTypes.shape({
    images: PropTypes.instanceOf(Array).isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default Wireframe;
