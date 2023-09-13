import dynamic from 'next/dynamic';
import { getInitialBlogProps } from 'utils/blogUtils';
import { wrapper } from 'redux/store';

const ArticleContainer = dynamic(() => import('containers/Article'));
const BlogContainer = dynamic(() => import('UI/views/Blog'));

const Article = ({
  tagsList,
  currentPage,
  introSection,
  articlesNumberPerPage,
  isArticle,
  ...rest
}) => (isArticle
  ? (
    <ArticleContainer
      introSection={introSection}
      {...rest}
    />
  )
  : (
    <BlogContainer
      tagsList={tagsList}
      articlesNumberPerPage={articlesNumberPerPage}
      currentPage={currentPage}
      introSection={introSection}
      {...rest}
    />
  ));

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => getInitialBlogProps(store, ctx));

export default Article;
