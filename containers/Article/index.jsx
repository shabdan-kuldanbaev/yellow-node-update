import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import get from 'lodash/get';
import {
  selectArticle,
  selectRelatedArticles,
  selectNearbyArticles,
} from 'redux/selectors/blog';
import { subscribe } from 'redux/actions/subscribe';
import {
  Article,
  RelatedSection,
  SubscribeBlock,
  NextPrev,
  MetaTags,
  PageHeader,
  FullLayout,
} from 'components';
import { ShareThumbnails } from 'components/BlogCommon/Article/ShareThumbnails';
import { TagsBlock } from 'components/BlogCommon/Article/TagsBlock';
import { FAQ } from 'components/BlogCommon/Article/FAQ';
import { PAGES } from 'utils/constants';
import { rootUrl } from 'utils/helper';
import { microdata } from 'utils/microdata';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { getArticleProps } from './utils/propsHelper';
import styles from './styles.module.scss';

const ArticleContainer = ({
  introSection,
  articles: relatedArticles,
  nearbyArticles,
  currentArticle,
  subscribe: addNewSubscriber,
}) => {
  const {
    query: { slug },
    pathname,
    asPath,
  } = useRouter();
  const prevArticleSlug = get(nearbyArticles, 'olderArticle.slug');
  const nextArticleSlug = get(nearbyArticles, 'newerArticle.slug');
  const {
    slug: articleSlug,
    title,
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
    faqList,
  } = getArticleProps({ article: currentArticle });
  const articleMetadata = {
    metaTitle: metaTitle || (title && `${title} | Yellow`),
    metaDescription: metaDescription || (title && `Read our new article about ${title}.`),
    publishedAt,
    image: headImage,
    keyWords,
    categoryTag,
    slug: articleSlug,
    url: `${rootUrl}${asPath}`,
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
        isArticle
        pageMetadata={articleMetadata}
        pageMicrodata={articleMicrodata}
        breadcrumbs={breadcrumbs}
        faqList={faqList}
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
        <ShareThumbnails
          url={`${rootUrl}/blog/${slug}`}
          title={title}
        />
        <FAQ faqList={faqList} />
        <TagsBlock tags={keyWords} />
        {relatedArticles
          && !!relatedArticles.length
          && <RelatedSection articles={relatedArticles} />}
        <div className={styles.nextPrevSection}>
          <NextPrev slug={prevArticleSlug} />
          <NextPrev
            isNewer
            slug={nextArticleSlug}
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
)(ArticleContainer);
