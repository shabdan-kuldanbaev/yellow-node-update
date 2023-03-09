import React from 'react';
import ArticleContainer from 'containers/Article';
import BlogContainer from 'UI/views/Blog';
import PageNotFound from 'containers/PageNotFound';
import { getInitialBlogProps } from 'utils/blogUtils';
import { wrapper } from 'redux/store';

const Article = ({
  tagsList,
  currentPage,
  introSection,
  statusCode,
  articlesNumberPerPage,
  isArticle,
}) => {
  if (statusCode === 404) {
    return <PageNotFound />;
  }

  return isArticle
    ? <ArticleContainer introSection={introSection} />
    : (
      <BlogContainer
        tagsList={tagsList}
        articlesNumberPerPage={articlesNumberPerPage}
        currentPage={currentPage}
        introSection={introSection}
      />
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => getInitialBlogProps(store, ctx));

export default Article;
