import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';
import styles from './styles.module.scss';

const BackgroundImages = ({ data, type }) => {
  if (!get(data, 'images')) {
    return null;
  }

  return (
    <div className={cn(styles[type])}>
      {data.images.map((image) => {
        const imageUrl = getOptimizedContentfulImage(
          getFileUrl(image),
          {
            fm: 'png',
            fl: 'png8',
          },
        );

        return (
          <img
            src={imageUrl}
            alt={imageUrl}
          />
        );
      })}
    </div>
  );
};

BackgroundImages.defaultProps = {
  type: '',
};

BackgroundImages.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default BackgroundImages;
