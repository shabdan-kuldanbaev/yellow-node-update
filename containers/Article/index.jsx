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
  subscribe,
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
  const articleMetaData = {
    metaTitle,
    metaDescription,
    date: publishedAt,
    image: headImage,
  };

  const handleOnFormSubmit = (email) => subscribe({ email, pathname });

  return (
    <Fragment>
      <MetaTags
        page={PAGES.blog}
        articleMetaData={articleMetaData}
        microdata={microdata.article({
          metaTitle,
          title,
          publishedAt,
          updatedAt,
          headImage,
          articleBody: oldBody || body,
        })}
      >
        <meta property="article:published_time" content={publishedAt} />
        <meta property="article:section" content={categoryTag} />
        {keyWords && keyWords.map((word) => (
          <meta property="article:tag" content={word} />
        ))}
      </MetaTags>
      <Article
        slug={articleSlug}
        title={title}
        oldBody={oldBody}
        body={body}
        introduction={introduction}
        headImage={headImage}
        introSection={introSection}
        publishedAt={publishedAt}
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
