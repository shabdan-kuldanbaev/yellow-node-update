import get from 'lodash/get';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';

export const getCardsProps = (data) => {
  let link = null;
  const {
    title,
    description,
    subtitle,
    contentModules,
    view,
  } = getDocumentFields(
    data,
    [
      'title',
      'description',
      'contentModules',
      'subtitle',
      'view',
    ],
  );
  const { contentModules: cardsList } = getDocumentFields(get(contentModules, '[0]', []));
  const linkData = get(contentModules, '[1]', null);
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  if (linkData) {
    const {
      title: linkTitle,
      buttonTitle,
      type,
      isOpenFeedbackForm,
    } = getDocumentFields(linkData);

    link = {
      linkTitle,
      buttonTitle,
      type,
      isOpenFeedbackForm,
    };
  }

  return {
    title,
    description,
    subtitle,
    cardsList,
    link,
    view,
    animatedProps,
  };
};
