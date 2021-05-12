import React from 'react';
import { useRouter } from 'next/router';
import {
  ArticleContainer,
  BlogContainer,
  PageNotFound,
} from 'containers';
import { getInitialBlogProps, isArticle } from 'utils/blogUtils';

const Article = ({
  deviceLimit,
  currentPage,
  introSection,
  statusCode,
}) => {
  const { query: { slug } } = useRouter();

  if (statusCode === 404) {
    return <PageNotFound />;
  }

  return isArticle(slug)
    ? <ArticleContainer introSection={introSection} />
    : (
      <BlogContainer
        deviceLimit={deviceLimit}
        currentPage={currentPage}
        introSection={introSection}
      />
    );
};

Article.getInitialProps = async (ctx) => getInitialBlogProps(ctx);

export default Article;
