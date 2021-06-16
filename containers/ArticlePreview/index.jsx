import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { selectArticle } from 'redux/selectors/blog';
import { getArticleProps } from 'containers/Article/utils/propsHelper';
import {
  Article,
  MetaTags,
  withScroll,
  PageHeader,
  FullLayout,
} from 'components';
import { TagsBlock } from 'components/BlogCommon/Article/TagsBlock';
import { FAQ } from 'components/BlogCommon/Article/FAQ';
import { PAGES } from 'utils/constants';
import { microdata } from 'utils/microdata';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';

const ArticlePreviewContainer = ({
  introSection,
  currentArticle,
}) => {
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
    faqList,
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
        <TagsBlock tags={keyWords} />
        <FAQ faqList={faqList} />
      </FullLayout>
    </Fragment>
  );
};

ArticlePreviewContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  currentArticle: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ currentArticle: selectArticle(state) }),
)(withScroll(ArticlePreviewContainer));
