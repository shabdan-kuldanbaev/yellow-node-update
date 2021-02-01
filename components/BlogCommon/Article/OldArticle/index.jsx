import React from 'react';
import PropTypes from 'prop-types';
import { createMarkup } from 'utils/helper';
import styles from './styles.module.scss';

export const OldArticle = ({ oldBody }) => (
  <div className={styles.articleContent}>
    <div dangerouslySetInnerHTML={createMarkup(oldBody)} />
  </div>
);

OldArticle.propTypes = {
  oldBody: PropTypes.string.isRequired,
};
