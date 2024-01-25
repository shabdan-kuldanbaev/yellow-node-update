import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import { reduxStore } from 'redux/store';
import blogApi from 'redux/apis/blog';
import pageApi from 'redux/apis/page';
import worksApi from 'redux/apis/works';
import {
  BLOCKS_SLUGS,
  DEFAULT_WORKS_LIMIT,
  HOMEPAGE_ARTICLES_LIMIT,
  PAGES,
} from 'utils/constants';
import { processes } from 'utils/processes';
import { handleError } from './error';
import { findBlock, getDocumentFields, rootUrl } from './helper';

export const getPortfolioPageProps = async (state, store) => {
  await store.dispatch(worksApi.endpoints.loadTagsAndTypes.initiate());

  const { data } = pageApi.endpoints.fetchPage.select(PAGES.portfolio)(state);

  const portfolioProjects = findBlock(data.contentModules, BLOCKS_SLUGS.worksPagePreviewProjects);
  const { contentModules } = getDocumentFields(portfolioProjects, ['contentModules']);
  const works = contentModules.map((module) => {
    const {
      types,
      tags,
      ...rest
    } = getDocumentFields(module, [
      'title',
      'description',
      'types',
      'tags',
      'previewImage',
      'backgroundImage',
      'slug',
    ]);

    return {
      types: types?.map((type) => getDocumentFields(type, ['slug', 'displayName'])) ?? [],
      tags: tags?.map((tag) => getDocumentFields(tag, ['slug', 'title'])) ?? [],
      ...rest,
    };
  });

  const initialWorksList = works.slice(0, DEFAULT_WORKS_LIMIT);

  const pageMetadata = {
    url: `${rootUrl}/works`,
    ...data.metaData,
  };

  const link = data.contentModules.find((module) => module?.sys?.contentType?.sys?.id === 'link');

  return {
    pageFetchQuery: PAGES.portfolio,
    link,
    pageMetadata,
    works,
    initialWorksList,
  };
};

export const getHomePageDataPros = async (state, store) => {
  const blogQuery = { limit: HOMEPAGE_ARTICLES_LIMIT };
  await store.dispatch(blogApi.endpoints.getArticlesList.initiate(blogQuery));

  const { data } = pageApi.endpoints.fetchPage.select(PAGES.homepage)(state);

  const pageMetadata = {
    ...data.metaData,
    url: `${rootUrl}`,
  };

  const components = data.contentModules;

  const projects = findBlock(components, BLOCKS_SLUGS.homepagePreviewProjects);

  return {
    pageFetchQuery: PAGES.homepage,
    pageData: components,
    pageMetadata,
    projects,
    blogQuery,
  };
};

export const getProcessProps = async (state, store) => ({ json: processes });

export const getStaticPropsWrapper = (slug, selectors) => async () => {
  try {
    await reduxStore.dispatch(pageApi.endpoints.fetchPage.initiate(slug));

    const state = reduxStore.getState();
    const pageData = selectors ? omitBy(await selectors(state, reduxStore), isNil) : {};
    const { data } = pageApi.endpoints.fetchPage.select(slug)(state);

    return {
      props: {
        pageFetchQuery: slug,
        metaData: data.metaData,
        type: slug,
        ...pageData,
      },
      revalidate: 10,
    };
  } catch (error) {
    handleError({
      error,
      message: `Error in the ${slug}.getStaticProps function`,
    });
  }
};
