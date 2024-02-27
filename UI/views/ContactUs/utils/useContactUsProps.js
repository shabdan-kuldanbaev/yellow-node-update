import { getBreadcrumbs } from 'utils/breadcrumbs';
import { BLOCKS_SLUGS, PAGES } from 'utils/constants';
import { findBlock, rootUrl } from 'utils/helper';

export default ({ data }) => {
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
