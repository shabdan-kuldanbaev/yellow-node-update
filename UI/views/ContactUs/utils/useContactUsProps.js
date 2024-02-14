import { getPage } from 'utils/dataFetching/getPage';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { BLOCKS_SLUGS, PAGES } from 'utils/constants';
import { findBlock, rootUrl } from 'utils/helper';

export default async ({ type }) => {
  const { data = {} } = await getPage(type);
  const {
    contentModules = [],
    metaData,
  } = data;
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/contact`,
  };

  const breadcrumbs = getBreadcrumbs(PAGES.contact);

  const peoplePhotoSection = findBlock(contentModules, BLOCKS_SLUGS.contactPageCompanyPhoto);

  return {
    peoplePhotoSection,
    pageMetadata,
    breadcrumbs,
  };
};
