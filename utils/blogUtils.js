import get from 'lodash/get';
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

export const isArticle = (slug) => !!slug && !CATEGORY_SLUGS.includes(slug) && !isNumeric(slug);

// TODO think a better solution
const fetchBlogData = async ({
  store,
  query: {
    slug: category = '',
    page = 1,
  },
  routeSlug,
}) => {
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
    currentLimit: ARTICLES_NUMBER_PER_PAGE,
    category: queryParams.category,
    skip: (currentPage - 1) * ARTICLES_NUMBER_PER_PAGE,
  }));

  return {
    articlesNumberPerPage: ARTICLES_NUMBER_PER_PAGE,
    currentPage,
  };
};

const isArticleLoaded = (store) => store.getState().blog.single.total !== 0;

export const getInitialBlogProps = async (ctx) => {
  try {
    const {
      store,
      req,
      query: {
        slug,
      },
      res,
    } = ctx;
    let props = {};

    if (isArticle(slug)) {
      store.dispatch(fetchLayoutData({
        articleSlug: slug,
        slug: PAGES.article,
      }));
    } else {
      const { articlesNumberPerPage, currentPage } = await fetchBlogData({ ...ctx, routeSlug: PAGES.blog });

      props = {
        articlesNumberPerPage,
        currentPage,
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

    return props;
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the getInitialBlogProps function',
    });
  }
};

export const getInitialTagBlogProps = async (ctx) => {
  try {
    const {
      store,
      req,
      query: {
        slug,
      },
      res,
    } = ctx;
    const response = await contentfulClient.graphql(GRAPHQL_QUERY.getAllArticalTags());
    const tagsList = get(response, 'articalTagCollection.items', []);

    const { articlesNumberPerPage, currentPage } = await fetchBlogData({ ...ctx, routeSlug: PAGES.tagBlog });
    const props = {
      articlesNumberPerPage,
      currentPage,
      statusCode: 200,
    };

    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
      const isValidPath = tagsList.some((tag) => tag.slug === slug);

      if (!isValidPath) {
        props.statusCode = 404;

        if (res) {
          res.statusCode = 404;
        }
      }
    }

    return props;
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the getInitialBlogProps function',
    });
  }
};
