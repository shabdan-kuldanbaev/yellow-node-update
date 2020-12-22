import React, { Fragment, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectIsLoading, selectArticles } from 'redux/selectors/blog';
import { loadArticles } from 'redux/actions/blog';
import { Loader } from 'components';
import { BLOG_DESCRIPTION } from 'utils/constants';
import { Post, Subscribe } from 'components/TemporaryBlog';
import styles from './styles.module.scss';

const Blog = ({
  isLoading,
  loadArticles: loadNewArticles,
  posts,
}) => {
  useEffect(() => {
    loadNewArticles();
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Blog - Yellow</title>
        <meta property="og:title" content="Blog - Yellow" />
        <meta name="description" content={BLOG_DESCRIPTION} />
        <meta property="og:description" content={BLOG_DESCRIPTION} />
      </Head>
      <Subscribe />
      <section className={styles.blog}>
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
};

Blog.defaultProps = {
  posts: [],
};

const mapStateToProps = (state, router) => ({
  posts: selectArticles(state),
  isLoading: selectIsLoading(state),
});

export default connect(mapStateToProps, {
  loadArticles,
})(Blog);
