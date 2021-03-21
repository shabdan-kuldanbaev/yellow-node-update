import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export const FieldsWrapper = ({
  animated: { field },
  title,
  description,
}) => {
  switch (field) {
  case 'title':
    return title && <h2 className={styles.h1}>{title}</h2>;
  case 'description':
    return description && <p className={styles.p}>{description}</p>;
  default:
    return null;
  }
};

FieldsWrapper.propTypes = {
  animated: PropTypes.shape({
    field: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
