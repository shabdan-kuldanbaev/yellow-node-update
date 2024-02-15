import { useContext } from 'react';
import { getPage } from 'utils/dataFetching/getPage';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { BLOCKS_SLUGS, PAGES } from 'utils/constants';
import { findBlock, rootUrl } from 'utils/helper';
import { PageFetchContext } from 'utils/appContext';

export default async () => {
  const { data = {} } = await getPage(PAGES.contact);
  const {
    contentModules = [],
    metaData,
  } = data;
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/contact`,
  };

  const { setPageFetchQuery } = useContext(PageFetchContext);
  setPageFetchQuery(PAGES.contact);

  const breadcrumbs = getBreadcrumbs(PAGES.contact);

  const peoplePhotoSection = findBlock(contentModules, BLOCKS_SLUGS.contactPageCompanyPhoto);

  return {
    peoplePhotoSection,
    pageMetadata,
    breadcrumbs,
  };
};
