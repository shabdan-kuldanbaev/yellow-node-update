import { useSelector } from 'react-redux';
import {
  getDocumentFields,
  getFileUrl,
  getImage,
} from 'utils/helper';
import { LINK_TYPE } from 'utils/constants/linkType';
import { selectIsSubscribed } from 'redux/selectors/subscribe';
import downloadFile from 'utils/downloadFile';
import { useState } from 'react';

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

  const [isFormOpen, setFormOpen] = useState(false);
  const [isGetBookModalShown, setGetBookModalShown] = useState(false);

  const images = (imagesBundle || []).map(getImage);

  const titles = (title || titleProp).split('||');

  const files = (rawFiles || []).map(getFileUrl);

  const isSubscribeFormShown = isNew && type === LINK_TYPE.callToAction && isFormOpen;
  const isGetBookShown = isNew && type === LINK_TYPE.book && isGetBookModalShown;

  function getOnClickHandler() {
    if (!isNew) {
      return handleOnClickProp;
    }

    switch (type) {
    case LINK_TYPE.callToAction:
      return () => setFormOpen(true);

    case LINK_TYPE.book:
      return (e) => {
        if (isSubscribed) {
          return downloadFile(files[0]);
        }

        e.preventDefault();
        setGetBookModalShown(true);
      };

    default:
      return null;
    }
  }

  function onSubscribeSubmit() {
    setFormOpen(false);
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
    toggleGetBookModalShown: () => setGetBookModalShown(false),
    type,
    isSubscribed,
    onSubscribeSubmit,
    downloadLink: files[0],
  };
};
