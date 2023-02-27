import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getDocumentFields,
  getFileUrl,
  getImage,
} from 'utils/helper';
import { LINK_TYPE } from 'utils/constants/linkType';
import { selectIsSubscribed } from 'redux/selectors/subscribe';
import downloadFile from 'utils/downloadFile';
import { FullscreenEstimationContext } from 'components/Common/FullScreenEstimation';

export default ({
  title: titleProp,
  data,
  handleOnClick: handleOnClickProp,
  buttonTitle: buttonTitleProp,
  ...props
}) => {
  const { open: handleOnCTAClick } = useContext(FullscreenEstimationContext);

  const {
    new: isNew,
    title,
    subtitle,
    imagesBundle,
    buttonTitle,
    type,
    files: rawFiles,
    isOpenFeedbackForm,
  } = getDocumentFields(data, [
    'title',
    'subtitle',
    'new',
    'imagesBundle',
    'buttonTitle',
    'type',
    'files',
    'isOpenFeedbackForm',
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

    if (isOpenFeedbackForm) {
      return handleOnCTAClick;
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
    buttonTitle: buttonTitleProp || buttonTitle,
    isSubscribeFormShown,
    handleOnClick: getOnClickHandler(),
    isGetBookShown,
    toggleGetBookModalShown: () => setGetBookModalShown(false),
    type,
    isSubscribed,
    onSubscribeSubmit,
    downloadLink: files[0],
    isOpenFeedbackForm,
  };
};
