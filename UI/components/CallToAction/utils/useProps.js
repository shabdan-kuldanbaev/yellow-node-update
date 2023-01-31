import { useState } from 'react';
import { getDocumentFields, getImage } from 'utils/helper';
import { LINK_TYPE } from 'utils/constants/linkType';

export default ({
  title: titleProp,
  data,
  handleOnClick: handleOnClickProp,
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

  const [isFormOpen, setFormOpen] = useState(false);

  const images = (imagesBundle || []).map(getImage);

  const titles = (title || titleProp).split('||');

  const isSubscribeFormShown = isNew && type === LINK_TYPE.callToAction && isFormOpen;

  const handleOnClick = !isNew ? handleOnClickProp : () => setFormOpen(true);

  return {
    ...props,
    titles,
    subtitle,
    images,
    isNew,
    buttonTitle,
    isSubscribeFormShown,
    handleOnClick,
  };
};
