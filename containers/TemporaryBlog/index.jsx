import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectIsLoading, selectArticles } from 'redux/selectors/blog';
import { loadArticles } from 'redux/actions/blog';
import { Loader, MetaTags } from 'components';
import { PAGES } from 'utils/constants';
import { Post, Subscribe } from 'components/TemporaryBlog';
import styles from './styles.module.scss';

const Blog = ({
  isLoading,
  loadArticles: loadNewArticles,
  posts,
  introSection,
}) => {
  useEffect(() => {
    if (!posts.length) {
      loadNewArticles();
    }
  }, [posts]);

  return (
    <Fragment>
      <MetaTags page={PAGES.blog} />
      <Subscribe />
      <section ref={introSection} className={styles.blog}>
        <Loader isLoading={!isLoading}>
          {posts && posts.map((post) => <Post key={post.id} post={post} />)}
        </Loader>
      </section>
    </Fragment>
  );
};

Blog.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object),
  loadArticles: PropTypes.func.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
};

Blog.defaultProps = {
  posts: [],
};

export default connect(
  (state) => ({
    posts: selectArticles(state),
    isLoading: selectIsLoading(state),
  }),
  { loadArticles },
)(Blog);
