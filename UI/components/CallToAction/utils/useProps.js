import { getDocumentFields, getImage } from 'utils/helper';
import { LINK_TYPE } from 'utils/constants/linkType';
import useToggle from 'hooks/useToggle';

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

  const [isFormOpen, setFormOpen] = useToggle(false);
  const [isGetBookModalShown, toggleGetBookModalShown] = useToggle(false);

  const images = (imagesBundle || []).map(getImage);

  const titles = (title || titleProp).split('||');

  const isSubscribeFormShown = isNew && type === LINK_TYPE.callToAction && isFormOpen;
  const isGetBookShown = isNew && type === LINK_TYPE.book && isGetBookModalShown;

  function getOnClickHandler() {
    if (!isNew) {
      return handleOnClickProp;
    }

    switch (type) {
    case LINK_TYPE.callToAction:
      return () => setFormOpen();

    case LINK_TYPE.book:
      return () => toggleGetBookModalShown();

    default:
      return null;
    }
  }

  return {
    ...props,
    titles,
    subtitle,
    images,
    isNew,
    buttonTitle,
    isSubscribeFormShown,
    handleOnClick: getOnClickHandler(),
    isGetBookShown,
    toggleGetBookModalShown,
    type,
  };
};
