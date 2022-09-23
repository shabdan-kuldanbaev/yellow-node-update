import { getDocumentFields } from 'utils/helper';

export const getPlainTextProps = (data) => {
  const {
    title,
    description,
    subtitle,
    view,
  } = getDocumentFields(
    data,
    [
      'title',
      'description',
      'subtitle',
      'view',
    ],
  );

  return {
    title,
    description,
    subtitle,
    view,
  };
};
