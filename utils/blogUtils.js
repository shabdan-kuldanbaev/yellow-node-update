import { END } from 'redux-saga';
import { fetchLayoutData } from 'redux/actions/layout';
import { selectDesktopLimit, selectMobileLimit } from 'redux/selectors/blog';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { toInt, isNumeric } from 'utils/helper';
import { PAGES, CATEGORY_SLUGS } from 'utils/constants';

export const isArticle = (slug) => !!slug && !CATEGORY_SLUGS.includes(slug) && !isNumeric(slug);

// TODO think a better solution
const fetchBlogData = async ({
  store,
  query: {
    slug: category = '',
    page = 1,
  },
}) => {
  const currentState = store.getState();
  const deviceLimit = selectIsMobileResolutions(currentState)
    ? selectMobileLimit(currentState)
    : selectDesktopLimit(currentState);
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
    slug: PAGES.blog,
    currentPage,
    currentLimit: deviceLimit,
    category: queryParams.category,
    skip: (currentPage - 1) * deviceLimit,
  }));

  return {
    deviceLimit,
    currentPage,
  };
};

const isArticleLoaded = (store) => store.getState().blog.single.total !== 0;

export const getInitialBlogProps = async (ctx) => {
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
    const { deviceLimit, currentPage } = await fetchBlogData(ctx);

    props = {
      deviceLimit,
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
};
