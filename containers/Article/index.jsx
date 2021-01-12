import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
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
} from 'components';
import { Article as OldArticle } from 'components/TemporaryBlog';
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
  const sortArticle = cloneDeep(currentArticle);
  // if (sortArticle) return null; // TODO
  const sortBody = (currentArticle && currentArticle.body && sortBy(currentArticle.body, 'orderNumber')) || [];
  if (sortBody) sortArticle.body = sortBody;
  const currentCategory = get(sortArticle, 'header.categoryTag', null);
  const currentTitle = get(sortArticle, 'header.title');

  const articleData = get(currentArticle, 'items[0].fields', {});

  const handleOnFormSubmit = (email) => subscribe({ email, pathname });

  useEffect(() => {
    if (article) getCurrentArticle(article);
  }, []);

  useEffect(() => {
    if (currentCategory) loadArticles({ category: currentCategory });
  }, [currentCategory]);

  useEffect(() => {
    if (articleData) getNearby({ name: articleData.title, createdAt: articleData.createdAt });
  }, [currentArticle]);

  return (
    <Fragment>
      {(articleData && articleData.body) ? (
        <OldArticle />
      ) : (
        <Fragment>
          <Article
            article={sortArticle}
            introSection={introSection}
            isLoading={isLoading}
          />
          <SocialThumbnails />
          <RelatedSection articles={relatedArticles} isLoading={isLoading} />
          <div className={styles.nextPrevSection}>
            <NextPrev
              isNewer
              article={newerArticle}
              isLoading={isLoading}
            />
            <NextPrev article={olderArticle} isLoading={isLoading} />
          </div>
        </Fragment>
      )}
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
)(ArticleContainer);
