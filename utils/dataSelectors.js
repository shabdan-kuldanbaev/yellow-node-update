import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import { END } from 'redux-saga';
import {
  selectComponents,
  selectCTA,
  selectHomepageProjectsPreview,
  selectMetaData,
  selectPortfolioProjectsPreview,
  selectSubtitle,
} from 'redux/selectors/layout';
import { wrapper } from 'redux/store';
import { pageFetchingStarted } from 'redux/reducers/layout';
import errorHelper from './error';
import { getDocumentFields, rootUrl } from './helper';

export const getServicePageProps = (state) => ({
  pageData: selectComponents(state),
});

export const getPortfolioPageProps = (state) => {
  const portfolioProjects = selectPortfolioProjectsPreview(state);
  const { contentModules } = getDocumentFields(portfolioProjects, ['contentModules']);
  const works = contentModules?.map((module) => {
    const {
      types,
      tags,
      ...rest
    } = getDocumentFields(module, ['title', 'description', 'types', 'tags', 'previewImage', 'backgroundImage', 'slug']);

    return {
      types: types?.map((type) => getDocumentFields(type, ['slug', 'displayName'])) ?? [],
      tags: tags?.map((tag) => getDocumentFields(tag, ['slug', 'title'])) ?? [],
      ...rest,
    };
  });

  const metaData = selectMetaData(state);
  const pageMetadata = {
    url: `${rootUrl}/works`,
    ...metaData,
  };

  const linkCTA = selectCTA(state);

  return {
    subtitle: selectSubtitle(state),
    link: getDocumentFields(linkCTA),
    pageMetadata,
    works,
  };
};

export const getHomePageDataPros = (state) => {
  const metaData = selectMetaData(state);
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}`,
  };

  const components = selectComponents(state);

  const projects = selectHomepageProjectsPreview(state);

  return {
    pageData: components,
    pageMetadata,
    projects,
  };
};

export const getStaticPropsWrapper = (slug, selectors) => wrapper.getStaticProps((store) => async () => {
  try {
    store.dispatch(pageFetchingStarted({ slug }));
    store.dispatch(END);
    await store.sagaTask.toPromise();

    const state = store.getState();
    const pageData = selectors ? omitBy(selectors(state), isNil) : {};

    return {
      props: {
        metaData: selectMetaData(state),
        type: slug,
        ...pageData,
      },
      revalidate: 10,
    };
  } catch (error) {
    errorHelper.handleError({
      error,
      message: `Error in the ${slug}.getStaticProps function`,
    });
  }
});
