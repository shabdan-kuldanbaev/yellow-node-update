import { BLOCKS_SLUGS } from 'utils/constants';
import { findBlock } from 'utils/helper';

export default ({ data, ...rest }) => {
  const { contentModules = [] } = data;

  const peoplePhotoSection = findBlock(contentModules, BLOCKS_SLUGS.contactPageCompanyPhoto);

  return {
    peoplePhotoSection,
    ...rest,
  };
};
