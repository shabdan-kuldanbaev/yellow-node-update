import React from 'react';
import { useRouter } from 'next/router';
import { ArticleContainer, BlogContainer } from 'containers';
import { getInitialBlogProps, isArticle } from 'utils/blogUtils';

const Article = ({
  deviceLimit,
  currentPage,
  introSection,
}) => {
  const { query: { slug } } = useRouter();

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
