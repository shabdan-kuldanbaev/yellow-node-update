import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export const FieldsWrapper = ({ animated: { field }, title, description }) => {
  switch (field) {
  case 'title':
    return <h1 className={styles.h1}>{title}</h1>;
  case 'description':
    return <p className={styles.p}>{description}</p>;
    // TODO case 'link':
    //   return (
    //     <LinkWrapper {...animated} className={styles.buttonWrap}>
    //       <button type="button">See full case study</button>
    //     </LinkWrapper>
    //   );
  default:
    return null;
  }
};

FieldsWrapper.propTypes = {
  field: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
