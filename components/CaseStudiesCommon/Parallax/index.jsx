import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { getFileUrl, getOptimizedImage } from 'utils/helper';
import styles from './styles.module.scss';

const Parallax = ({ data, type }) => {
  if (!get(data, 'images')) {
    return null;
  }

  const imageUrl = getOptimizedImage(getFileUrl(data.images[0]), 0, 0, 'png', 'png8');
  const backgroundImage = { backgroundImage: `url(${imageUrl})` };

  return (
    <section
      className={styles[type]}
      style={backgroundImage}
    />
  );
};

Parallax.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default Parallax;
