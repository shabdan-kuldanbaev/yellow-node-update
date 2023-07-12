import { useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import {
  getDocumentFields,
  getFileUrl,
  getImage,
} from 'utils/helper';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'redux/apis/dataSending';
import { LINK_TYPE } from 'utils/constants/linkType';
import styles from '../styles.module.scss';

export default (props) => {
  const {
    page,
    view,
    title: titleProp,
    data,
    buttonTitle: buttonTitleProp,
    className,
    ...rest
  } = props;

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

  const [show, setShow] = useState(false);

  const [
    _,
    { data: { isSubscribed } = {} },
  ] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

  const { query: { slug } } = useRouter();

  const images = (imagesBundle || []).map(getImage);

  const titles = (title || titleProp).split('||');

  const files = (rawFiles || []).map(getFileUrl);

  const classNames = cn(
    styles[type],
    styles[view],
    styles[page],
    className,
    {
      [styles.openContact]: isOpenFeedbackForm,
      [styles.new]: isNew,
      [styles.card]: !isNew,
      [styles.isSubscribed]: isSubscribed,
      [styles.scrollBlock]: type === LINK_TYPE.scrollBlock,
      [styles.showScrollBlock]: type === LINK_TYPE.scrollBlock && show,
    },
  );

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
    show,
    setShow,
    classNames,
    ...rest,
  };
};
