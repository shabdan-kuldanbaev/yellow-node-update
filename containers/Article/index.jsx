import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  selectArticle,
  selectRelatedArticles,
  selectNearbyArticles,
} from 'redux/selectors/blog';
import { selectIsLoadingScreenCompleted } from 'redux/selectors/layout';
import { fetchLayoutData } from 'redux/actions/layout';
import { subscribe } from 'redux/actions/subscribe';
import {
  Article,
  RelatedSection,
  SocialThumbnails,
  SubscribeBlock,
  NextPrev,
  MetaTags,
  withScroll,
  LoadingScreen,
} from 'components';
import { PAGES } from 'utils/constants';
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
  subscribe,
  fetchLayoutData,
  isLoadingScreenCompleted,
}) => {
  const { query: { article }, pathname } = useRouter();
  const {
    slug,
    title,
    oldBody,
    body,
    introduction,
    headImageUrl,
  } = getDocumentFields(
    get(currentArticle, 'items[0]', {}),
    ['slug', 'title', 'oldBody', 'body', 'introduction', 'headImageUrl'],
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
    fetchLayoutData({
      articleSlug: article,
      slug: PAGES.article,
    });
  }, [article]);

  return (
    <Fragment>
      <MetaTags page={PAGES.blog} />
      {!isLoadingScreenCompleted ? <LoadingScreen /> : (
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
      )}
    </Fragment>
  );
};

ArticleContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  articles: PropTypes.instanceOf(Array).isRequired,
  currentArticle: PropTypes.instanceOf(Object).isRequired,
  nearbyArticles: PropTypes.instanceOf(Object).isRequired,
  subscribe: PropTypes.func.isRequired,
  fetchLayoutData: PropTypes.bool.isRequired,
  isLoadingScreenCompleted: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    currentArticle: selectArticle(state),
    articles: selectRelatedArticles(state),
    nearbyArticles: selectNearbyArticles(state),
    isLoadingScreenCompleted: selectIsLoadingScreenCompleted(state),
  }), {
    subscribe,
    fetchLayoutData,
  },
)(withScroll(ArticleContainer));
