import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import { store as reduxStore } from 'store/store';
import { getPage } from './dataFetching/getPage';
import { handleError } from './error';

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
