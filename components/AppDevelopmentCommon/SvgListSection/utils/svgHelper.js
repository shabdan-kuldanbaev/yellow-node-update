import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';

export const getSvgSectionProps = (data, isMobileResolution) => {
  let link = null;
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
  const { contentList: technologies } = getDocumentFields(
    get(contentModules, '[0]', []),
    ['contentList'],
  );
  const linkData = get(contentModules, '[1]', null);
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: isMobileResolution ? '0' : '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  if (linkData) {
    const {
      title: linkTitle,
      buttonTitle,
      type,
    } = getDocumentFields(linkData);

    link = {
      linkTitle,
      buttonTitle,
      type,
    };
  }

  return {
    title,
    description,
    technologies,
    link,
    view,
    animatedProps,
  };
};
