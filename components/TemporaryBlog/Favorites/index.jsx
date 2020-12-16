import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post';
import styles from './styles.module.scss';

const LIMIT = 5;

export default function Favorites({ className, posts, limit }) {
  if (!posts || posts.length === 0) return null;

  const favoritePosts = posts.slice(0, 5);

  return (
    <div className={`${styles.favorites} ${className}`}>
      <div className={styles.favoritesTitle}>
        {/* eslint-disable-next-line */}
        Top {favoritePosts.length} article{favoritePosts.length > 1 ? 's': null}
      </div>

      {
        favoritePosts.map((post) => (
          <Post key={post.id} post={post} mode="favorite" />
        ))
      }

    </div>
  );
}

Favorites.propTypes = {
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  posts: PropTypes.array,
  limit: PropTypes.number,
};

Favorites.defaultProps = {
  className: '',
  posts: [],
  limit: LIMIT,
};
