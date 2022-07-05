import React from 'react';
import PropTypes from 'prop-types';
import {
  CATEGORY_BLOG_TITLE_TAGS,
  CATEGORY_BLOG_TAGS,
  ROUTES,
} from 'utils/constants';
import styles from './styles.module.scss';

export const TagsBlock = ({ tags }) => {
  if (!tags) {
    return null;
  }

  const getPath = (tag) => {
    const [slug] = Object.entries(CATEGORY_BLOG_TAGS).find(([_, title]) => tag === title);

    return ROUTES.blog.getRoute(slug).path;
  };

  return (
    <div className={styles.tagsBlock}>
      <span className={styles.title}>
        Tags
      </span>
      <div className={styles.tagsList}>
        {tags.map((tag) => (
          CATEGORY_BLOG_TITLE_TAGS.includes(tag)
            ? (
              <a
                href={getPath(tag)}
                key={tag}
                className={styles.tag}
              >
                {tag}
              </a>
            )
            : (
              <div
                key={tag}
                className={styles.tag}
              >
                {tag}
              </div>
            )
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
