import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';

export const getImageSectionProps = (data) => {
  const {
    title,
    description,
    images,
    contentModules,
  } = getDocumentFields(
    data,
    [
      'title',
      'description',
      'images',
      'contentModules',
    ],
  );
  const { text } = getDocumentFields(get(contentModules, '[0]', {}));
  const imageUrl = getFileUrl(get(images, '[0]'));
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  return {
    title,
    description,
    text,
    imageUrl,
    animatedProps,
  };
};
