import get from 'lodash/get';
import { getFileUrl } from 'utils/helper';
import { CASE_STUDIES } from 'utils/constants';

const GRADIENTS = {
  bionorica: 'linear-gradient(to bottom, #ffffff 0%, #e6ebf2 40%, #e6ebf2 60%, #ffffff 100%)',
};

export const getBackgroundStyle = (type, data) => {
  switch (type) {
  case CASE_STUDIES.bionorica:
    const backgroundImageUrl = getFileUrl(get(data, 'images[0]', ''));

    return backgroundImageUrl
      && { backgroundImage: `url(${backgroundImageUrl}), ${GRADIENTS.bionorica}` };
  default:
    return {};
  }
};
