import React, {
  useEffect,
  Fragment,
  useState,
} from 'react';
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
import { fetchBlogData } from 'redux/actions/layout';
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
  isPageLoading,
  subscribe,
  fetchBlogData,
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
  const [isAnimationEnded, setIsAnimationEnded] = useState(false);

  const handleOnFormSubmit = (email) => subscribe({ email, pathname });
  const handleOnAnimationComplete = () => setIsAnimationEnded(true);

  useEffect(() => {
    fetchBlogData({
      articleSlug: article,
      pageSlug: PAGES.article,
    });
    setIsAnimationEnded(false);
  }, [article]);

  return (
    <Fragment>
      <MetaTags page={PAGES.blog} />
      { !isAnimationEnded ? (
        <LoadingPage isLoading={isPageLoading} handleOnAnimationComplete={handleOnAnimationComplete} />
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
  subscribe: PropTypes.func.isRequired,
  isPageLoading: PropTypes.bool.isRequired,
  fetchBlogData: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    currentArticle: selectArticle(state),
    articles: selectRelatedArticles(state),
    nearbyArticles: selectNearbyArticles(state),
    isPageLoading: selectIsLoading(state),
  }), {
    subscribe,
    fetchBlogData,
  },
)(withScroll(ArticleContainer));
