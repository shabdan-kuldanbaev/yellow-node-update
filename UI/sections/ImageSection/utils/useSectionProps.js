import get from 'lodash/get';
import { useMemo } from 'react';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export default (props) => {
  const {
    sectionData,
    type,
  } = props;

  const {
    title,
    description,
    images,
    contentModules,
  } = useMemo(() => getDocumentFields(
    sectionData,
    [
      'title',
      'description',
      'images',
      'contentModules',
    ],
  ), [sectionData]);

  const { text } = getDocumentFields(get(contentModules, '[0]', {}));
  const imageUrl = getFileUrl(get(images, '[0]'));

  return {
    title,
    description,
    text,
    imageUrl,
    type,
  };
};
