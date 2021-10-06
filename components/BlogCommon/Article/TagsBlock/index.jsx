import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export const TagsBlock = ({ tags }) => {
  if (!tags) {
    return null;
  }

  return (
    <div className={styles.tagsBlock}>
      <span className={styles.title}>
        Tags
      </span>
      <div className={styles.tagsList}>
        {tags.map((tag) => (
          <div
            key={tag}
            className={styles.tag}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

TagsBlock.defaultProps = {
  tags: [],
};

TagsBlock.propTypes = {
  tags: PropTypes.instanceOf(Array),
};
