import { useFetchPageQuery } from 'store/apis/page';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { BLOCKS_SLUGS, PAGES } from 'utils/constants';
import { findBlock, rootUrl } from 'utils/helper';

export default ({ type }) => {
  const { data = {} } = useFetchPageQuery(type);
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
