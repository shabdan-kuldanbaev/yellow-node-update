import React from 'react';
import { useRouter } from 'next/router';
import ArticleContainer from 'containers/Article';
import BlogContainer from 'containers/Blog';
import PageNotFound from 'containers/PageNotFound';
import { getInitialBlogProps, isArticle } from 'utils/blogUtils';

const Article = ({
  currentPage,
  introSection,
  statusCode,
  articlesNumberPerPage,
}) => {
  const { query: { slug } } = useRouter();

  if (statusCode === 404) {
    return <PageNotFound />;
  }

  return isArticle(slug)
    ? <ArticleContainer introSection={introSection} />
    : (
      <BlogContainer
        articlesNumberPerPage={articlesNumberPerPage}
        currentPage={currentPage}
        introSection={introSection}
      />
    );
};

Article.getInitialProps = async (ctx) => getInitialBlogProps(ctx);

export default Article;
