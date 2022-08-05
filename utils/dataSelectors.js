import { END } from 'redux-saga';
import {
  selectComponents,
  selectCTA, selectHomepageProjectsPreview, selectImageCarousel,
  selectMetaData,
  selectPortfolioProjectsPreview,
  selectSubtitle,
} from 'redux/selectors/layout';
import { wrapper } from 'redux/store';
import { fetchLayoutData } from 'redux/actions/layout';
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

  const photosData = selectImageCarousel(state);
  const { contentModules } = getDocumentFields(photosData, ['contentModules']);

  const projects = selectHomepageProjectsPreview(state);

  return {
    photos: contentModules,
    pageMetadata,
    projects,
  };
};

export const getStaticPropsWrapper = (slug, selectors) => wrapper.getStaticProps((store) => async () => {
  try {
    store.dispatch(fetchLayoutData({ slug }));
    store.dispatch(END);
    await store.sagaTask.toPromise();

    const state = store.getState();
    const pageData = selectors ? selectors(state) : {};

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
