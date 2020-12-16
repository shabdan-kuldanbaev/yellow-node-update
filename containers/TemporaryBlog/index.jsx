import React, {
  // Component,
  Fragment,
  useEffect,
} from 'react';
// import { Helmet } from 'react-safety-helmet';
import Head from 'next/head';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { selectIsLoading, selectArticles } from 'redux/selectors/blog';
// import { setPage } from 'redux/actions/app';
// import { loadPostsIfNeeded } from 'redux/actions/blog';
// import { blogPostsSelector } from 'redux/reducers/blog';
import { loadArticles } from 'redux/actions/blog';

import { Loader } from 'components';
// import Subscribe from '../../components/TemporaryBlog/Subscribe';
import { Post } from '../../components/TemporaryBlog';
import styles from './styles.module.scss';

const Blog = ({
  isLoading,
  loadArticles: loadNewArticles,
  posts,
}) => {
  const description = 'Tech blog from the Yellow team about everything from engineering to design. Get a new post every 2 weeks!';
  // static initialAction() {
  //   return loadPostsIfNeeded();
  // }

  // componentDidMount() {
  //   this.props.setPage('/blog');
  //   this.props.loadPostsIfNeeded();
  // }

  // componentDidCatch() {
  //   this.props.loadPostsIfNeeded();
  // }

  // render() {
  //   const {
  //     posts,
  //     isLoading,
  //   } = this.props;


  useEffect(() => {
    loadNewArticles();
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Blog - Yellow</title>
        <meta property="og:title" content="Blog - Yellow" />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Head>
      {/* <Subscribe /> */}
      <section className={styles.blog}>
        <Loader isLoading={!isLoading}>
          {posts && posts.map((post) => <Post key={post.id} post={post} />)}
        </Loader>
      </section>
      {JSON.stringify(posts)}
    </Fragment>
  );
};

Blog.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object),
};

Blog.defaultProps = {
  posts: [],
};

const mapStateToProps = (state, router) => ({
  posts: selectArticles(state),
  isLoading: selectIsLoading(state),
  // pathname: router.location.pathname,
});

export default connect(mapStateToProps, {
  loadArticles,
})(Blog);
