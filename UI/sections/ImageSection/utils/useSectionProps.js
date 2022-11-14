import get from 'lodash/get';
import { useMemo } from 'react';
import { getDocumentFields, getFileUrl } from '../../../../utils/helper';

export default (props) => {
  const {
    title,
    description,
    images,
    contentModules,
  } = useMemo(() => getDocumentFields(
    props,
    [
      'title',
      'description',
      'images',
      'contentModules',
    ],
  ), [props]);

  const { text } = getDocumentFields(get(contentModules, '[0]', {}));
  const imageUrl = getFileUrl(get(images, '[0]'));

  return {
    title,
    description,
    text,
    imageUrl,
  };
};
