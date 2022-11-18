import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';

export default (data) => {
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
