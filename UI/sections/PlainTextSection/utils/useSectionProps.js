import get from 'lodash/get';
import { useCallback, useState } from 'react';
import { getDocumentFields } from 'utils/helper';

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
  };
};
