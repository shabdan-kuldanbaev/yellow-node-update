import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'components';
import { Post } from '../index';
import styles from './styles.module.scss';

const RelatedPosts = ({ posts }) => (
  <div className={styles.relatedPosts}>
    <div className={styles.relatedPostsTitle}>Related Posts</div>
    {posts
      ? posts.map((post) => (
        <Post
          key={post.id}
          className={styles.relatedPost}
          post={post}
          mode="related"
        />
      ))
      : <Loader />}
  </div>
);

RelatedPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};

RelatedPosts.defaultProps = {
  posts: [],
};

export default memo(RelatedPosts);
