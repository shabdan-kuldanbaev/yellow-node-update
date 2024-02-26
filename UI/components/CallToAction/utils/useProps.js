import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import cn from 'classnames';
import {
  getDocumentFields,
  getFileUrl,
  getImage,
} from 'utils/helper';
import { LINK_TYPE } from 'utils/constants/linkType';
import styles from '../styles.module.scss';

export default (props) => {
  const {
    page,
    view,
    data = {},
    buttonTitle: buttonTitleProp,
    className,
    slug: slugProp,
    title: titleProp = '',
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

  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  const images = (imagesBundle || []).map(getImage);

  const titles = (title || titleProp).split('||');

  const files = (rawFiles || []).map(getFileUrl);

  const classNames = cn(
    styles.container,
    styles[type],
    styles[view],
    styles[page],
    className,
    {
      [styles.openContact]: isOpenFeedbackForm,
      [styles.scrollBlock]: type === LINK_TYPE.scrollBlock,
      [styles.showScrollBlock]: type === LINK_TYPE.scrollBlock && show,
    },
  );

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return {
    titles,
    subtitle,
    images,
    isNew,
    buttonTitle: buttonTitleProp || buttonTitle,
    type,
    downloadLink: files[0],
    isOpenFeedbackForm,
    slug: slugProp || slug,
    ctaUrl,
    show,
    classNames,
    setShow,
    scrollTop,
    ...rest,
  };
};
