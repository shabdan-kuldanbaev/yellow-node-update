import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import { store as reduxStore } from 'store/store';
import worksApi from 'store/apis/works';
import {
  BLOCKS_SLUGS,
  DEFAULT_WORKS_LIMIT,
  PAGES,
} from 'utils/constants';
import { handleError } from './error';
import { findBlock, getDocumentFields, rootUrl } from './helper';
import { getPage } from './dataFetching/getPage';

export const getPortfolioPageProps = async (state, store) => {
  await store.dispatch(worksApi.endpoints.loadTagsAndTypes.initiate());

  const { data } = await getPage(PAGES.portfolio);

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

export const getStaticPropsWrapper = (slug, selectors) => async () => {
  try {
    const state = reduxStore.getState();
    const pageData = selectors ? omitBy(await selectors(state, reduxStore), isNil) : {};
    const { data } = await getPage(slug);

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
