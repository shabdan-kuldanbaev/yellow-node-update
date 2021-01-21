import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Post } from '../index';
import styles from './styles.module.scss';

const RelatedPosts = ({
  data: { items: posts },
}) => posts && (
  <div className={styles.relatedPosts}>
    <div className={styles.relatedPostsTitle}>Related Posts</div>
    {posts.map((post) => (
      <Post
        key={post.id}
        className={styles.relatedPost}
        post={post}
        mode="related"
      />
    ))}
  </div>
);

RelatedPosts.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default memo(RelatedPosts);
