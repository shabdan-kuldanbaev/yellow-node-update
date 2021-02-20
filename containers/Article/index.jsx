import React, { Fragment } from 'react';
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
  isLoadingScreenCompleted,
}) => {
  const { query: { slug }, pathname } = useRouter();
  const {
    slug: articleSlug,
    title,
    oldBody,
    body,
    introduction,
    headImageUrl,
    publishedAt,
    keyWords = [],
  } = getDocumentFields(
    get(currentArticle, 'items[0]', {}),
    ['slug', 'title', 'oldBody', 'body', 'introduction', 'headImageUrl', 'publishedAt', 'keyWords'],
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
  const articleMetaData = {
    title,
    description: introduction,
    date: publishedAt,
    keyWords: (keyWords && keyWords.join(', ')) || null,
    image: headImage,
  };

  const handleOnFormSubmit = (email) => subscribe({ email, pathname });

  return (
    <Fragment>
      <MetaTags page={PAGES.blog} articleMetaData={articleMetaData} />
      {!isLoadingScreenCompleted ? <LoadingScreen /> : (
        <Fragment>
          <Article
            slug={articleSlug}
            title={title}
            oldBody={oldBody}
            body={body}
            introduction={introduction}
            headImage={headImage}
            introSection={introSection}
          />
          <SocialThumbnails url={`${rootUrl}/blog/${slug}`} title={title} />
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
  isLoadingScreenCompleted: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    currentArticle: selectArticle(state),
    articles: selectRelatedArticles(state),
    nearbyArticles: selectNearbyArticles(state),
    isLoadingScreenCompleted: selectIsLoadingScreenCompleted(state),
  }),
  { subscribe },
)(withScroll(ArticleContainer));
