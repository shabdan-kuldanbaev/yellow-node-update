import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import {
  selectArticle,
  selectRelatedArticles,
  selectNearbyArticles,
} from 'redux/selectors/blog';
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
import { PAGES } from 'utils/constants';
import {
  rootUrl,
  getDocumentFields,
  getFileUrl,
} from 'utils/helper';
import { microdata } from 'utils/microdata';
import styles from './styles.module.scss';

const ArticleContainer = ({
  introSection,
  articles: relatedArticles,
  nearbyArticles: { newerArticle, olderArticle },
  currentArticle,
  subscribe: addNewSubscriber,
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
    updatedAt,
    keyWords = [],
    categoryTag = '',
    metaTitle,
    metaDescription,
  } = getDocumentFields(
    get(currentArticle, 'items[0]', {}),
    [
      'slug',
      'title',
      'oldBody',
      'body',
      'introduction',
      'headImageUrl',
      'publishedAt',
      'updatedAt',
      'keyWords',
      'categoryTag',
      'metaTitle',
      'metaDescription',
    ],
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
  const articleMetadata = {
    metaTitle,
    metaDescription,
    publishedAt,
    image: headImage,
    keyWords,
    categoryTag,
    slug: articleSlug,
  };
  const articleMicrodata = microdata.article({
    metaTitle,
    title,
    publishedAt,
    updatedAt,
    headImage,
    articleBody: oldBody || documentToPlainTextString(body),
  });

  const handleOnFormSubmit = (email) => addNewSubscriber({ email, pathname });

  return (
    <Fragment>
      <MetaTags
        page={PAGES.blog}
        pageMetadata={articleMetadata}
        microdata={articleMicrodata}
      />
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
  );
};

ArticleContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  articles: PropTypes.instanceOf(Array).isRequired,
  currentArticle: PropTypes.instanceOf(Object).isRequired,
  nearbyArticles: PropTypes.instanceOf(Object).isRequired,
  subscribe: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    currentArticle: selectArticle(state),
    articles: selectRelatedArticles(state),
    nearbyArticles: selectNearbyArticles(state),
  }),
  { subscribe },
)(withScroll(ArticleContainer));
