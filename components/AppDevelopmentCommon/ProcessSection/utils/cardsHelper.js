import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';

export const getCardsProps = (data) => {
  const {
    title,
    description,
    subtitle,
    contentModules,
    view,
    fields,
  } = getDocumentFields(
    data,
    [
      'title',
      'description',
      'contentModules',
      'subtitle',
      'view',
      'fields',
    ],
  );
  const {
    contentModules: cardsList,
    subtitle: secondSubtitle,
    title: secondTitle,
  } = getDocumentFields(get(contentModules, '[0]', []));

  return {
    title,
    secondTitle,
    description,
    subtitle,
    secondSubtitle,
    cardsList,
    view,
  };
};

export const getCardRelations = (index, array, isMobileResolution) => {
  if (index === array.length - 1) {
    return [];
  }

  const rightArrow = [
    {
      targetId: `element${index + 2}`,
      targetAnchor: 'left',
      sourceAnchor: 'right',
    },
  ];

  const bottomArrow = [
    {
      targetId: `element${index + 2}`,
      targetAnchor: 'top',
      sourceAnchor: 'bottom',
    },
  ];

  if (isMobileResolution) {
    return bottomArrow;
  }

  return (index + 1) % 3 === 0
    ? bottomArrow
    : rightArrow;
};
