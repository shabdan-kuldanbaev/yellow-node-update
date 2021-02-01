import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  selectArticle,
  selectIsLoading,
  selectRelatedArticles,
  selectNearbyArticles,
} from 'redux/selectors/blog';
import {
  getArticle,
  loadRelatedArticles,
  loadNearbyArticles,
} from 'redux/actions/blog';
import { subscribe } from 'redux/actions/subscribe';
import {
  Article,
  RelatedSection,
  SocialThumbnails,
  SubscribeBlock,
  NextPrev,
  MetaTags,
  withScroll,
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
  isLoading,
  getArticle: getCurrentArticle,
  loadRelatedArticles: loadArticles,
  loadNearbyArticles: getNearby,
  subscribe,
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

  const handleOnFormSubmit = (email) => subscribe({ email, pathname });

  useEffect(() => {
    if (article) getCurrentArticle(article);
  }, [article, categoryTag]);

  useEffect(() => {
    if (title && createdAt) getNearby({ name: title, createdAt });

    if (slug) {
      loadArticles({
        currentLimit: DEFAULT_ARTICLES_LIMIT,
        currentArticleSlug: slug,
        categoryTag,
      });
    }
  }, [currentArticle]);

  return (
    <Fragment>
      <MetaTags page={PAGES.blog} />
      <Article
        slug={slug}
        title={title}
        oldBody={oldBody}
        body={body}
        introduction={introduction}
        headImage={headImage}
        introSection={introSection}
        isLoading={isLoading}
      />
      <SocialThumbnails url={`${rootUrl}/blog/${article}`} title={title} />
      <RelatedSection articles={relatedArticles} isLoading={isLoading} />
      <div className={styles.nextPrevSection}>
        <NextPrev
          isNewer
          isLoading={isLoading}
          previewImageUrl={getFileUrl(previewImageUrlNewer)}
          slug={slugNewer}
          title={titleNewer}
        />
        <NextPrev
          isLoading={isLoading}
          previewImageUrl={getFileUrl(previewImageUrlOlder)}
          slug={slugOlder}
          title={titleOlder}
        />
      </div>
      <SubscribeBlock handleOnSubmit={handleOnFormSubmit} />
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
};

export default connect(
  (state) => ({
    currentArticle: selectArticle(state),
    articles: selectRelatedArticles(state),
    nearbyArticles: selectNearbyArticles(state),
    isLoading: selectIsLoading(state),
  }), {
    getArticle,
    loadRelatedArticles,
    loadNearbyArticles,
    subscribe,
  },
)(withScroll(ArticleContainer));
