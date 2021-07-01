import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { getFileUrl } from 'utils/helper';
import { useIntersectionItem } from 'utils/hooks';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import styles from './styles.module.scss';

const Images = ({ data, type }) => {
  const [intersectRef, isIntersected] = useIntersectionItem(null);

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

          return (
            <img
              key={imageUrl}
              ref={intersectRef}
              className={cn(styles.image, { [styles.active]: index && isIntersected })}
              src={imageUrl}
              alt={imageUrl}
            />
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
