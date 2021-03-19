import React from 'react';
import { useRouter } from 'next/router';
import { ArticleContainer, BlogContainer } from 'containers';
import { CATEGORY_SLUGS } from 'utils/constants';
import { isNumeric } from 'utils/helper';
import { getInitialBlogProps } from 'utils/blogUtils';

const Article = ({
  deviceLimit,
  currentPage,
  introSection,
}) => {
  const { query: { slug } } = useRouter();

  return (CATEGORY_SLUGS.includes(slug) || isNumeric(slug))
    ? (
      <BlogContainer
        deviceLimit={deviceLimit}
        currentPage={currentPage}
        introSection={introSection}
      />
    )
    : <ArticleContainer introSection={introSection} />;
};

Article.getInitialProps = async (ctx) => getInitialBlogProps(ctx);

export default Article;
