import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useBackgroundImages } from './utils/useBackgroundImages';
import styles from './styles.module.scss';

const BackgroundImages = (props) => {
  const {
    type,
    imagesWithUrl,
  } = useBackgroundImages(props);

  if (!imagesWithUrl) {
    return null;
  }

  return (
    <div className={cn(styles[type])}>
      {imagesWithUrl.map((imageUrl) => (
        <img
          src={imageUrl}
          alt={imageUrl}
        />
      ))}
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
