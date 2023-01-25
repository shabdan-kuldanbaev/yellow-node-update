import React from 'react';
import { useRouter } from 'next/router';
import ArticleContainer from 'containers/Article';
import BlogContainer from 'UI/views/Blog';
import PageNotFound from 'containers/PageNotFound';
import { getInitialBlogProps, isArticle } from 'utils/blogUtils';
import { wrapper } from 'redux/store';

const Article = ({
  isTagBlog,
  tagsList,
  currentPage,
  introSection,
  statusCode,
  articlesNumberPerPage,
}) => {
  const { query: { slug } } = useRouter();

  if (statusCode === 404) {
    return <PageNotFound />;
  }

  return isArticle(slug) && !isTagBlog
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
