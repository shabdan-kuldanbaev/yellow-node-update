import blogApi from 'redux/apis/blog';
import { pageFetchingStarted } from 'redux/reducers/layout';
import { isNumeric } from 'utils/helper';
import errorHelper from 'utils/error';
import { PAGES, ARTICLES_NUMBER_PER_PAGE } from 'utils/constants';
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
      // TODO: add statusCode 404 to props if no articles found
      store.dispatch(pageFetchingStarted({
        articleSlug: slug,
        slug: PAGES.article,
      }));
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
      });
    }

    await Promise.all(actions);
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the getInitialBlogProps function',
    });

    Object.assign(props, { statusCode: 500 });
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
