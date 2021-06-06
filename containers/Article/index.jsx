import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
  PageHeader,
  FullLayout,
} from 'components';
import { PAGES } from 'utils/constants';
import { rootUrl } from 'utils/helper';
import { microdata } from 'utils/microdata';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { getArticleProps, getNearbyArticlesProps } from './utils/propsHelper';
import styles from './styles.module.scss';

const ArticleContainer = ({
  introSection,
  articles: relatedArticles,
  nearbyArticles,
  currentArticle,
  subscribe: addNewSubscriber,
}) => {
  const { query: { slug }, pathname } = useRouter();
  const { nextArticle, prevArticle } = getNearbyArticlesProps({ nearbyArticles });
  const {
    slug: articleSlug,
    title,
    description,
    oldBody,
    body,
    introduction,
    publishedAt,
    updatedAt,
    keyWords = [],
    categoryTag = '',
    metaTitle,
    metaDescription,
    headImage,
    author,
  } = getArticleProps({ article: currentArticle });
  const articleMetadata = {
    metaTitle: metaTitle || title,
    metaDescription: metaDescription || description,
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
    author,
  });
  const breadcrumbs = pagesBreadcrumbs.article(title, articleSlug);

  const handleOnFormSubmit = (email) => addNewSubscriber({ email, pathname });

  return (
    <Fragment>
      <MetaTags
        page={PAGES.blog}
        pageMetadata={articleMetadata}
        pageMicrodata={articleMicrodata}
        breadcrumbs={breadcrumbs}
      />
      <FullLayout>
        <PageHeader breadcrumbs={breadcrumbs} />
        <Article
          slug={articleSlug}
          title={title}
          oldBody={oldBody}
          body={body}
          introduction={introduction}
          headImage={headImage}
          introSection={introSection}
          author={author}
          publishedAt={publishedAt}
        />
        <SocialThumbnails
          url={`${rootUrl}/blog/${slug}`}
          title={title}
        />
        {relatedArticles
          && !!relatedArticles.length
          && <RelatedSection articles={relatedArticles} />}
        <div className={styles.nextPrevSection}>
          <NextPrev
            isNewer
            slug={nextArticle.slug}
            title={nextArticle.title}
            previewImageUrl={nextArticle.previewImageUrl}
          />
          <NextPrev
            slug={prevArticle.slug}
            title={prevArticle.title}
            previewImageUrl={prevArticle.previewImageUrl}
          />
        </div>
        <SubscribeBlock handleOnSubmit={handleOnFormSubmit} />
      </FullLayout>
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
