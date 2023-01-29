import { getDocumentFields, getImage } from 'utils/helper';

export default ({
  title: titleProp,
  data,
  ...props
}) => {
  const {
    new: isNew,
    title,
    subtitle,
    imagesBundle,
    buttonTitle,
    type,
  } = getDocumentFields(data, [
    'title',
    'subtitle',
    'new',
    'imagesBundle',
    'buttonTitle',
    'type',
  ]);

  const images = (imagesBundle || []).map(getImage);

  const titles = (title || titleProp).split('||');

  return {
    ...props,
    titles,
    subtitle,
    images,
    isNew,
    buttonTitle,
  };
};
