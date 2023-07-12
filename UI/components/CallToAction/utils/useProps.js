import {
  getDocumentFields,
  getFileUrl,
  getImage,
} from 'utils/helper';
import { useRouter } from 'next/router';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'redux/apis/dataSending';

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
    url: ctaUrl,
  } = getDocumentFields(data, [
    'title',
    'subtitle',
    'new',
    'imagesBundle',
    'buttonTitle',
    'type',
    'files',
    'isOpenFeedbackForm',
    'url',
  ]);

  const [
    _,
    { data: { isSubscribed } = {} },
  ] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

  const { query: { slug } } = useRouter();

  const images = (imagesBundle || []).map(getImage);

  const titles = (title || titleProp).split('||');

  const files = (rawFiles || []).map(getFileUrl);

  // const handleCloseTimerBlock

  return {
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
    ctaUrl,
    ...props,
  };
};
