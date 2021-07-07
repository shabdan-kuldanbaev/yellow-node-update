import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const Parallax = ({ data, type }) => {
  if (!get(data, 'images')) {
    return null;
  }

  const imageUrl = getFileUrl(data.images[0]);

  return (
    <section
      className={styles[type]}
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  );
};

Parallax.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default Parallax;
