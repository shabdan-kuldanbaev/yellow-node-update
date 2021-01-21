import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export const OldArticle = ({ document }) => {
  const createMarkup = (data) => ({ __html: data });

  return (
    <div className={styles.articleContentContainer}>
      <div className={styles.articleContent}>
        <div dangerouslySetInnerHTML={createMarkup(document.oldBody)} />
      </div>
    </div>
  );
};

OldArticle.propTypes = {
  document: PropTypes.instanceOf(Object).isRequired,
};
