import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  selectArticle,
  selectRelatedArticles,
  selectNearbyArticles,
} from 'redux/selectors/blog';
import { selectIsLoading } from 'redux/selectors/layout';
import {
  getArticle,
  loadRelatedArticles,
  loadNearbyArticles,
} from 'redux/actions/blog';
import { fetchArticleData } from 'redux/actions/layout';
import { subscribe } from 'redux/actions/subscribe';
import {
  Article,
  RelatedSection,
  SocialThumbnails,
  SubscribeBlock,
  NextPrev,
  MetaTags,
  withScroll,
  LoadingPage,
} from 'components';
import { PAGES, DEFAULT_ARTICLES_LIMIT } from 'utils/constants';
import {
  rootUrl,
  getDocumentFields,
  getFileUrl,
} from 'utils/helper';
import styles from './styles.module.scss';

const ArticleContainer = ({
  introSection,
  articles: relatedArticles,
  nearbyArticles: { newerArticle, olderArticle },
  currentArticle,
  isPageLoading,
  getArticle: getCurrentArticle,
  loadRelatedArticles: loadArticles,
  loadNearbyArticles: getNearby,
  subscribe,
  fetchArticleData,
}) => {
  const { query: { article }, pathname } = useRouter();
  const {
    slug,
    categoryTag,
    title,
    createdAt,
    oldBody,
    body,
    introduction,
    headImageUrl,
  } = getDocumentFields(
    get(currentArticle, 'items[0]', {}),
    ['slug', 'categoryTag', 'title', 'createdAt', 'oldBody', 'body', 'introduction', 'headImageUrl'],
  );
  const {
    previewImageUrl: previewImageUrlNewer,
    slug: slugNewer,
    title: titleNewer,
  } = getDocumentFields(
    newerArticle,
    ['slug', 'title', 'previewImageUrl'],
  );
  const {
    previewImageUrl: previewImageUrlOlder,
    slug: slugOlder,
    title: titleOlder,
  } = getDocumentFields(
    olderArticle,
    ['slug', 'title', 'previewImageUrl'],
  );
  const headImage = getFileUrl(headImageUrl);
  const [isAnimationEnded, setIsAnimationEnded] = useState(false);

  const handleOnFormSubmit = (email) => subscribe({ email, pathname });
  const handleOnAnimationComplete = () => setIsAnimationEnded(true);

  // useEffect(() => {
  //   if (article) getCurrentArticle(article);
  // }, [article]);

  // useEffect(() => {
  //   if (title && createdAt) getNearby({ name: title, createdAt });

  //   if (slug) {
  //     loadArticles({
  //       currentLimit: DEFAULT_ARTICLES_LIMIT,
  //       currentArticleSlug: slug,
  //       categoryTag,
  //     });
  //   }
  // }, [title, createdAt, slug]);

  useEffect(() => {
    fetchArticleData(article);
    setIsAnimationEnded(false);
  }, [article]);

  return (
    <Fragment>
      <MetaTags page={PAGES.blog} />
      { !isAnimationEnded ? (
        <LoadingPage
          handleOnAnimationComplete={handleOnAnimationComplete}
        />
      ) : (
        <Fragment>
          <Article
            slug={slug}
            title={title}
            oldBody={oldBody}
            body={body}
            introduction={introduction}
            headImage={headImage}
            introSection={introSection}
          />
          <SocialThumbnails url={`${rootUrl}/blog/${article}`} title={title} />
          {relatedArticles && !!relatedArticles.length && <RelatedSection articles={relatedArticles} />}
          <div className={styles.nextPrevSection}>
            <NextPrev
              isNewer
              previewImageUrl={getFileUrl(previewImageUrlNewer)}
              slug={slugNewer}
              title={titleNewer}
            />
            <NextPrev
              previewImageUrl={getFileUrl(previewImageUrlOlder)}
              slug={slugOlder}
              title={titleOlder}
            />
          </div>
          <SubscribeBlock handleOnSubmit={handleOnFormSubmit} />
        </Fragment>

      ) }
    </Fragment>
  );
};

ArticleContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  articles: PropTypes.instanceOf(Array).isRequired,
  currentArticle: PropTypes.instanceOf(Object).isRequired,
  nearbyArticles: PropTypes.instanceOf(Object).isRequired,
  getArticle: PropTypes.func.isRequired,
  loadRelatedArticles: PropTypes.func.isRequired,
  loadNearbyArticles: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchArticleData: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    currentArticle: selectArticle(state),
    articles: selectRelatedArticles(state),
    nearbyArticles: selectNearbyArticles(state),
    isPageLoading: selectIsLoading(state),
  }), {
    getArticle,
    loadRelatedArticles,
    loadNearbyArticles,
    subscribe,
    fetchArticleData,
  },
)(withScroll(ArticleContainer));
