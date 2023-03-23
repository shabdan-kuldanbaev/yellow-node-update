import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import React, { useCallback, useState } from 'react';

export default ({
  section,
  type,
}) => {
  const {
    title,
    description,
    subtitle,
    view,
    contentModules,
    images,
  } = getDocumentFields(
    section,
    [
      'title',
      'description',
      'subtitle',
      'view',
      'contentModules',
      'images',
    ],
  );
  const [isSeeMore, setIsSeeMore] = useState(false);
  const imageUrl = getFileUrl(get(images, '[0]', {}));
  const {
    text,
    tableContent,
    tableType,
    hasSeeMoreButton,
  } = getDocumentFields(get(contentModules, '[0]', []), ['text', 'tableContent', 'tableType', 'hasSeeMoreButton']);

  const onClickMoreButton = useCallback(() => {
    setIsSeeMore(!isSeeMore);
  }, [isSeeMore]);

  return {
    title,
    description,
    subtitle,
    view,
    type,
    text,
    imageUrl,
    contentModules,
    tableContent,
    tableType,
    hasSeeMoreButton,
    onClickMoreButton,
    isSeeMore,
  };
};
