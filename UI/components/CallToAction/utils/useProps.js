import { useSelector } from 'react-redux';
import {
  getDocumentFields,
  getFileUrl,
  getImage,
} from 'utils/helper';
import { selectIsSubscribed } from 'redux/selectors/subscription';
import { useRouter } from 'next/router';

export default ({
  title: titleProp,
  data,
  buttonTitle: buttonTitleProp,
  ...props
}) => {
  const {
    new: isNew,
    title,
    subtitle,
    imagesBundle,
    buttonTitle,
    files: rawFiles,
    type,
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

  const { query: { slug } } = useRouter();

  const isSubscribed = useSelector(selectIsSubscribed);

  const images = (imagesBundle || []).map(getImage);

  const titles = (title || titleProp).split('||');

  const files = (rawFiles || []).map(getFileUrl);

  return {
    ...props,
    titles,
    subtitle,
    images,
    isNew,
    buttonTitle: buttonTitleProp || buttonTitle,
    type,
    isSubscribed,
    downloadLink: files[0],
    isOpenFeedbackForm,
    slug,
  };
};
