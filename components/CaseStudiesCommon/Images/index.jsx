import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { ANIMATION_CASE_STUDY_PROPS } from 'utils/constants';
import { getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const Images = ({ data, type }) => {
  if (!get(data, 'images')) {
    return null;
  }

  const classes = styles[`${type}${data.images.length}`];

  return (
    <Animated
      delay={500}
      {...ANIMATION_CASE_STUDY_PROPS}
    >
      <div className={styles.imagContainer}>
        {data.images.map((image, index) => {
          const imageUrl = getFileUrl(image);

          return (
            <img
              className={index ? classes : styles.image}
              src={imageUrl}
              alt={imageUrl}
            />
          );
        })}
      </div>
    </Animated>
  );
};

Images.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default Images;
