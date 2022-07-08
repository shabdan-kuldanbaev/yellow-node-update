import React from 'react';
import PropTypes from 'prop-types';
import { ROUTES } from 'utils/constants';
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
        {tags.map(({ title, slug }) => (
          <a
            key={title}
            href={ROUTES.tagBlog.getRoute(slug).path}
            className={styles.tag}
          >
            {title}
          </a>
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
