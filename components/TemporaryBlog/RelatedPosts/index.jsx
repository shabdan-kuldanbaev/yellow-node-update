import React, {
  useEffect,
  useState,
  memo,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadArticles } from 'redux/actions/blog';
import { selectArticles } from 'redux/selectors/blog';
import { Loader } from 'components';
import { Post } from '../index';
import styles from './styles.module.scss';

const RelatedPosts = ({
  posts,
  currentPostId,
  loadArticles: loadNewArticles,
}) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (!posts.length) loadNewArticles();

    if (posts && currentPostId) {
      setRelatedPosts(
        posts.items
          .filter((art) => art.fields.id !== currentPostId)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3),
      );
    }
  }, [posts, currentPostId]);

  return (
    <div className={styles.relatedPosts}>
      <div className={styles.relatedPostsTitle}>Related Posts</div>
      {relatedPosts
        ? relatedPosts.map((post) => (
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
};

RelatedPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  currentPostId: PropTypes.number.isRequired,
  loadArticles: PropTypes.func.isRequired,
};

RelatedPosts.defaultProps = {
  posts: [],
};

export default connect(
  (state) => ({ posts: selectArticles(state) }),
  { loadArticles },
)(memo(RelatedPosts));
