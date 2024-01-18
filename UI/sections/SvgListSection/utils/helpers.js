import { getDocumentFields } from 'utils/helper';

export const getSvgSectionProps = (data) => {
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
  const link = contentModules.find((modules) => modules?.sys?.contentType?.sys?.id === 'link');
  const iconsGroups = contentModules.filter((modules) => modules?.sys?.contentType?.sys?.id !== 'link');

  return {
    title,
    description,
    link,
    view,
    iconsGroups,
  };
};
