import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { toInt, isNumeric } from 'utils/helper';
import errorHelper from 'utils/error';
import {
  PAGES,
  CATEGORY_SLUGS,
  ARTICLES_NUMBER_PER_PAGE,
} from 'utils/constants';
import { contentfulClient } from 'utils/contentful/client';
import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import { getGraphqlResultTags } from 'utils/contentful/helper';
import { routes } from './routes';

export const isArticle = (slug) => !!slug && !CATEGORY_SLUGS.includes(slug) && !isNumeric(slug);

export const checkIsTagBlog = (slug, tagsSet) => tagsSet.has(slug);

// TODO think a better solution
const fetchBlogData = async (
  store,
  {
    query: {
      slug: category = '',
      page = 1,
    },
    routeSlug,
    isTagBlog,
  },
) => {
  let queryParams = {
    category,
    page,
  };

  if (isNumeric(category)) {
    queryParams = {
      page: category,
    };
  }

  if (CATEGORY_SLUGS.includes(category)) {
    queryParams = {
      category,
      page,
    };
  }

  const currentPage = toInt(queryParams.page);

  store.dispatch(fetchLayoutData({
    slug: routeSlug,
    currentLimit: currentPage === 1 ? ARTICLES_NUMBER_PER_PAGE - 1 : ARTICLES_NUMBER_PER_PAGE,
    category: queryParams.category,
    skip: (currentPage - 1) * ARTICLES_NUMBER_PER_PAGE,
    isTagBlog,
  }));

  return {
    articlesNumberPerPage: ARTICLES_NUMBER_PER_PAGE,
    currentPage,
  };
};

const isArticleLoaded = (store) => store.getState().blog.single.total !== 0;

export const getInitialBlogProps = async (store, ctx) => {
  try {
    const {
      req,
      query: {
        slug,
      },
      res,
    } = ctx;
    let props = {};
    const response = await contentfulClient.graphql(GRAPHQL_QUERY.loadTag({}));
    const tagsList = getGraphqlResultTags(response);

    const tagsSet = new Set([...tagsList.map((item) => item.slug)]);
    const isTagBlog = checkIsTagBlog(slug, tagsSet);

    const categorySet = new Set([...routes.blog.categories.map((item) => item.slug)]);
    const isCategory = checkIsTagBlog(slug, categorySet);

    if (!isTagBlog && isArticle(slug)) {
      store.dispatch(fetchLayoutData({
        articleSlug: slug,
        slug: PAGES.article,
      }));
    } else {
      const { articlesNumberPerPage, currentPage } = await fetchBlogData(store, {
        ...ctx,
        routeSlug: PAGES.blog,
        isTagBlog,
        isCategory,
      });

      props = {
        articlesNumberPerPage,
        currentPage,
        isTagBlog,
        tagsList,
      };
    }

    // TODO rewrite it
    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();

      if (isArticle(slug)) {
        if (!isArticleLoaded(store)) {
          props.statusCode = 404;

          if (res) {
            res.statusCode = 404;
          }
        }
      }
    }

    return {
      props,
    };
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the getInitialBlogProps function',
    });
  }
};

export const getBlogGraphqlQuery = ({
  limit,
  skip,
  category,
  order,
  isTagBlog,
  isCategory,
}) => {
  if (isTagBlog && !isCategory) {
    return GRAPHQL_QUERY.loadPreviewArticlesByTags({
      limit,
      where: { slug: category },
    });
  }

  return GRAPHQL_QUERY.loadPreviewArticles({
    skip,
    limit,
    order,
    where: {
      ...(category
        ? { categoryTag: category }
        : { categoryTag_exists: true }
      ),
    },
  });
};
