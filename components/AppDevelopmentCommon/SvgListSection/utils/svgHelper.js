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
  const linkData = contentModules.find((modules) => modules.sys.contentType.sys.id === 'link');
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
    link,
    view,
    animatedProps,
    contentModules,
  };
};

export const getSvgGroupProps = (data) => getDocumentFields(data, ['title', 'contentList']);
