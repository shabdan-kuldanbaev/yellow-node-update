import {
  getDocumentFields,
  getFileUrl,
  getImage,
} from 'utils/helper';
import { LINK_TYPE } from 'utils/constants/linkType';
import useToggle from 'hooks/useToggle';
import { useSelector } from 'react-redux';
import { selectIsSubscribed } from 'redux/selectors/subscribe';

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
    files: rawFiles,
  } = getDocumentFields(data, [
    'title',
    'subtitle',
    'new',
    'imagesBundle',
    'buttonTitle',
    'type',
    'files',
  ]);

  const isSubscribed = useSelector(selectIsSubscribed);

  const [isFormOpen, setFormOpen] = useToggle(false);
  const [isGetBookModalShown, toggleGetBookModalShown] = useToggle(false);

  const images = (imagesBundle || []).map(getImage);

  const titles = (title || titleProp).split('||');

  const files = (rawFiles || []).map(getFileUrl);

  const isSubscribeFormShown = isNew && type === LINK_TYPE.callToAction && isFormOpen;
  const isGetBookShown = isNew && type === LINK_TYPE.book && isGetBookModalShown;

  function getOnClickHandler() {
    if (!isNew) {
      return handleOnClickProp;
    }

    if (isSubscribed) {
      return () => window.open(files[0], '_newtab');
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
    downloadLink: files[0],
  };
};
