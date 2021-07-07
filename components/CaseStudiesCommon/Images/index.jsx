import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { getFileUrl } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import styles from './styles.module.scss';

const Images = ({ data, type }) => {
  if (!get(data, 'images')) {
    return null;
  }

  const classes = `${type}${data.images.length}`;

  return (
    <Animated
      delay={100}
      {...ANIMATION_CASE_STUDY_PROPS}
    >
      <div className={cn(styles[type], styles[classes])}>
        {data.images.map((image, index) => {
          const imageUrl = getFileUrl(image);
          const imageStyle = index ? styles.active : '';

          return (
            <Animated
              key={imageUrl}
              type={ANIMATED_TYPE.isCSS}
              intersectedClasses={imageStyle}
            >
              <img
                className={styles.image}
                src={imageUrl}
                alt={imageUrl}
              />
            </Animated>
          );
        })}
      </div>
    </Animated>
  );
};

Images.defaultProps = {
  type: 'imagContainer',
};

Images.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default Images;
