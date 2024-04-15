'use client';

import get from 'lodash/get';
import { useCallback, useState } from 'react';
import { getDocumentFields } from 'utils/helper';

export default ({
  section,
  type,
  ...props
}) => {
  const {
    title,
    description,
    subtitle,
    view,
    contentModules,
  } = getDocumentFields(
    section,
    [
      'title',
      'description',
      'subtitle',
      'view',
      'contentModules',
    ],
  );
  const [isSeeMore, setIsSeeMore] = useState(false);
  const {
    text,
    hasSeeMoreButton,
    contentModules: figures,
  } = getDocumentFields(get(contentModules, '[0]', []), ['text', 'hasSeeMoreButton', 'contentModules']);

  const figuresData = get(contentModules, '[0]', {});
  const ctaLink = get(contentModules, '[1]', {});
  const onClickMoreButton = () => setIsSeeMore(true);

  return {
    title,
    description,
    subtitle,
    view,
    type,
    text,
    hasSeeMoreButton,
    onClickMoreButton,
    isSeeMore,
    figuresData: figures && figuresData,
    ctaLink,
    ...props,
  };
};
