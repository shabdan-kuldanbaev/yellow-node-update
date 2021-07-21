import get from 'lodash/get';
import { getFileUrl } from 'utils/helper';
import { CASE_STUDIES } from 'utils/constants';

export const getBackgroundStyle = (type, data) => {
  const backgroundImageUrl = getFileUrl(get(data, 'images[0]', ''));
  const sectionBackgroundUrl = getFileUrl(get(data, 'background'));

  switch (type) {
  case CASE_STUDIES.fernwayer:
    return backgroundImageUrl
      ? { backgroundImage: `url(${backgroundImageUrl}), linear-gradient(180deg, #D45D94 0%, #FA717D 100%)` }
      : {};
  case CASE_STUDIES.openSense:
    return sectionBackgroundUrl
      ? { backgroundImage: `url(${sectionBackgroundUrl})` }
      : {};
  default:
    return {};
  }
};
