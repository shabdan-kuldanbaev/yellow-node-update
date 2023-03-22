import { getDocumentFields } from 'utils/helper';

export const getSvgSectionProps = (data) => {
  let link = null;
  let text = null;

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
  const iconsGroups = contentModules.filter((modules) => modules.sys.contentType.sys.id !== 'link');

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

  if (iconsGroups) {
    text = contentModules.map((modules) => modules.fields.text);
  }

  return {
    title,
    description,
    link,
    view,
    iconsGroups,
    text,
  };
};
