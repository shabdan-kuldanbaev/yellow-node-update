// import React, { PureComponent, Fragment } from 'react';
// import { connect } from 'react-redux';
// // import ReactGA from 'react-ga';
// import PropTypes from 'prop-types';
// // import { Helmet } from 'react-safety-helmet';
// import Head from 'next/head';

// import store from 'redux/store';
// import {
//   loadPostsIfNeeded,
//   loadFavoritePostsIfNeeded,
//   loadPost,
// } from 'redux/actions/blog';
// import { getFavoritePosts } from 'redux/reducers/blog/favoritePosts';
// import { blogPostsSelector } from 'redux/reducers/blog';
// import { getCurrentPost } from 'redux/reducers/blog/currentPost';


// import { Loader } from 'components';
// import Subscribe from '../Subscribe';
// import Navigation from '../Navigation';
// import Favorites from '../Favorites';
// import RelatedPosts from '../RelatedPosts';
// import withScroll from '../withScroll';
// import SocialShare from '../SocialShare';
// import styles from './styles.module.scss';

// class Article extends PureComponent {
//   static initialAction(id) {
//     const postId = id.replace('/blog/', '');
//     store.dispatch(loadPostsIfNeeded());
//     store.dispatch(loadFavoritePostsIfNeeded());
//     return loadPost(postId);
//   }

//   componentWillMount() {
//     if (!this.props.post) {
//       this.props.loadPost(this.props.match.params.id);
//     } else if (this.props.post.slug !== this.props.match.params.id) {
//       this.props.loadPost(this.props.match.params.id);
//     }
//     this.props.loadPostsIfNeeded();
//     this.props.loadFavoritePostsIfNeeded();
//   }

//   componentWillReceiveProps(nextProps) {
//     if (this.props.match.params.id !== nextProps.match.params.id) {
//       this.props.loadPost(nextProps.match.params.id);
//     }
//   }

//   componentWillUnmount() {
//     // ReactGA.event({
//     //   category: 'Scroll',
//     //   action: `${this.props.maxScrollPosition}%`,
//     //   label: `/blog/${this.props.post.slug}`,
//     //   nonInteraction: this.props.maxScrollPosition < 50,
//     // });
//   }

//   createMarkup(data) {
//     return { __html: data };
//   }

//   render() {
//     const {
//       post,
//       posts,
//       favoritePosts,
//       isLoading,
//       relatedPosts,
//     } = this.props;
//     if (isLoading || !post) {
//       return <Loader />;
//     }
//     const title = `${post.page_title || post.title} - Yellow`;
//     return (
//       <Fragment>
//         <Head>
//           <title>{title}</title>
//           <meta property="og:title" content={title} />
//           <meta property="og:description" content={post.description} />
//           <meta name="description" content={post.description} />
//           <meta property="og:image" content={post.head_image_url.replace('//', 'https://')} />
//           <meta property="og:image:width" content="1160" />
//           <meta property="og:image:height" content="621" />
//           <meta property="og:url" content={`${process.env.WEB_URL}/blog/${post.slug}`} />
//           <meta property="og:type" content="article" />
//           <meta property="article:published_time" content={post.published_at} />
//           <meta property="article:modified_time" content={post.updated_at} />
//         </Head>
//         <article className={styles.article}>
//           <div className={styles.articleHeader}>
//             <h1>{post.title}</h1>
//             <p className={styles.introduction}>{post.introduction}</p>
//             <div className={styles.imageContainer}>
//               <img src={post.head_image_url} alt={post.title} />
//             </div>
//           </div>

//           <div className={styles.articleContentContainer}>
//             <div className={styles.articleAside}>
//               <Favorites posts={favoritePosts} />
//             </div>

//             <div className={styles.articleContent}>
//               <div dangerouslySetInnerHTML={this.createMarkup(post.body)} />
//               <SocialShare
//                 url={`${process.env.WEB_URL}/blog/${post.slug}`}
//                 title={post.title}
//                 description={post.introduction}
//               />
//             </div>

//             <div className={styles.articleAside}>
//               <Navigation />
//             </div>
//           </div>

//           <Subscribe
//             title="Don't want to miss anything?"
//             description="Get weekly updates on the newest design stories, case studies and tips right in your mailbox."
//             insideArticle
//           />

//           <RelatedPosts posts={relatedPosts} />

//         </article>
//       </Fragment>
//     );
//   }
// }

// Article.propTypes = {
//   posts: PropTypes.arrayOf(PropTypes.object),
//   favoritePosts: PropTypes.arrayOf(PropTypes.object),
//   relatedPosts: PropTypes.arrayOf(PropTypes.object),
// };

// Article.defaultProps = {
//   posts: [],
//   favoritePosts: [],
//   relatedPosts: [],
// };

// const mapStateToProps = (state) => {
//   const currentPost = getCurrentPost(state);
//   const posts = blogPostsSelector(state);
//   let relatedPosts = null;

//   if (posts && currentPost) {
//     relatedPosts = posts.filter((art) => art.id !== currentPost.id).sort(() => 0.5 - Math.random()).slice(0, 3);
//   }

//   return {
//     relatedPosts,
//     favoritePosts: getFavoritePosts(state),
//     posts,
//     post: currentPost,
//     isLoading: state.blog.currentPost.isLoading,
//   };
// };

// export default connect(mapStateToProps, {
//   loadPostsIfNeeded,
//   loadFavoritePostsIfNeeded,
//   loadPost,
// })(withScroll(Article));
