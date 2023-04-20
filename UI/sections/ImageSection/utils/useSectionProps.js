import get from 'lodash/get';
import { useMemo } from 'react';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export default ({
  section,
  type,
  handleOnCTAClick,
}) => {
  console.log('🚀 ~ file: useSectionProps.js:10 ~ section:', section);
  const {
    title,
    description,
    images,
    contentModules,
    view,
  } = useMemo(() => getDocumentFields(
    section,
    [
      'title',
      'description',
      'images',
      'contentModules',
      'view',
    ],
  ), [section]);

  const { text = '' } = getDocumentFields(get(contentModules, '[0]', {}), ['text']);
  const link = getDocumentFields(get(contentModules, '[1]', {}));
  const imageUrl = getFileUrl(get(images, '[0]'));

  return {
    title,
    description,
    text,
    imageUrl,
    type,
    view,
    link,
    handleOnCTAClick,
  };
};
