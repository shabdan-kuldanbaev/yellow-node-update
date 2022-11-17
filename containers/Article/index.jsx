import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import get from 'lodash/get';
import {
  selectArticle,
  selectRelatedArticles,
  selectNearbyArticles,
} from 'redux/selectors/blog';
import { subscribe } from 'redux/actions/subscribe';
import RelatedSection from 'components/BlogCommon/Article/RelatedSection';
import PageHeader from 'components/Common/PageHeader';
import MetaTags from 'components/Common/MetaTags';
import Article from 'components/BlogCommon/Article';
import SubscribeBlock from 'components/Common/SubscribeBlock';
import FullLayout from 'components/Layout/FullLayout';
import NextPrev from 'components/BlogCommon/Article/NextPrev';
import { ShareThumbnails } from 'components/BlogCommon/Article/ShareThumbnails';
import { TagsBlock } from 'components/BlogCommon/Article/TagsBlock';
import FAQ from 'UI/components/FAQ';
import { PAGES } from 'utils/constants';
import { rootUrl } from 'utils/helper';
import { microdata } from 'utils/microdata';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { getArticleProps } from './utils/propsHelper';
import styles from './styles.module.scss';

const ArticleContainer = ({
  introSection,
}) => {
  const dispatch = useDispatch();
  const currentArticle = useSelector(selectArticle);
  const relatedArticles = useSelector(selectRelatedArticles);
  const nearbyArticles = useSelector(selectNearbyArticles);

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
    tagsList,
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
    keyWords: tagsList.map((tag) => tag.title),
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

  const handleOnFormSubmit = (email) => dispatch(subscribe({ email, pathname }));

  return (
    <>
      <MetaTags
        page={PAGES.blog}
        isArticle
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
        <ShareThumbnails
          url={`${rootUrl}/blog/${slug}`}
          title={title}
        />
        <FullLayout
          disableMaxWidth
          disableTopPadding
          disableSidePadding
          disableBottomPadding
        >
          <FAQ faqList={faqList} />
        </FullLayout>
        <TagsBlock tags={tagsList} />
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
    </>
  );
};

ArticleContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default ArticleContainer;
