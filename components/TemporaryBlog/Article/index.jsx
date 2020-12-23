import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from 'next/head';
import ReactGA from 'react-ga';
import { loadFavoritePostsStart, getArticle } from 'redux/actions/blog';
import {
  selectIsLoading,
  selectArticles,
  selectArticle,
  selectFavoritePosts,
} from 'redux/selectors/blog';
import isEmpty from 'lodash/isEmpty';
import { rootUrl } from 'utils/helper';
import { Loader, withScroll } from 'components';
import Subscribe from '../Subscribe';
import Navigation from '../Navigation';
import Favorites from '../Favorites';
import RelatedPosts from '../RelatedPosts';
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

  componentWillUnmount() {
    ReactGA.event({
      category: 'Scroll',
      action: `${this.props.maxScrollPosition}%`,
      label: `/blog/${this.props.post.slug}`,
      nonInteraction: this.props.maxScrollPosition < 50,
    });
  }

  createMarkup(data) {
    return { __html: data };
  }

  render() {
    const {
      post,
      posts,
      favoritePosts,
      isLoading,
      relatedPosts,
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
        <article className={styles.article}>
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
          <RelatedPosts posts={relatedPosts} />
        </article>
      </Fragment>
    );
  }
}

Article.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  favoritePosts: PropTypes.arrayOf(PropTypes.object),
  relatedPosts: PropTypes.arrayOf(PropTypes.object),
  loadFavoritePostsStart: PropTypes.func,
  getArticle: PropTypes.func,
};

Article.defaultProps = {
  posts: [],
  favoritePosts: [],
  relatedPosts: [],
};

const mapStateToProps = (state) => {
  const currentPost = selectArticle(state);
  const posts = selectArticles(state);
  let relatedPosts = null;

  if (posts && currentPost) {
    relatedPosts = posts.filter((art) => art.id !== currentPost.id).sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  return {
    relatedPosts,
    favoritePosts: selectFavoritePosts(state),
    posts,
    post: currentPost,
    isLoading: selectIsLoading(state),
  };
};

export default connect(mapStateToProps, {
  loadFavoritePostsStart,
  getArticle,
})(withScroll(withRouter(Article)));
