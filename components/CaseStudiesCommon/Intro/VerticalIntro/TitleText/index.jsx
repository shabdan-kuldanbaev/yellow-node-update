import React from 'react';
import PropTypes from 'prop-types';
import { CASE_STUDIES } from 'utils/constants';
import styles from '../styles.module.scss';

export const TitleText = ({ type, data }) => {
  switch (type) {
  case CASE_STUDIES.separateUs:
    const titleWords = data && data.split('.');

    if (!titleWords) {
      return null;
    }

    return (
      <h1 className={styles.projectTitle}>
        <span className={styles.pinkText}>
          {`${titleWords[0]}.`}
        </span>
        {titleWords[1]}
      </h1>
    );
  default:
    return (
      <h1 className={styles.projectTitle}>
        {data}
      </h1>
    );
  }
};

TitleText.defaulrProps = {
  type: '',
};

TitleText.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};
