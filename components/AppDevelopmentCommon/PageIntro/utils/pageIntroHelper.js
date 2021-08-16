import get from 'lodash/get';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export const getPageIntroProps = (data) => {
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
  const imageUrl = getFileUrl(get(images, '[0]', {}));
  const figuresData = get(contentModules, '[0]', {});
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  return {
    title,
    description,
    imageUrl,
    figuresData,
    animatedProps,
  };
};
