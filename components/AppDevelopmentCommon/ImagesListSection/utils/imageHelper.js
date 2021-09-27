import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';

export const getImageSectionProps = (data) => {
  const {
    title,
    description,
    contentModules,
    view,
  } = getDocumentFields(
    data,
    [
      'title',
      'description',
      'contentModules',
      'view',
    ],
  );
  const { images } = getDocumentFields(get(contentModules, '[0]', {})) || {};
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  return {
    title,
    description,
    images,
    view,
    animatedProps,
  };
};
