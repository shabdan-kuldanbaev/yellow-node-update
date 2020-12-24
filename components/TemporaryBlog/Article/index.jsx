import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { loadFavoritePostsStart, getArticle } from 'redux/actions/blog';
import {
  selectIsLoading,
  selectArticle,
  selectFavoritePosts,
} from 'redux/selectors/blog';
import isEmpty from 'lodash/isEmpty';
import { rootUrl } from 'utils/helper';
import { Loader } from 'components';
import Subscribe from '../Subscribe';
import Navigation from '../Navigation';
import Favorites from '../Favorites';
import RelatedPosts from '../RelatedPosts';
import withScroll from '../withScroll';
import SocialShare from '../SocialShare';
import styles from './styles.module.scss';

class Article extends PureComponent {
  static initialAction(id) {
    const postId = id.replace('/blog/', '');

    return getArticle(postId);
  }

  componentDidMount() {
    if (isEmpty(this.props.post)) {
      this.props.getArticle(this.props.router.query.article);
    } else if (this.props.post.slug !== this.props.router.query.article) {
      this.props.getArticle(this.props.router.query.article);
    }
    this.props.loadFavoritePostsStart();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.router.query.article !== nextProps.router.query.article) {
      this.props.getArticle(nextProps.router.query.article);
      this.props.loadFavoritePostsStart();
    }
  }

  createMarkup(data) {
    return { __html: data };
  }

  render() {
    const {
      post,
      favoritePosts,
      isLoading,
      introSection,
    } = this.props;
    if (isLoading || isEmpty(post)) {
      return <Loader />;
    }
    const title = `${post.page_title || post.title} - Yellow`;

    return (
      <Fragment>
        <Head>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta property="og:description" content={post.description} />
          <meta name="description" content={post.description} />
          <meta property="og:image" content={post.head_image_url.replace('//', 'https://')} />
          <meta property="og:image:width" content="1160" />
          <meta property="og:image:height" content="621" />
          <meta property="og:url" content={`${rootUrl}/blog/${post.slug}`} />
          <meta property="og:type" content="article" />
          <meta property="article:published_time" content={post.published_at} />
          <meta property="article:modified_time" content={post.updated_at} />
        </Head>
        <article ref={introSection} className={styles.article}>
          <div className={styles.articleHeader}>
            <h1>{post.title}</h1>
            <p className={styles.introduction}>{post.introduction}</p>
            <div className={styles.imageContainer}>
              <img src={post.head_image_url} alt={post.title} />
            </div>
          </div>
          <div className={styles.articleContentContainer}>
            <div className={styles.articleAside}>
              {favoritePosts && <Favorites posts={favoritePosts.items} />}
            </div>
            <div className={styles.articleContent}>
              <div dangerouslySetInnerHTML={this.createMarkup(post.body)} />
              <SocialShare
                url={`${rootUrl}/blog/${post.slug}`}
                title={post.title}
                description={post.introduction}
              />
            </div>
            <div className={styles.articleAside}>
              <Navigation />
            </div>
          </div>
          <Subscribe
            title="Don't want to miss anything?"
            description="Get weekly updates on the newest design stories, case studies and tips right in your mailbox."
            insideArticle
          />
          <RelatedPosts currentPostId={post.id} />
        </article>
      </Fragment>
    );
  }
}

Article.propTypes = {
  favoritePosts: PropTypes.arrayOf(PropTypes.object),
  loadFavoritePostsStart: PropTypes.func.isRequired,
  getArticle: PropTypes.func.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
};

Article.defaultProps = {
  favoritePosts: [],
};

export default connect(
  (state) => ({
    favoritePosts: selectFavoritePosts(state),
    post: selectArticle(state),
    isLoading: selectIsLoading(state),
  }), {
    loadFavoritePostsStart,
    getArticle,
  },
)(withScroll(withRouter(Article)));
