import get from 'lodash/get';
import { getFileUrl } from 'utils/helper';
import { CASE_STUDIES } from 'utils/constants';

export const getBackgroundStyle = (type, data) => {
  switch (type) {
  case CASE_STUDIES.fernwayer:
    const backgroundImageUrl = getFileUrl(get(data, 'images[0]', ''));

    return backgroundImageUrl
      ? { backgroundImage: `url(${backgroundImageUrl}), linear-gradient(180deg, #D45D94 0%, #FA717D 100%)` }
      : {};
  case CASE_STUDIES.openSense:
  case CASE_STUDIES.dindon:
  case CASE_STUDIES.driveFocus:
    const sectionBackgroundUrl = getFileUrl(get(data, 'background'));

    return sectionBackgroundUrl
      ? { backgroundImage: `url(${sectionBackgroundUrl})` }
      : {};
  default:
    return {};
  }
};
