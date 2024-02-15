import blogApi from 'store/apis/blog';
import { isNumeric } from 'utils/helper';
import { handleError } from 'utils/error';
import { ARTICLES_NUMBER_PER_PAGE } from 'utils/constants';
import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';

export const checkIfSlugIsTag = (tags, slug) => !!tags.find(({ slug: tagSlug }) => slug === tagSlug);

export const getInitialBlogProps = async (store, ctx) => {
  const {
    req,
    query: {
      slug = '',
      page: queryPage = '',
    },
    res,
  } = ctx;

  const props = {
    articlesNumberPerPage: ARTICLES_NUMBER_PER_PAGE,
  };

  try {
    await store.dispatch(blogApi.endpoints.getTags.initiate());

    const { data: tags } = blogApi.endpoints.getTags.select()(store.getState());

    const isTag = checkIfSlugIsTag(tags, slug);
    const isArticle = slug && !isTag && !isNumeric(slug);

    const actions = [];

    if (isArticle) {
      const query = { slug };
      actions.push(store.dispatch(blogApi.endpoints.getArticle.initiate(query)));

      Object.assign(props, {
        isArticle,
        query,
        pageFetchQuery: query,
      });
    } else {
      const query = {
        slug,
        isTag,
      };

      const page = +slug || +queryPage;
      const skip = ((page === 0) ? 0 : (page - 1) * ARTICLES_NUMBER_PER_PAGE - 1);
      const limit = page === 0 ? ARTICLES_NUMBER_PER_PAGE - 1 : ARTICLES_NUMBER_PER_PAGE;
      Object.assign(query, { skip, limit });

      actions.push(store.dispatch(blogApi.endpoints.getArticlesList.initiate(query)));

      Object.assign(props, {
        currentPage: page || 1,
        tagsList: tags,
        isArticle,
        query,
        pageFetchQuery: query,
      });
    }

    await Promise.all(actions);
  } catch (error) {
    handleError({
      error,
      message: 'Error in the getInitialBlogProps function',
    });

    res.statusCode = 500;
  }

  return { props };
};

export const getBlogGraphqlQuery = ({
  limit,
  skip,
  category,
  order,
  isTagBlog,
}) => {
  if (isTagBlog) {
    return GRAPHQL_QUERY.loadPreviewArticlesByTags({
      limit,
      skip,
      where: { slug: category },
    });
  }

  return GRAPHQL_QUERY.loadPreviewArticles({
    skip,
    limit,
    order,
  });
};
