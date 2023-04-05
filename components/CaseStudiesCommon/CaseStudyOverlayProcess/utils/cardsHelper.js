import get from 'lodash/get';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';

export const getCardsProps = (data) => {
  const { contentModules: cardsList } = getDocumentFields(get(data.contentModules, '[0]', []));

  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  return {
    title: data.title,
    cardsList,
    animatedProps,
  };
};
