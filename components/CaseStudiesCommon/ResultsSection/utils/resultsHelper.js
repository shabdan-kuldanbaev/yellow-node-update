import get from 'lodash/get';
import { CASE_STUDIES } from 'utils/constants';
import { getFileUrl, getDocumentFields } from 'utils/helper';

export const isResultHasVideo = (type) => [CASE_STUDIES.fairy].includes(type);

export const getResultProps = (data) => {
  const { images, contentModules } = data;
  const smartphoneUrl = getFileUrl(images[0]);
  const appScreenUrl = getFileUrl(images[1]);
  const imagesBundlesData = contentModules && getDocumentFields(get(contentModules, '[0]', {}));

  return {
    smartphoneUrl,
    appScreenUrl,
    imagesBundlesData,
  };
};
