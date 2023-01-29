import { getDocumentFields, getImage } from 'utils/helper';

export default ({
  title: titleProp,
  data,
  ...props
}) => {
  const {
    title,
    new: isNew,
    imagesBundle,
    buttonTitle,
    type,
  } = getDocumentFields(data, [
    'title',
    'new',
    'imagesBundle',
    'buttonTitle',
    'type',
  ]);

  const images = (imagesBundle || []).map(getImage);

  const titles = (title || titleProp).split('||');

  return {
    titles,
    images,
    isNew,
    buttonTitle,
    ...props,
  };
};
