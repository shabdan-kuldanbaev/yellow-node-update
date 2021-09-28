import get from 'lodash/get';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';

export const getCheckListProps = (data) => {
  const animationProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };
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
  const { contentModules: listData } = getDocumentFields(get(contentModules, '[0]', []));
  const link = getDocumentFields(get(contentModules, '[1]'));

  return {
    animationProps,
    title,
    description,
    view,
    link,
    listData,
  };
};
