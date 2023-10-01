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
  const { text, hasSeeMoreButton } = getDocumentFields(get(contentModules, '[0]', []), ['text', 'hasSeeMoreButton']);

  const figuresData = get(contentModules, '[0]', {});
  const ctaLink = get(contentModules, '[1]', {});
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
    hasSeeMoreButton,
    onClickMoreButton,
    isSeeMore,
    figuresData: Object.keys(figuresData).length ? figuresData : null,
    ctaLink,
    ...props,
  };
};
