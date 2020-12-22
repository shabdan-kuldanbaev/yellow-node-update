import React from 'react';
import PropTypes from 'prop-types';
import { LIMIT } from 'utils/constants';
import Post from '../Post';
import styles from './styles.module.scss';

export default function Favorites({
  className,
  posts,
  limit,
}) {
  if (!posts || posts.length === 0) return null;

  const favoritePosts = posts.slice(0, limit);

  return (
    <div className={`${styles.favorites} ${className}`}>
      <div className={styles.favoritesTitle}>
        {`Top ${favoritePosts.length} article ${favoritePosts.length > 1 ? 's' : ''}`}
      </div>
      {favoritePosts && favoritePosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          mode="favorite"
        />
      ))}
    </div>
  );
}

Favorites.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
  limit: PropTypes.number,
};

Favorites.defaultProps = {
  className: '',
  posts: [],
  limit: LIMIT,
};
